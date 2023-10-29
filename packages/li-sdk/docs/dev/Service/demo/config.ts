import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
    description: '应用的描述信息',
  },
  datasets: [
    {
      type: 'remote',
      metadata: { name: '中国省份数据源' },
      id: 'dataset_1',
      properties: { adcode: '100000' },
      serviceType: 'GET_PROVINCE_LIST',
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        zoom: 6,
        center: [120.153576, 30.287459] as [number, number],
        pitch: 0,
        bearing: 0,
        style: 'light',
        token: 'f0230f884bbd54e2913c890cdf45aa7e',
      },
    },
    layers: [],
    widgets: [
      {
        id: 'MyLayout',
        type: 'MyLayout',
        metadata: { name: '布局组件' },
        properties: {
          showSidePanel: true,
          showFloatPanel: true,
        },
      },
      {
        id: 'DisplayWidget',
        type: 'DisplayWidget',
        metadata: { name: '展示信息组件' },
        properties: {
          datasetId: 'dataset_1',
        },
        container: {
          id: 'MyLayout',
          slot: 'sidePanel',
        },
      },
    ],
  },
};

export default config;
