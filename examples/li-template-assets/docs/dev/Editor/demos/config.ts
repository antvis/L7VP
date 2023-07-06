import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 10,
        center: [120.153576, 30.287459],
        pitch: 0,
        bearing: 0,
        style: 'dark',
      },
    },
    layers: [],
    widgets: [
      {
        id: '0ce6afbd-cd82-4879-9639-f2c978fdd920',
        type: 'BaseLayout',
        metadata: {
          name: 'BaseLayout',
        },
        properties: {
          showSidePanel: true,
        },
      },
      {
        id: '0ce6afbd-cd82-4879-9639-f2c978fdd929',
        type: 'Template',
        metadata: {
          name: '模板组件',
        },
        properties: {},
        container: {
          id: '0ce6afbd-cd82-4879-9639-f2c978fdd920',
          slot: 'sidePanel',
        },
      },
    ],
  },
};

export default config;
