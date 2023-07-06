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
        {
          lng: 120.210792,
          lat: 30.246026,
          color: 'red',
          temperature: 20,
          name: '杭州',
          desc:
            '非常多的描述非常非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述多的描述非常多的描述非常多的描述非常非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述',
        },
        {
          lng: 121.473667,
          lat: 31.230525,
          color: 'blue',
          temperature: 24,
          name: '上海',
          desc:
            '非常多的描述非常非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述',
        },
        {
          lng: 120.585294,
          lat: 31.299758,
          color: 'yellow',
          temperature: 31,
          name: '苏州',
          desc:
            '非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述',
        },
        {
          lng: 118.796624,
          lat: 32.059344,
          color: 'blue',
          temperature: 25,
          name: '南京',
          desc:
            '非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述非常多的描述',
        },
      ],
      columns: [
        { type: 'number', name: 'lng' },
        { type: 'number', name: 'lat' },
        { type: 'string', name: 'color' },
        { type: 'number', name: 'temperature' },
        { type: 'string', name: 'name' },
      ],
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
    layers: [
      {
        id: 'my-bubble-layer',
        type: 'BubbleLayer',
        metadata: { name: '气泡图层' },
        sourceConfig: {
          datasetId: 'datasetId_1',
          parser: { type: 'json', x: 'lng', y: 'lat' },
        },
        visConfig: {
          visible: true,
          radius: 30,
          fillColor: {
            field: 'temperature',
            value: ['#0f9960', '#33a02c', '#377eb8'],
            isReversed: false,
          },
          opacity: 0.4,
          strokeColor: 'blue',
          lineWidth: 2,
          lineOpacity: 0.4,
          state: {
            active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
          },
          label: {
            field: 'temperature',
            visible: true,
            style: {
              fill: '#454d64',
              fontSize: 18,
              stroke: '#fff',
              strokeWidth: 2,
              textOffset: [0, -20] as [number, number],
            },
          },
        },
      },
    ],
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
        id: 'PropertiesPanel',
        type: 'PropertiesPanel',
        metadata: { name: '属性面板' },
        properties: {},
        container: {
          id: 'AnalysisLayout',
          slot: 'content',
        },
      },
    ],
  },
};
export default config;
