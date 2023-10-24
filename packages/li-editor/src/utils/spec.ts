import type { LayerSchema } from '@antv/li-sdk';
import { isLocalDatasetSchema } from '@antv/li-sdk';
import type { EditorDataset } from '../services/editor-dataset-manager';

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

const LayersSchema: LayerSchema[] = [
  // 点数据
  {
    id: '',
    type: 'BubbleLayer',
    metadata: {
      name: '',
    },
    sourceConfig: {
      datasetId: '',
      parser: {
        type: 'json',
        x: 'Longitude',
        y: 'Latitude',
        // geometry: 'geometry',
      },
    },
    visConfig: {
      visible: true,
    },
  },
  // 直线数据
  {
    id: '',
    type: 'LineLayer',
    metadata: {
      name: '',
    },
    sourceConfig: {
      datasetId: '',
      parser: {
        type: 'json',
        geometry: 'geometry',
      },
    },
    visConfig: {
      visible: true,
    },
  },
  // 弧线数据
  {
    id: '',
    type: 'ArcLayer',
    metadata: {
      name: '',
    },
    sourceConfig: {
      parser: {
        type: 'json',
        x: 'from_lon',
        y: 'from_lat',
        x1: 'to_lon',
        y1: 'to_lat',
      },
      datasetId: '',
    },
    visConfig: {
      visible: true,
    },
  },
  // 面数据
  {
    id: '',
    type: 'ChoroplethLayer',
    metadata: {
      name: '',
    },
    sourceConfig: {
      parser: {
        type: 'json',
        geometry: 'geometry',
      },
      datasetId: '',
    },
    visConfig: {
      visible: true,
    },
  },
  // H3 数据
  {
    id: '',
    type: 'H3HexagonLayer',
    metadata: {
      name: '',
    },
    sourceConfig: {
      parser: {
        type: 'json',
        hexagonId: 'oh',
      },
      datasetId: '',
    },
    visConfig: {
      visible: true,
    },
  },
];

export const generateLayersSchemaByDatasetDetect = (dataset: EditorDataset) => {
  const layersSchema: LayerSchema[] = [];

  return layersSchema;
};

export const generateLayersSchemaByDatasetDetects = (datasets: EditorDataset[]) => {
  const layersSchema: LayerSchema[] = datasets.map((dataset) => generateLayersSchemaByDatasetDetect(dataset)).flat();

  return layersSchema;
};
