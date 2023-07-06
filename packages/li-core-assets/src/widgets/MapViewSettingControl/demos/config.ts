import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        zoom: 10,
        center: [120.153576, 30.287459] as [number, number],
        pitch: 0,
        bearing: 0,
        rotation: 0,
        style: 'dark',
      },
    },
    layers: [],
    widgets: [
      {
        id: 'BaseLayout',
        type: 'BaseLayout',
        metadata: { name: '基础布局' },
        properties: {
          showSidePanel: false,
        },
      },
      {
        id: 'MapViewSettingControl',
        type: 'MapViewSettingControl',
        metadata: { name: '地图倾角' },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default config;
