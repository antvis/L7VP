import type { Application } from '@antv/li-sdk';

export const LI_APPLICATION_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '示例',
  },
  datasets: [],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 3,
        center: [120.153576, 30.287459],
        pitch: 0,
        bearing: 0,
        style: 'normal',
        preserveDrawingBuffer: true,
      },
    },
    layers: [],
    widgets: [
      {
        id: 'BaseLayout',
        type: 'BaseLayout',
        metadata: {
          name: '布局组件',
        },
        properties: {
          showFloatPanel: false,
          showSidePanel: true,
          showBottomPanel: false,
        },
      },
      {
        id: 'Template',
        type: 'Template',
        metadata: {
          name: '模板组件',
        },
        properties: {},
        container: {
          id: 'BaseLayout',
          slot: 'sidePanel',
        },
      },
    ],
  },
};
