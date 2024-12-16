import { COLOR_RANGES } from '@antv/li-p2';
import type { DatasetField, LayerSchema } from '@antv/li-sdk';
import { getUniqueId, isLocalDatasetSchema } from '@antv/li-sdk';
import { cellToLatLng, isValidCell } from 'h3-js';
import { last } from 'lodash-es';
import type { EditorDataset } from '../services/editor-dataset-manager';
import type { LayerBounds } from '../types';
import { getDefaultColorField, getGeometrysBounds, getLatLngBounds } from './dataset';

export const LayerColorRibbon = COLOR_RANGES.filter((i) => i.type === 'sequential' && i.colors.length === 4).map(
  (i) => i.colors,
);

export const colorRibbonMaker = (function* (): Generator<string[], void> {
  let index = 0;
  while (index < LayerColorRibbon.length + 1) {
    if (index === LayerColorRibbon.length) {
      index = 0;
    }
    yield LayerColorRibbon[index++];
  }
})();

export const getLayerFillColor = (colorField: DatasetField | undefined) => {
  const curr = colorRibbonMaker.next();
  const colors = curr.done ? LayerColorRibbon[0] : curr.value;

  // 映射字段为空，返回单个颜色
  if (!colorField) return last(colors);

  const fillColor = {
    field: colorField.name,
    value: colors,
    scale: { type: 'quantize', unknown: '#c0c0c0' },
    isReversed: false,
  };

  return fillColor;
};

const isAutoCreateLayersDataset = (dataset: EditorDataset) => {
  // TODO: 只支持 local 类型
  if (isLocalDatasetSchema(dataset.schema) && dataset.metadata._autoCreateLayers === true) {
    return true;
  }

  return false;
};

export const getDatasetsByAutoCreateLayers = (datasets: EditorDataset[]) => {
  return datasets.filter(isAutoCreateLayersDataset);
};

const getLayerSchema = (
  type: string,
  name: string,
  sourceConfig: LayerSchema['sourceConfig'],
  visConfig?: LayerSchema['visConfig'],
) => {
  const layerSchema: LayerSchema = {
    id: getUniqueId(type),
    type,
    metadata: {
      name,
    },
    sourceConfig,
    visConfig: {
      visible: true,
      ...visConfig,
    },
  };

  return layerSchema;
};

type AutoCreateLayerParams = {
  dataset: EditorDataset;
  colorField?: DatasetField;
};

// TODO：从数据生成图层方法，需要放到图层资产上面去更加合理
const AutoCreateLayersMap = new Map<string, (params: AutoCreateLayerParams) => LayerSchema[]>([
  // 点数据
  [
    'BubbleLayer',
    (params: AutoCreateLayerParams) => {
      const { dataset, colorField } = params;
      const { id, name } = dataset;

      const createBy_xy = dataset.fieldPairs
        .filter((pair) => pair.type === 'Point')
        .map((pair, index) =>
          getLayerSchema(
            'BubbleLayer',
            `${name}_${pair.displayName}`,
            {
              datasetId: id,
              parser: {
                type: 'json',
                x: pair.pair.lng,
                y: pair.pair.lat,
              },
            },
            {
              // 默认最多只显示两个图层
              visible: [0, 1].includes(index),
              fillColor: getLayerFillColor(colorField),
            },
          ),
        );

      const createBy_geometry = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Point')
        .map((geoField, index) =>
          getLayerSchema(
            'BubbleLayer',
            `${name}_${geoField.displayName || geoField.name}`,
            {
              datasetId: id,
              parser: {
                type: 'json',
                geometry: geoField.name,
              },
            },
            {
              // 默认最多只显示两个图层
              visible: [0, 1].includes(index),
              fillColor: getLayerFillColor(colorField),
            },
          ),
        );

      const layers = createBy_xy.concat(createBy_geometry);

      return layers;
    },
  ],
  // 直线数据
  [
    'LineLayer',
    (params: AutoCreateLayerParams) => {
      const { dataset, colorField } = params;
      const { id, name } = dataset;

      const layers = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Line')
        .map((geoField, index) =>
          getLayerSchema(
            'LineLayer',
            `${name}_${geoField.displayName || geoField.name}`,
            {
              datasetId: id,
              parser: {
                type: 'json',
                geometry: geoField.name,
              },
            },
            {
              visible: index === 0,
              fillColor: getLayerFillColor(colorField),
            },
          ),
        );

      return layers;
    },
  ],
  // 弧线数据
  [
    'ArcLayer',
    (params: AutoCreateLayerParams) => {
      const { dataset } = params;
      if (dataset.fieldPairs.length < 2) {
        return [];
      }
      const { id, name } = dataset;
      const layer = getLayerSchema(
        'ArcLayer',
        `${name}_${dataset.fieldPairs[0].displayName} => ${dataset.fieldPairs[1].displayName}`,
        {
          datasetId: id,
          parser: {
            type: 'json',
            x: dataset.fieldPairs[0].pair.lng,
            y: dataset.fieldPairs[0].pair.lat,
            x1: dataset.fieldPairs[1].pair.lng,
            y1: dataset.fieldPairs[1].pair.lat,
          },
        },
      );

      return [layer];
    },
  ],
  // 面数据
  [
    'ChoroplethLayer',
    (params: AutoCreateLayerParams) => {
      const { dataset, colorField } = params;
      const { id, name } = dataset;

      const layers = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Polygon')
        .map((geoField) =>
          getLayerSchema(
            'ChoroplethLayer',
            `${name}_${geoField.displayName || geoField.name}`,
            {
              datasetId: id,
              parser: {
                type: 'json',
                geometry: geoField.name,
              },
            },
            { fillColor: getLayerFillColor(colorField) },
          ),
        );

      return layers;
    },
  ],
  // H3 数据
  [
    'H3HexagonLayer',
    (params: AutoCreateLayerParams) => {
      const { dataset, colorField } = params;
      const { id, name } = dataset;

      const layers = dataset.h3Fields.map((h3Field) =>
        getLayerSchema(
          'H3HexagonLayer',
          `${name}_H3_${h3Field.name}`,
          {
            datasetId: id,
            parser: {
              type: 'json',
              hexagonId: h3Field.name,
            },
          },
          { fillColor: getLayerFillColor(colorField) },
        ),
      );

      return layers;
    },
  ],
]);

