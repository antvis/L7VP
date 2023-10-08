import type { LayerSchema } from '@antv/li-sdk';
import type { EditorDataset } from '../types';

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

export const generateLayersSchemaByDataset = (dataset: EditorDataset) => {
  const layersSchema: LayerSchema[] = [];

  return layersSchema;
};

export const generateLayersSchemaByDatasets = (datasets: EditorDataset[]) => {
  const layersSchema: LayerSchema[] = datasets.map((dataset) => generateLayersSchemaByDataset(dataset)).flat();

  return layersSchema;
};
