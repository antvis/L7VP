import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [
    {
      metadata: { name: '温度差异' },
      id: 'datasetId_1',
      data: [
        { lng: 120.210792, lat: 30.246026, color: 'red', temperature: 20, name: '杭州', date: '2022/1/1' },
        { lng: 121.473667, lat: 31.230525, color: 'blue', temperature: 24, name: '上海', date: '2022/2/1' },
        { lng: 120.585294, lat: 31.299758, color: 'yellow', temperature: 31, name: '苏州', date: '2022/4/1' },
        { lng: 118.796624, lat: 32.059344, color: 'blue', temperature: 25, name: '南京', date: '2022/3/1' },
      ],
      columns: [],
      type: 'local',
    },
  ],
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
        id: 'TimeLine',
        type: 'TimeLine',
        metadata: { name: '时间轴' },
        properties: {
          position: 'bottomright',
          datasetId: 'datasetId_1',
          dateField: 'date',
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