const getLayersSchemaByDataset = (dataset: EditorDataset) => {
  const colorField = getDefaultColorField(dataset);
  const layersSchema: LayerSchema[] = Array.from(AutoCreateLayersMap.values())
    // 反转顺序，以面线点的叠加顺序（地图上），生成可视化图层
    .reverse()
    .map((handler) => handler({ dataset, colorField }))
    .flat();

  return layersSchema;
};

/**
 * 通过数据集生成多个图层 Schema
 */
export const getAutoCreateLayersSchema = (datasets: EditorDataset[]) => {
  const layersSchema: LayerSchema[] = datasets.map((dataset) => getLayersSchemaByDataset(dataset)).flat();

  return layersSchema;
};

const getFieldsToLayerPopupShow = (dataset: EditorDataset, maxDefaultTooltips: number) => {
  const ptFields = dataset.fieldPairs.map((fieldPair) => Object.values(fieldPair.pair)).flat();
  const fieldsToShow = dataset.columns.filter(
    ({ name, type }) => !ptFields.includes(name) && type !== 'geo' && type !== 'h3',
  );

  return fieldsToShow.slice(0, maxDefaultTooltips).map(({ name }) => ({ field: name }));
};

/**
 * 通过图层生成 LayerPopup Schema
 */
export const getAutoFindLayerPopup = (layers: LayerSchema[], datasets: EditorDataset[], maxDefaultTooltips = 6) => {
  const items = layers.map((layer) => {
    const dataset = datasets.find((d) => d.id === layer.sourceConfig.datasetId);
    return {
      layerId: layer.id,
      fields: dataset ? getFieldsToLayerPopupShow(dataset, maxDefaultTooltips) : [],
    };
  });

  const layerPopupSchema = {
    id: 'LayerPopup',
    type: 'LayerPopup',
    metadata: {
      name: '信息框',
    },
    properties: {
      isOpen: true,
      trigger: 'hover',
      items,
    },
    container: {
      id: 'x',
      slot: 'controls',
    },
  };

  return layerPopupSchema;
};

const getPointLayerBounds = (dataset: EditorDataset, layer: LayerSchema) => {
  if (layer.sourceConfig?.parser === undefined) return null;
  const { x, y, geometry } = layer.sourceConfig.parser;
  const sampleData = dataset.getSampleData();

  // 经纬度情况
  if (x && y) {
    const points = sampleData.map((item) => [item[x], item[y]]);
    return getLatLngBounds(points);
    // geometry 情况
  } else if (geometry) {
    const geometrys = sampleData.map((item) => item[geometry]);
    return getGeometrysBounds(geometrys);
  }

  return null;
};

