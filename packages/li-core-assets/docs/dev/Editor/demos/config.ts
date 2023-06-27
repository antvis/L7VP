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
        { lng: 120.210792, lat: 30.246026, color: 'red', temperature: 20, name: '杭州' },
        { lng: 121.473667, lat: 31.230525, color: 'blue', temperature: 24, name: '上海' },
        { lng: 120.585294, lat: 31.299758, color: 'yellow', temperature: 31, name: '苏州' },
        { lng: 118.796624, lat: 32.059344, color: 'blue', temperature: 25, name: '南京' },
      ],
      columns: [],
      type: 'local',
    },
    {
      metadata: { name: '区域分布' },
      id: 'datasetId_2',
      data: [],
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
        rotation: 0,
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
              textAnchor: 'center',
              textOffset: [0, 0] as [number, number],
            },
          },
        },
      },
      {
        id: 'my-chorople-layer',
        type: 'ChoroplethLayer',
        metadata: { name: '区域图层' },
        sourceConfig: {
          datasetId: 'datasetId_2',
          parser: {
            type: 'json',
          },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'adcode',
            value: ['#0f9960', '#33a02c', '#377eb8'],
          },
          opacity: 0.3,
          strokeColor: 'blue',
          lineWidth: 1,
          state: {
            active: { strokeColor: 'green', lineWidth: 1.5, lineOpacity: 0.8 },
            select: { strokeColor: 'red', lineWidth: 1.5, lineOpacity: 0.8 },
          },
          label: {
            field: 'name',
            visible: true,
            style: { fill: 'blue', fontSize: 12, stroke: '#fff', strokeWidth: 2 },
          },
        },
      },
    ],
    widgets: [
      {
        id: 'BaseLayout',
        type: 'BaseLayout',
        metadata: { name: '基础布局' },
        properties: {
          showSidePanel: true,
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
      {
        id: 'zoomControl',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LayerPopup',
        type: 'LayerPopup',
        metadata: { name: '图层信息框' },
        properties: {},
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'ExportImageControl',
        type: 'ExportImageControl',
        metadata: { name: '导出图片' },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MouseLocationControl',
        type: 'MouseLocationControl',
        metadata: { name: '光标经纬度' },
        properties: {
          position: 'bottomleft',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'FullscreenControl',
        type: 'FullscreenControl',
        metadata: { name: '全屏' },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'GeoLocateControl',
        type: 'GeoLocateControl',
        metadata: { name: 'GPS 定位' },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MapThemeControl',
        type: 'MapThemeControl',
        metadata: { name: '地图主题' },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'BaseLayout',
          slot: 'controls',
        },
      },
      {
        id: 'AttributeInfor',
        type: 'AttributeInfor',
        metadata: { name: '属性面板' },
        properties: {},
        container: {
          id: 'BaseLayout',
          slot: 'sidePanel',
        },
      },
      {
        id: 'StatisticsInfor',
        type: 'StatisticsInfor',
        metadata: { name: '统计信息' },
        properties: {},
        container: {
          id: 'BaseLayout',
          slot: 'sidePanel',
        },
      },
    ],
  },
};

export default config;
