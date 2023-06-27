import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [
    {
      id: 'sourceId_1',
      metadata: { name: '城市温度' },
      data: [
        { lng: 120.210792, lat: 30.246026, color: 'red', temperature: 20, name: '杭州' },
        { lng: 121.473667, lat: 31.230525, color: 'blue', temperature: 24, name: '上海' },
        { lng: 120.585294, lat: 31.299758, color: 'yellow', temperature: 31, name: '苏州' },
        { lng: 118.796624, lat: 32.059344, color: 'blue', temperature: 25, name: '南京' },
      ],
      type: 'local',
      columns: [
        { type: 'number', name: 'lng' },
        { type: 'number', name: 'lat' },
        { type: 'string', name: 'color' },
        { type: 'number', name: 'temperature' },
        { type: 'string', name: 'name' },
      ],
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
          showSidePanel: true,
          showBottomPanel: false,
          showFloatPanel: false,
          collapsedFloatPanel: true,
        },
      },
      {
        id: 'SpreadSheetTable',
        type: 'SpreadSheetTable',
        metadata: { name: '表格组件' },
        properties: {
          datasetId: 'sourceId_1',
          colHeader: ['lng', 'lat', 'color'],
          theme: 'light',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'sidePanel',
        },
      },
    ],
  },
};
export default config;