// TODO：从数据生成图层边界范围，需要放到图层资产上面去更加合理
const LayersBoundsMap = new Map<string, (dataset: EditorDataset, layer: LayerSchema) => LayerBounds | null>([
  // 点数据
  ['BubbleLayer', getPointLayerBounds],
  ['GridLayer', getPointLayerBounds],
  ['HeatmapLayer', getPointLayerBounds],
  ['HexbinLayer', getPointLayerBounds],
  ['IconLayer', getPointLayerBounds],
  // 直线数据
  [
    'LineLayer',
    (dataset: EditorDataset, layer: LayerSchema) => {
      if (layer.sourceConfig?.parser === undefined) return null;
      const { x, y, x1, y1, geometry } = layer.sourceConfig.parser;
      const sampleData = dataset.getSampleData();

      // 起点终点情况
      if (x && y && x1 && y1) {
        const sBounds = getLatLngBounds(sampleData.map((item) => [item[x], item[y]]));
        const tBounds = getLatLngBounds(sampleData.map((item) => [item[x1], item[y1]]));
        const bounds: LayerBounds | null =
          tBounds && sBounds
            ? [
                [Math.min(sBounds[0][0], tBounds[0][0]), Math.min(sBounds[0][1], tBounds[0][1])],
                [Math.max(sBounds[1][0], tBounds[1][0]), Math.max(sBounds[1][1], tBounds[1][1])],
              ]
            : sBounds || tBounds;
        return bounds;
        // geometry 情况
      } else if (geometry) {
        const geometrys = sampleData.map((item) => item[geometry]);
        return getGeometrysBounds(geometrys);
      }

      return null;
    },
  ],
  // 弧线数据
  [
    'ArcLayer',
    (dataset: EditorDataset, layer: LayerSchema) => {
      if (layer.sourceConfig?.parser === undefined) return null;
      const { x, y, x1, y1 } = layer.sourceConfig.parser;
      const sampleData = dataset.getSampleData();

      // 起点终点情况
      if (x && y && x1 && y1) {
        const sBounds = getLatLngBounds(sampleData.map((item) => [item[x], item[y]]));
        const tBounds = getLatLngBounds(sampleData.map((item) => [item[x1], item[y1]]));
        const bounds: LayerBounds | null =
          tBounds && sBounds
            ? [
                [Math.min(sBounds[0][0], tBounds[0][0]), Math.min(sBounds[0][1], tBounds[0][1])],
                [Math.max(sBounds[1][0], tBounds[1][0]), Math.max(sBounds[1][1], tBounds[1][1])],
              ]
            : sBounds || tBounds;
        return bounds;
      }

      return null;
    },
  ],
  // 面数据
  [
    'ChoroplethLayer',
    (dataset: EditorDataset, layer: LayerSchema) => {
      if (layer.sourceConfig?.parser === undefined) return null;
      const { geometry } = layer.sourceConfig.parser;
      const sampleData = dataset.getSampleData(10000);

      // geometry 情况
      if (geometry) {
        const geometrys = sampleData.map((item) => item[geometry]);
        return getGeometrysBounds(geometrys);
      }

      return null;
    },
  ],
  // H3 数据
  [
    'H3HexagonLayer',
    (dataset: EditorDataset, layer: LayerSchema) => {
      if (layer.sourceConfig?.parser === undefined) return null;
      const { hexagonId } = layer.sourceConfig.parser;
      const sampleData = dataset.getSampleData(10000);

      if (hexagonId) {
        const points = sampleData
          .map((item) => {
            const hexId = item[hexagonId];
            if (!isValidCell(hexId)) {
              return null;
            }
            // reverse it to [lng, lat]
            return cellToLatLng(hexId).reverse();
          })
          .filter((item): item is [number, number] => item !== null);

        return getLatLngBounds(points);
      }

      return null;
    },
  ],
]);

/**
 * 通过图层获取数据范围
 */
export const getLayersBounds = (layers: LayerSchema[], datasets: EditorDataset[]): LayerBounds | null => {
  const boundsList = layers.map((layer) => {
    const dataset = datasets.find((d) => d.id === layer.sourceConfig.datasetId);
    const getLayerBounds = LayersBoundsMap.get(layer.type);
    if (!dataset || !getLayerBounds) return null;

    return getLayerBounds(dataset, layer);
  });

  const availableBounds: LayerBounds[] = boundsList.filter((bounds): bounds is LayerBounds => bounds !== null);

  if (availableBounds.length === 0) return null;

  const bounds = availableBounds.reduce((resulit, b) => {
    return [
      [Math.min(resulit[0][0], b[0][0]), Math.min(resulit[0][1], b[0][1])],
      [Math.max(resulit[1][0], b[1][0]), Math.max(resulit[1][1], b[1][1])],
    ];
  }, availableBounds[0]);

  // [MIN_LONGITUDE, MIN_LATITUDE], [MAX_LONGITUDE, MAX_LATITUDE]
  const validBounds: LayerBounds = [
    [Math.max(bounds[0][0], -180), Math.max(bounds[0][1], -90)],
    [Math.min(bounds[1][0], 180), Math.min(bounds[1][1], 90)],
  ];

  return validBounds;
};
