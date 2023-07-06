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
      id: '1676873202060',
      type: 'remote',
      serviceType: 'GET_CHINA_GEO_LIST',
      properties: {
        adcode: '100000',
      },
      metadata: {
        name: '中国省份数据数据',
      },
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
        id: 'ChoroplethLayer_98cd1f5b-2f05-4171-8b8d-087ee10acd93',
        type: 'ChoroplethLayer',
        metadata: {
          name: '中国省份图层',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: '_geometry',
          },
          datasetId: '1676873202060',
        },
        visConfig: {
          fillColor: 'rgb(90, 216, 166)',
          opacity: 0.8,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 1,
          lineOpacity: 1,
          label: {
            visible: false,
            style: {
              fill: 'red',
              fontSize: 14,
              textAnchor: 'center',
              textOffset: [0, 0],
            },
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: {
              strokeColor: 'yellow',
              lineWidth: 1,
              lineOpacity: 1,
            },
          },
          visible: true,
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
        id: 'DataseInfor_1',
        type: 'DataseInfor',
        metadata: {
          name: '属性组件',
        },
        properties: {
          datasetId: '1676873202060',
        },
        container: {
          id: 'MyLayout',
          slot: 'sidePanel',
        },
      },
      {
        id: 'LocationSearchControl_1',
        type: 'LocationSearchControl',
        metadata: {
          name: '位置查询',
        },
        properties: {
          serviceName: 'POI_SEARCH',
        },
        container: {
          id: 'MyLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default config;
