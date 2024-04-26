import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '全国高等学校分布',
    creatTime: '2023-07-01 12:47:13',
    description: '数据来源：教育部 http://www.moe.gov.cn/jyb_xxgk/s5743/s5744/A03/202110/t20211025_574874.html',
  },
  datasets: [
    {
      id: '196055b3-7587-4d8e-aabd-5b1c76176bf4',
      type: 'remote',
      metadata: { name: '全国普通高等学校名单' },
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*ikZuSbVR6P4AAAAAAAAAAAAADrd2AQ/china-university-list.json',
        requestOptions: { method: 'GET', headers: {} },
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 4.35,
        center: [108.309857, 37.033557],
        pitch: 0,
        bearing: 0,
        style: 'grey',
        WebGLParams: { preserveDrawingBuffer: true },
        rotation: 0,
        viewMode: '2D',
        dragRotate: true,
        pitchWithRotate: true,
        preserveDrawingBuffer: true,
      },
      logoPosition: 'leftbottom',
    },
    layers: [
      {
        id: 'ChinaAdminLayer_499be742-6e8b-478d-ae61-466679d9ddf4',
        type: 'ChinaAdminLayer',
        metadata: { name: '高校省份图层' },
        sourceConfig: {
          parser: { type: 'json' },
          countryAdConfig: { countryGranularity: 'province', countryAdType: 'adname', countryAdField: '所在城市' },
          datasetId: '196055b3-7587-4d8e-aabd-5b1c76176bf4',
        },
        visConfig: {
          fillColor: '#5d7092',
          opacity: 0.3,
          strokeColor: '#269a99',
          lineWidth: 1,
          lineOpacity: 1,
          label: { visible: false, style: { fill: 'red', fontSize: 14, textAnchor: 'center', textOffset: [0, 0] } },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          showAdminLabel: true,
          adminLabelColor: '#a9abb1',
          adminLabelFontSize: 14,
          showNationalBorders: false,
          adminLabelStroke: '#323232',
          adminLabelStrokeWidth: 0.5,
          state: {
            active: { strokeColor: 'yellow', fillColor: false },
            select: { fillColor: false, strokeColor: 'red' },
          },
          visible: true,
        },
      },
      {
        id: 'BubbleLayer_989764c2-0f33-480b-b09a-f14ea8b8435d',
        type: 'BubbleLayer',
        metadata: { name: '高校分布图层' },
        sourceConfig: {
          parser: { type: 'json', x: '经度', y: '纬度' },
          datasetId: '196055b3-7587-4d8e-aabd-5b1c76176bf4',
        },
        visConfig: {
          zIndex: 1,
          fillColor: {
            field: '办学性质',
            value: ['#1b9e77', '#d95f02', '#7570b3', '#e7298a'],
            scale: { type: 'cat', unknown: '#c0c0c0' },
            isReversed: false,
          },
          opacity: 1,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          radius: 5,
          label: { visible: false, style: { fill: '#c0c0c0', fontSize: 15, textAnchor: 'center', textOffset: [0, 0] } },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
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
        id: 'AdministrativeSelectControl',
        type: 'AdministrativeSelectControl',
        metadata: { name: '行政区域选择器' },
        properties: { position: 'lefttop', showBounds: false },
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
        id: 'ZoomControl1',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: { position: 'bottomright' },
        container: { id: 'AnalysisLayout', slot: 'controls' },
      },
      {
        id: 'PropertiesPanel',
        type: 'PropertiesPanel',
        metadata: { name: '属性面板' },
        properties: {
          isOpen: false,
          items: [
            {
              layerId: 'BubbleLayer_989764c2-0f33-480b-b09a-f14ea8b8435d',
              datasetId: '全国普通高等学校名单_cc3884a2-51a1-42b1-b50b-94d1d808027a',
              enable: false,
            },
            {
              layerId: 'ChinaAdminLayer_499be742-6e8b-478d-ae61-466679d9ddf4',
              datasetId: '全国普通高等学校名单_cc3884a2-51a1-42b1-b50b-94d1d808027a',
              enable: false,
            },
          ],
        },
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
            {
              layerId: 'BubbleLayer_989764c2-0f33-480b-b09a-f14ea8b8435d',
              fields: [
                { field: '学校名称' },
                { field: '学校标识码' },
                { field: '主管部门' },
                { field: '所在城市' },
                { field: '办学层次' },
                { field: '办学性质' },
              ],
            },
            { layerId: 'ChinaAdminLayer_499be742-6e8b-478d-ae61-466679d9ddf4', fields: [] },
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
        id: 'LegendWidget1',
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
