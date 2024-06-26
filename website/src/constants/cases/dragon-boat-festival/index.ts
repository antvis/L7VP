import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: { name: '2024 端午各省热度排行', description: '2024 端午各省热搜指数，数据来源于百度指数' },
  datasets: [
    {
      id: '34db8783-353c-4e47-94d5-a13d638a942d',
      metadata: { name: 'province' },
      data: [
        {
          adcode: 710000,
          level: 'city',
          name: '台湾省',
          pinyin: 'taiwansheng',
          childrenNum: 0,
          center: { type: 'Point', coordinates: [121.509062, 25.044332] },
          排名: 34,
        },
        {
          adcode: 820000,
          level: 'city',
          name: '澳门特别行政区',
          pinyin: 'aomentebiehangzhengqu',
          childrenNum: 8,
          center: { type: 'Point', coordinates: [113.543076, 22.186927] },
          排名: 33,
        },
        {
          adcode: 540000,
          level: 'province',
          name: '西藏自治区',
          pinyin: 'xicangzizhiqu',
          childrenNum: 7,
          center: { type: 'Point', coordinates: [91.117449, 29.648694] },
          排名: 32,
        },
        {
          adcode: 810000,
          level: 'city',
          name: '香港特别行政区',
          pinyin: 'xianggangtebiehangzhengqu',
          childrenNum: 18,
          center: { type: 'Point', coordinates: [114.171203, 22.277468] },
          排名: 31,
        },
        {
          adcode: 630000,
          level: 'province',
          name: '青海省',
          pinyin: 'qinghaisheng',
          childrenNum: 8,
          center: { type: 'Point', coordinates: [101.780482, 36.622538] },
          排名: 30,
        },
        {
          adcode: 640000,
          level: 'province',
          name: '宁夏回族自治区',
          pinyin: 'ningxiahuizuzizhiqu',
          childrenNum: 5,
          center: { type: 'Point', coordinates: [106.258889, 38.472273] },
          排名: 29,
        },
        {
          adcode: 620000,
          level: 'province',
          name: '甘肃省',
          pinyin: 'gansusheng',
          childrenNum: 14,
          center: { type: 'Point', coordinates: [103.826777, 36.060634] },
          排名: 28,
        },
        {
          adcode: 460000,
          level: 'province',
          name: '海南省',
          pinyin: 'hainansheng',
          childrenNum: 19,
          center: { type: 'Point', coordinates: [110.348781, 20.018639] },
          排名: 27,
        },
        {
          adcode: 150000,
          level: 'province',
          name: '内蒙古自治区',
          pinyin: 'neimengguzizhiqu',
          childrenNum: 12,
          center: { type: 'Point', coordinates: [111.765226, 40.818233] },
          排名: 26,
        },
        {
          adcode: 650000,
          level: 'province',
          name: '新疆维吾尔自治区',
          pinyin: 'xinjiangweiwuerzizhiqu',
          childrenNum: 25,
          center: { type: 'Point', coordinates: [87.628579, 43.793301] },
          排名: 25,
        },
        {
          adcode: 140000,
          level: 'province',
          name: '山西省',
          pinyin: 'shanxisheng',
          childrenNum: 11,
          center: { type: 'Point', coordinates: [112.578781, 37.813948] },
          排名: 24,
        },
        {
          adcode: 520000,
          level: 'province',
          name: '贵州省',
          pinyin: 'guizhousheng',
          childrenNum: 9,
          center: { type: 'Point', coordinates: [106.705251, 26.600328] },
          排名: 23,
        },
        {
          adcode: 220000,
          level: 'province',
          name: '吉林省',
          pinyin: 'jilinsheng',
          childrenNum: 9,
          center: { type: 'Point', coordinates: [125.325802, 43.896942] },
          排名: 22,
        },
        {
          adcode: 230000,
          level: 'province',
          name: '黑龙江省',
          pinyin: 'heilongjiangsheng',
          childrenNum: 13,
          center: { type: 'Point', coordinates: [126.661998, 45.742253] },
          排名: 21,
        },
        {
          adcode: 120000,
          level: 'province',
          name: '天津市',
          pinyin: 'tianjinshi',
          childrenNum: 1,
          center: { type: 'Point', coordinates: [117.201509, 39.085318] },
          排名: 20,
        },
        {
          adcode: 530000,
          level: 'province',
          name: '云南省',
          pinyin: 'yunnansheng',
          childrenNum: 16,
          center: { type: 'Point', coordinates: [102.709372, 25.046432] },
          排名: 19,
        },
        {
          adcode: 450000,
          level: 'province',
          name: '广西壮族自治区',
          pinyin: 'guangxizhuangzuzizhiqu',
          childrenNum: 14,
          center: { type: 'Point', coordinates: [108.327537, 22.816659] },
          排名: 18,
        },
        {
          adcode: 500000,
          level: 'province',
          name: '重庆市',
          pinyin: 'zhongqingshi',
          childrenNum: 1,
          center: { type: 'Point', coordinates: [106.550483, 29.563707] },
          排名: 17,
        },
        {
          adcode: 610000,
          level: 'province',
          name: '陕西省',
          pinyin: 'shanxisheng',
          childrenNum: 10,
          center: { type: 'Point', coordinates: [108.953939, 34.266611] },
          排名: 16,
        },
        {
          adcode: 360000,
          level: 'province',
          name: '江西省',
          pinyin: 'jiangxisheng',
          childrenNum: 11,
          center: { type: 'Point', coordinates: [115.816587, 28.637234] },
          排名: 15,
        },
        {
          adcode: 210000,
          level: 'province',
          name: '辽宁省',
          pinyin: 'liaoningsheng',
          childrenNum: 14,
          center: { type: 'Point', coordinates: [123.435093, 41.836743] },
          排名: 14,
        },
        {
          adcode: 130000,
          level: 'province',
          name: '河北省',
          pinyin: 'hebeisheng',
          childrenNum: 11,
          center: { type: 'Point', coordinates: [114.530399, 38.037707] },
          排名: 13,
        },
        {
          adcode: 430000,
          level: 'province',
          name: '湖南省',
          pinyin: 'hunansheng',
          childrenNum: 14,
          center: { type: 'Point', coordinates: [112.982951, 28.116007] },
          排名: 12,
        },
        {
          adcode: 350000,
          level: 'province',
          name: '福建省',
          pinyin: 'fujiansheng',
          childrenNum: 9,
          center: { type: 'Point', coordinates: [119.296194, 26.101082] },
          排名: 11,
        },
        {
          adcode: 340000,
          level: 'province',
          name: '安徽省',
          pinyin: 'anhuisheng',
          childrenNum: 16,
          center: { type: 'Point', coordinates: [117.330139, 31.734559] },
          排名: 10,
        },
        {
          adcode: 420000,
          level: 'province',
          name: '湖北省',
          pinyin: 'hubeisheng',
          childrenNum: 17,
          center: { type: 'Point', coordinates: [114.341552, 30.546222] },
          排名: 9,
        },
        {
          adcode: 410000,
          level: 'province',
          name: '河南省',
          pinyin: 'henansheng',
          childrenNum: 18,
          center: { type: 'Point', coordinates: [113.753094, 34.767052] },
          排名: 8,
        },
        {
          adcode: 510000,
          level: 'province',
          name: '四川省',
          pinyin: 'sichuansheng',
          childrenNum: 21,
          center: { type: 'Point', coordinates: [104.076452, 30.651696] },
          排名: 7,
        },
        {
          adcode: 370000,
          level: 'province',
          name: '山东省',
          pinyin: 'shandongsheng',
          childrenNum: 16,
          center: { type: 'Point', coordinates: [117.020725, 36.670201] },
          排名: 6,
        },
        {
          adcode: 310000,
          level: 'province',
          name: '上海市',
          pinyin: 'shanghaishi',
          childrenNum: 1,
          center: { type: 'Point', coordinates: [121.473667, 31.230525] },
          排名: 5,
        },
        {
          adcode: 110000,
          level: 'province',
          name: '北京市',
          pinyin: 'beijingshi',
          childrenNum: 1,
          center: { type: 'Point', coordinates: [116.407387, 39.904179] },
          排名: 4,
        },
        {
          adcode: 330000,
          level: 'province',
          name: '浙江省',
          pinyin: 'zhejiangsheng',
          childrenNum: 11,
          center: { type: 'Point', coordinates: [120.152575, 30.266619] },
          排名: 3,
        },
        {
          adcode: 320000,
          level: 'province',
          name: '江苏省',
          pinyin: 'jiangsusheng',
          childrenNum: 13,
          center: { type: 'Point', coordinates: [118.763563, 32.061377] },
          排名: 2,
        },
        {
          adcode: 440000,
          level: 'province',
          name: '广东省',
          pinyin: 'guangdongsheng',
          childrenNum: 21,
          center: { type: 'Point', coordinates: [113.266887, 23.133306] },
          排名: 1,
        },
      ],
      type: 'local',
      columns: [
        { type: 'number', name: 'adcode' },
        { type: 'string', name: 'level' },
        { type: 'string', name: 'name' },
        { type: 'string', name: 'pinyin' },
        { type: 'number', name: 'childrenNum' },
        { type: 'geo', name: 'center' },
        { type: 'number', name: '排名' },
      ],
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 3.896451742743245,
        center: [108.84215684256446, 32.34877598549369],
        pitch: 0,
        bearing: 0,
        WebGLParams: { preserveDrawingBuffer: true },
        rotation: 0,
        dragRotate: true,
        pitchWithRotate: true,
        preserveDrawingBuffer: true,
        style: 'light',
      },
      logoPosition: 'leftbottom',
    },
    layers: [
      {
        id: 'ChinaAdminLayer_32df43d4-4a2e-4337-b06d-09a58d849827',
        type: 'ChinaAdminLayer',
        metadata: { name: '各省指数排名' },
        sourceConfig: {
          countryAdConfig: { countryGranularity: 'province', countryAdType: 'adcode', countryAdField: 'adcode' },
          datasetId: '34db8783-353c-4e47-94d5-a13d638a942d',
        },
        visConfig: {
          fillColor: {
            field: '排名',
            value: ['#006837', '#31a354', '#78c679', '#addd8e', '#d9f0a3', '#ffffcc'],
            scale: { type: 'threshold', domain: [2, 5, 8, 12, 20], unknown: '#f000' },
            isReversed: false,
          },
          opacity: 0.8,
          strokeColor: '#abadb2',
          lineWidth: 0.5,
          lineOpacity: 0.3,
          label: { visible: false, style: { fill: '#a9abb1', fontSize: 14, textAnchor: 'center', textOffset: [0, 0] } },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          showAdminLabel: true,
          adminLabelColor: '#f7f6f6',
          adminLabelFontSize: 14,
          adminLabelStroke: '#606060',
          adminLabelStrokeWidth: 5,
          showNationalBorders: true,
          coastBorderColor: '#a9abb1',
          nationalBorderColor: '#a9abb1',
          visible: true,
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
        id: 'ZoomControl',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: { position: 'bottomright', showZoom: true },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'LayerPopup',
        type: 'LayerPopup',
        metadata: { name: '信息框' },
        properties: {
          isOpen: true,
          trigger: 'hover',
          items: [
            {
              layerId: 'ChoroplethLayer_9d3651d9-3b39-423c-b964-653dbcb7b6ca',
              fields: [
                { field: 'adcode' },
                { field: 'level' },
                { field: 'name' },
                { field: 'pinyin' },
                { field: 'parent' },
                { field: 'childrenNum' },
              ],
            },
            {
              layerId: 'BubbleLayer_6c7cc50e-26a2-4391-b9f0-0e8468932b04',
              fields: [
                { field: 'adcode' },
                { field: 'level' },
                { field: 'name' },
                { field: 'pinyin' },
                { field: 'parent' },
                { field: 'childrenNum' },
              ],
            },
            {
              layerId: 'BubbleLayer_612f10b8-99bb-4b8d-82f0-46562878f074',
              fields: [
                { field: 'adcode' },
                { field: 'level' },
                { field: 'name' },
                { field: 'pinyin' },
                { field: 'parent' },
                { field: 'childrenNum' },
              ],
            },
            {
              layerId: 'BubbleLayer_14838cae-c057-4413-92f7-f73f2ab811f3',
              fields: [
                { field: '1' },
                { field: '110000' },
                { field: 'province' },
                { field: '北京市' },
                { field: 'beijingshi' },
              ],
            },
            {
              layerId: 'BubbleLayer_86f2da72-c1c1-4c96-b3ca-d76a5ea065f9',
              fields: [
                { field: 'adcode' },
                { field: 'level' },
                { field: 'name' },
                { field: 'pinyin' },
                { field: 'childrenNum' },
              ],
            },
            {
              layerId: 'BubbleLayer_1657de38-1770-491c-9918-38aa5d19ccfe',
              fields: [
                { field: 'adcode' },
                { field: 'level' },
                { field: 'name' },
                { field: 'pinyin' },
                { field: 'childrenNum' },
                { field: '排名' },
              ],
            },
            {
              layerId: 'ChinaAdminLayer_32df43d4-4a2e-4337-b06d-09a58d849827',
              fields: [{ field: 'name' }, { field: '排名' }],
            },
          ],
        },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'LegendWidget',
        type: 'LegendWidget',
        metadata: { name: '图例' },
        properties: { position: 'bottomleft', open: true },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'MapThemeControl',
        type: 'MapThemeControl',
        metadata: { name: '底图主题切换' },
        properties: { position: 'bottomright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
        type: 'ExportImageControl',
        metadata: { name: '地图截图' },
        properties: { position: 'topright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
    ],
  },
};

export default APP_CONFIG;
