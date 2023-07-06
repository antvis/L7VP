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
        style: 'dark',
      },
    },
    layers: [],
    widgets: [
      {
        id: 'AnalysisLayout',
        type: 'AnalysisLayout',
        metadata: { name: '分析布局' },
        properties: {
          showSidePanel: false,
          showBottomPanel: false,
          showFloatPanel: false,
          collapsedFloatPanel: false,
        },
      },
      {
        id: 'AdministrativeSelectControl',
        type: 'AdministrativeSelectControl',
        metadata: { name: '行政区划区域选择' },
        properties: {
          position: 'topleft',
          showBounds: true,
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default config;
