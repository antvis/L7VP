import type { LayerSchema } from '@antv/li-sdk';
import { getUniqueId, isLocalDatasetSchema } from '@antv/li-sdk';
import type { EditorDataset } from '../services/editor-dataset-manager';

const isAutoCreateLayersDataset = (dataset: EditorDataset) => {
  // TODO: 只支持 local 类型
  if (isLocalDatasetSchema(dataset.schema) && dataset.metadata._autoCreateLayers === true) {
    return true;
  }

  return false;
};

const getDatasetsByAutoCreateLayers = (datasets: EditorDataset[]) => {
  return datasets.filter(isAutoCreateLayersDataset);
};

const getLayerSchema = (type: string, name: string, sourceConfig: LayerSchema['sourceConfig']) => {
  const layerSchema: LayerSchema = {
    id: getUniqueId(type),
    type,
    metadata: {
      name,
    },
    sourceConfig,
    visConfig: {
      visible: true,
    },
  };

  return layerSchema;
};

const AutoCreateLayersMap = new Map<string, (dataset: EditorDataset) => LayerSchema[]>([
  // 点数据
  [
    'BubbleLayer',
    (dataset: EditorDataset) => {
      const { id, name } = dataset;
      const createBy_xy = dataset.fieldPairs
        .filter((pair) => pair.type === 'Point')
        .map((pair) =>
          getLayerSchema('BubbleLayer', `${name}${pair.displayName}`, {
            datasetId: id,
            parser: {
              type: 'json',
              x: pair.pair.lng,
              y: pair.pair.lat,
            },
          }),
        );

      const createBy_geometry = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Point')
        .map((geoField) =>
          getLayerSchema('BubbleLayer', `${name}${geoField.displayName || geoField.name}`, {
            datasetId: id,
            parser: {
              type: 'json',
              geometry: geoField.name,
            },
          }),
        );

      const layers = createBy_xy.concat(createBy_geometry);

      return layers;
    },
  ],
  // 直线数据
  [
    'LineLayer',
    (dataset: EditorDataset) => {
      const { id, name } = dataset;
      const layers = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Line')
        .map((geoField) =>
          getLayerSchema('LineLayer', `${name}${geoField.displayName || geoField.name}`, {
            datasetId: id,
            parser: {
              type: 'json',
              geometry: geoField.name,
            },
          }),
        );

      return layers;
    },
  ],
  // 弧线数据
  [
    'ArcLayer',
    (dataset: EditorDataset) => {
      if (dataset.fieldPairs.length < 2) {
        return [];
      }
      const { id, name } = dataset;
      const layer = getLayerSchema(
        'ArcLayer',
        `${name}${dataset.fieldPairs[0].displayName}到${dataset.fieldPairs[1].displayName}`,
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
    (dataset: EditorDataset) => {
      const { id, name } = dataset;
      const layers = dataset.geoFields
        .filter((geoField) => geoField.geoType === 'Polygon')
        .map((geoField) =>
          getLayerSchema('ChoroplethLayer', `${name}${geoField.displayName || geoField.name}`, {
            datasetId: id,
            parser: {
              type: 'json',
              geometry: geoField.name,
            },
          }),
        );

      return layers;
    },
  ],
  // H3 数据
  [
    'H3HexagonLayer',
    (dataset: EditorDataset) => {
      const { id, name } = dataset;
      const layers = dataset.h3Fields.map((h3Field) =>
        getLayerSchema('H3HexagonLayer', `${name} H3`, {
          datasetId: id,
          parser: {
            type: 'json',
            hexagonId: h3Field.name,
          },
        }),
      );

      return layers;
    },
  ],
]);

const getLayersSchemaByDataset = (dataset: EditorDataset) => {
  const layersSchema: LayerSchema[] = Array.from(AutoCreateLayersMap.values())
    .map((handler) => handler(dataset))
    .flat();

  return layersSchema;
};

export const getAutoCreateLayersSchema = (datasets: EditorDataset[]) => {
  const layersSchema: LayerSchema[] = getDatasetsByAutoCreateLayers(datasets)
    .map((dataset) => getLayersSchemaByDataset(dataset))
    .flat();
  console.log('layersSchema: ', layersSchema);

  return layersSchema;
};
