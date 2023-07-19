import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
    description: '应用的描述信息',
  },
  datasets: [
    {
      metadata: { name: '温度差异' },
      id: 'datasetId_1',
      data: [
        { lng: 120.210792, lat: 30.246026, color: 'red', temperature: 20, name: '杭州' },
        { lng: 121.473667, lat: 31.230525, color: 'blue', temperature: 24, name: '上海' },
        { lng: 120.585294, lat: 31.299758, color: 'yellow', temperature: 31, name: '苏州' },
        { lng: 118.796624, lat: 32.059344, color: 'blue', temperature: 25, name: '南京' },
      ],
      columns: [],
      type: 'local',
    },
    {
      metadata: { name: '湿度差异' },
      id: 'datasetId_2',
      data: [
        { lng: 120.210792, lat: 30.246026, color: 'red', humidity: 70, name: '杭州' },
        { lng: 121.473667, lat: 31.230525, color: 'blue', humidity: 80, name: '上海' },
        { lng: 120.585294, lat: 31.299758, color: 'yellow', humidity: 65, name: '苏州' },
        { lng: 118.796624, lat: 32.059344, color: 'blue', humidity: 68, name: '南京' },
      ],
      columns: [],
      type: 'local',
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
          fillColor: 'rgb(90, 216, 166)',
          opacity: 0.4,
          strokeColor: 'blue',
          lineWidth: 2,
          lineOpacity: 0.4,
          state: {
            active: { strokeColor: 'red', lineWidth: 2, lineOpacity: 1 },
          },
        },
      },
    ],
    widgets: [
      {
        id: 'MyLayout',
        type: 'MyLayout',
        metadata: { name: '布局组件' },
        properties: {
          showSidePanel: true,
        },
      },
      {
        id: 'AttributeInfor0',
        type: 'AttributeInfor',
        metadata: { name: '属性组件' },
        properties: {},
        container: {
          id: 'MyLayout',
          slot: 'sidePanel',
        },
      },
    ],
  },
};

export default config;
