import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '疫情前后全国人口流动网络空间格局',
    creatTime: '2023-09-04 15:35:08',
    description:
      '利用人口迁移数据，绘制全国的人口流动网络，识别疫情前后人口流动的差异，数据来源：https://pattern.swarma.org/article/228',
  },
  datasets: [
    {
      id: 'pos_00326cb0-a99e-4a6b-8fe5-289e6195a814',
      metadata: {
        name: '省会城市',
      },
      data: [
        { id: 0, 名称: '北京', 经度: 116.405285, 纬度: 39.904989 },
        { id: 1, 名称: '成都', 经度: 104.066301, 纬度: 30.572961 },
        { id: 2, 名称: '广州', 经度: 113.264499, 纬度: 23.130061 },
        { id: 3, 名称: '贵阳', 经度: 106.628201, 纬度: 26.646694 },
        { id: 4, 名称: '哈尔滨', 经度: 126.53505, 纬度: 45.802981 },
        { id: 5, 名称: '海口', 经度: 110.198418, 纬度: 20.045805 },
        { id: 6, 名称: '杭州', 经度: 120.210792, 纬度: 30.246026 },
        { id: 7, 名称: '合肥', 经度: 117.227267, 纬度: 31.820567 },
        { id: 8, 名称: '呼和浩特', 经度: 111.748814, 纬度: 40.842127 },
        { id: 9, 名称: '济南', 经度: 117.120128, 纬度: 36.652069 },
        { id: 10, 名称: '昆明', 经度: 102.833669, 纬度: 24.88149 },
        { id: 11, 名称: '拉萨', 经度: 91.171924, 纬度: 29.653491 },
        { id: 12, 名称: '兰州', 经度: 103.834228, 纬度: 36.060798 },
        { id: 13, 名称: '南京', 经度: 118.796624, 纬度: 32.059344 },
        { id: 14, 名称: '南宁', 经度: 108.366407, 纬度: 22.8177 },
        { id: 15, 名称: '上海', 经度: 121.472644, 纬度: 31.231706 },
        { id: 16, 名称: '沈阳', 经度: 123.464675, 纬度: 41.677576 },
        { id: 17, 名称: '太原', 经度: 112.549656, 纬度: 37.870451 },
        { id: 18, 名称: '天津', 经度: 117.190182, 纬度: 39.125596 },
        { id: 19, 名称: '乌鲁木齐', 经度: 87.616824, 纬度: 43.825377 },
        { id: 20, 名称: '西宁', 经度: 101.777795, 纬度: 36.616621 },
        { id: 21, 名称: '香港特别行政区', 经度: 114.171203, 纬度: 22.277468 },
        { id: 22, 名称: '长沙', 经度: 112.938882, 纬度: 28.228304 },
        { id: 23, 名称: '郑州', 经度: 113.625351, 纬度: 34.746303 },
        { id: 24, 名称: '重庆', 经度: 106.550483, 纬度: 29.563707 },
        { id: 25, 名称: '台湾', 经度: 121.509062, 纬度: 25.044332 },
        { id: 26, 名称: '西安', 经度: 108.939645, 纬度: 34.343207 },
        { id: 27, 名称: '福州', 经度: 119.296411, 纬度: 26.074286 },
        { id: 28, 名称: '银川', 经度: 106.230977, 纬度: 38.487783 },
        { id: 29, 名称: '长春', 经度: 125.323643, 纬度: 43.816996 },
        { id: 30, 名称: '澳门特别行政区', 经度: 113.543076, 纬度: 22.186927 },
        { id: 31, 名称: '南昌', 经度: 115.857972, 纬度: 28.682976 },
        { id: 32, 名称: '石家庄', 经度: 114.514976, 纬度: 38.042007 },
        { id: 33, 名称: '武汉', 经度: 114.304569, 纬度: 30.593354 },
      ],
      type: 'local',
      columns: [
        { type: 'number', name: 'id' },
        { type: 'string', name: '名称' },
        { type: 'number', name: '经度' },
        { type: 'number', name: '纬度' },
      ],
    },
    {
      id: '2019_spatial_flow_486dd0…-447a-98a6-0b212baf89d4',
      metadata: {
        name: '2019-11-30 人口流动数据',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*qfanQqmu5nwAAAAAAAAAAAAADrd2AQ/2019-11-30',
        requestOptions: {
          method: 'GET',
        },
      },
      columns: [
        { type: 'number', name: 'id' },
        { type: 'number', name: 'startCityAdcode' },
        { type: 'number', name: 'endCityAdcode' },
        { type: 'string', name: 'startCity' },
        { type: 'string', name: 'endCity' },
        { type: 'number', name: 'slon' },
        { type: 'number', name: 'slat' },
        { type: 'number', name: 'elon' },
        { type: 'number', name: 'elat' },
        { type: 'number', name: 'willIdx' },
        { type: 'number', name: 'realIdx' },
        { type: 'string', name: 'level' },
      ],
    },
    {
      id: '2020_spatial_flow_9300b3ce-ac26-40f6-a294-359df6d3a411',
      metadata: {
        name: '2020-02-20 人口流动数据',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*rDijQajQPWgAAAAAAAAAAAAADrd2AQ/2020-02-20.json',
        requestOptions: {
          method: 'GET',
        },
      },
      columns: [
        { type: 'number', name: 'id' },
        { type: 'number', name: 'startCityAdcode' },
        { type: 'number', name: 'endCityAdcode' },
        { type: 'string', name: 'startCity' },
        { type: 'string', name: 'endCity' },
        { type: 'number', name: 'slon' },
        { type: 'number', name: 'slat' },
        { type: 'number', name: 'elon' },
        { type: 'number', name: 'elat' },
        { type: 'number', name: 'willIdx' },
        { type: 'number', name: 'realIdx' },
        { type: 'string', name: 'level' },
      ],
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 3.74,
        center: [107.97437, 38.531811],
        pitch: 0,
        bearing: 0,
        style: 'grey',
        WebGLParams: {
          preserveDrawingBuffer: true,
        },
        preserveDrawingBuffer: true,
      },
    },
    layers: [
      {
        id: 'ChinaAdminLayer_e740c737-532c-4dbf-b467-67a7381b648f',
        type: 'ChinaAdminLayer',
        metadata: { name: '区域图层' },
        sourceConfig: {
          parser: { type: 'json' },
          countryAdConfig: { countryGranularity: 'province', countryAdType: 'adcode', countryAdField: '名称' },
          datasetId: 'pos_00326cb0-a99e-4a6b-8fe5-289e6195a814',
        },
        visConfig: {
          fillColor: '#7b807d',
          opacity: 0.5,
          strokeColor: '#232424',
          lineWidth: 1,
          lineOpacity: 0.2,
          label: {
            visible: false,
            style: {
              fill: '#a9abb1',
              fontSize: 14,
              textAnchor: 'center',
              textOffset: [0, 0],
            },
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          showAdminLabel: true,
          adminLabelColor: '#c6c5c5',
          adminLabelFontSize: 14,
          showNationalBorders: false,
          adminLabelStroke: '#323232',
          adminLabelStrokeWidth: 0.5,
          state: {
            active: false,
          },
          visible: true,
          zIndex: 1,
        },
      },
      {
        id: 'LineLayer_7a1206e5-7857-4a4e-a628-9aaf3d758f64',
        type: 'LineLayer',
        metadata: { name: '2019-11-30 人口流动数据' },
        sourceConfig: {
          parser: { type: 'json', x: 'slon', y: 'slat', x1: 'elon', y1: 'elat' },
          datasetId: '2019_spatial_flow_486dd0…-447a-98a6-0b212baf89d4',
        },
        visConfig: {
          size: { field: 'realIdx', value: [1, 3] },
          color: {
            field: 'level',
            value: ['#ffffff14', '#0700ff81', '#ff0000cb'],
            scale: { type: 'cat' },
            isReversed: true,
          },
          style: {
            opacity: 0.6,
            lineType: 'solid',
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: { color: 'yellow' },
          },
          visible: true,
          zIndex: 2,
        },
      },
      {
        id: 'LineLayer_7a1206e5-7857-4a4e-a628-9aaf3d758f64_192d4534-0045-410c-bf65-8e3641a52949',
        type: 'LineLayer',
        metadata: { name: '2020-02-20 人口流动数据' },
        sourceConfig: {
          parser: { type: 'json', x: 'slon', y: 'slat', x1: 'elon', y1: 'elat' },
          datasetId: '2020_spatial_flow_9300b3ce-ac26-40f6-a294-359df6d3a411',
        },
        visConfig: {
          size: {
            field: 'realIdx',
            value: [1, 3],
          },
          color: {
            field: 'level',
            value: ['#ffffff14', '#0700ff81', '#ff0000cb'],
            scale: { type: 'cat' },
            isReversed: true,
          },
          style: {
            opacity: 0.6,
            lineType: 'solid',
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: { color: 'yellow' },
          },
          visible: false,
          zIndex: 3,
        },
      },
      {
        id: 'BubbleLayer_d630f924-8ea5-4ba3-a437-bdb21b052333_154b2ecb-d1f9-4082-8bb8-295656a74e7b',
        type: 'BubbleLayer',
        metadata: { name: '省会城市图层' },
        sourceConfig: {
          parser: { type: 'json', x: '经度', y: '纬度' },
          datasetId: 'pos_00326cb0-a99e-4a6b-8fe5-289e6195a814',
        },
        visConfig: {
          fillColor: '#2078b4',
          opacity: 1,
          strokeColor: '#252426',
          lineWidth: 1,
          lineOpacity: 1,
          radius: 5,
          label: {
            visible: false,
            style: {
              fill: '#0d0c0c',
              fontSize: 17,
              textAnchor: 'top-left',
              textOffset: [0, 12],
            },
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: {
              fillColor: false,
              strokeColor: 'yellow',
            },
            select: {
              fillColor: false,
              strokeColor: 'red',
            },
          },
          visible: true,
          zIndex: 4,
        },
      },
    ],
    widgets: [
      {
        id: 'AnalysisLayout',
        type: 'AnalysisLayout',
        metadata: { name: '布局组件' },
        properties: { showFloatPanel: false, showSidePanel: false, showBottomPanel: false },
      },
      {
        id: 'AdministrativeSelectControl',
        type: 'AdministrativeSelectControl',
        metadata: { name: '行政区域选择器' },
        properties: { position: 'lefttop' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'LocationSearchControl',
        type: 'LocationSearchControl',
        metadata: { name: '位置查询' },
        properties: { position: 'lefttop' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'ZoomControl',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: { position: 'bottomright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'PropertiesPanel',
        type: 'PropertiesPanel',
        metadata: { name: '属性面板' },
        properties: { isOpen: false, items: [] },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'LayerPopup',
        type: 'LayerPopup',
        metadata: { name: '图层信息框' },
        properties: {
          isOpen: true,
          trigger: 'hover',
          items: [
            { layerId: 'BubbleLayer_d630f924-8ea5-4ba3-a437-bdb21b052333', fields: [] },
            { layerId: 'LineLayer_7a1206e5-7857-4a4e-a628-9aaf3d758f64', fields: [] },
          ],
        },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'FullscreenControl',
        type: 'FullscreenControl',
        metadata: { name: '地图全屏' },
        properties: { position: 'topright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'LegendWidget',
        type: 'LegendWidget',
        metadata: { name: '图例组件' },
        properties: { position: 'topright', open: true },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'MapThemeControl',
        type: 'MapThemeControl',
        metadata: { name: '地图主题' },
        properties: { position: 'bottomright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
        type: 'ExportImageControl',
        metadata: { name: '导出图片' },
        properties: { position: 'topright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
    ],
  },
};

export default APP_CONFIG;
