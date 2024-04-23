import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '上海客流分析',
    creatTime: '2023-09-22 16:24:55',
    description: '通过不同地图缩放下客流的自动聚合能力，帮助用户洞察城市维度下的客流位置分布和流量指标。',
  },
  datasets: [
    {
      id: 'c88659da-b502-4eb5-b0b6-d37e92ee5f02',
      metadata: { name: '上海客流数据' },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*IFRcRbYtXG8AAAAAAAAAAAAADrd2AQ/data2.json',
        requestOptions: {
          method: 'GET',
        },
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 10.55,
        center: [121.460784, 31.216565],
        pitch: 0,
        bearing: 0,
        style: 'dark',
        WebGLParams: {
          preserveDrawingBuffer: true,
        },
        rotation: 0,
        viewMode: '2D',
        dragRotate: true,
        pitchWithRotate: true,
      },
      logoPosition: 'leftbottom',
    },
    layers: [
      {
        id: 'FlowLayer_76da712e-dea4-473b-b61c-a9f9a6e160fc',
        type: 'FlowLayer',
        metadata: {
          name: '客流聚合图层',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            x: 'f_lon',
            y: 'f_lat',
            x1: 't_lon',
            y1: 't_lat',
            weight: 'weight',
          },
          datasetId: 'c88659da-b502-4eb5-b0b6-d37e92ee5f02',
        },
        visConfig: {
          clusterZoomStep: 1,
          clusterNodeSize: 64,
          clusterRadius: 40,
          clusterExtent: 512,
          maxTopFlowNum: 5000,
          circleOpacity: 1,
          circleStrokeColor: '#000',
          circleStrokeWidth: 1,
          fadeOpacityEnabled: true,
          fadeOpacityAmount: 32,
          lineStroke: '#000000',
          lineStrokeWidth: 1,
          lineStrokeOpacity: 0.5,
          lineOpacity: 1,
          circleColor: '#fff',
          circleRadius: {
            field: 'weight',
            value: [1, 16],
          },
          lineColor: {
            field: 'weight',
            value: ['#0570b0', '#74a9cf', '#bdc9e1', '#f1eef6'],
          },
          lineWidth: {
            field: 'weight',
            value: [1, 16],
          },
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          linColorIsReversed: true,
          clusterType: 'HCA',
          visible: true,
        },
      },
    ],
    widgets: [
      {
        id: 'AnalysisLayout',
        type: 'AnalysisLayout',
        metadata: {
          name: '布局组件',
        },
        properties: {
          showFloatPanel: false,
          showSidePanel: false,
          showBottomPanel: false,
        },
      },
      {
        id: 'AdministrativeSelectControl',
        type: 'AdministrativeSelectControl',
        metadata: {
          name: '行政区域选择器',
        },
        properties: {
          position: 'lefttop',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LocationSearchControl',
        type: 'LocationSearchControl',
        metadata: {
          name: '位置查询',
        },
        properties: {
          position: 'lefttop',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'ZoomControl',
        type: 'ZoomControl',
        metadata: {
          name: '缩放器',
        },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'PropertiesPanel',
        type: 'PropertiesPanel',
        metadata: {
          name: '属性面板',
        },
        properties: {
          isOpen: false,
          items: [],
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LayerPopup',
        type: 'LayerPopup',
        metadata: {
          name: '图层信息框',
        },
        properties: {
          isOpen: false,
          trigger: 'hover',
          items: [
            {
              layerId: 'FlowLayer_9b0234f4-9f63-45b5-b322-1febcae1c6a8',
              fields: [
                {
                  field: 'weight',
                  formatField: '权重',
                },
              ],
            },
          ],
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'FullscreenControl',
        type: 'FullscreenControl',
        metadata: {
          name: '地图全屏',
        },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MapViewSettingControl',
        type: 'MapViewSettingControl',
        metadata: {
          name: '地图倾角',
        },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LegendWidget',
        type: 'LegendWidget',
        metadata: {
          name: '图例组件',
        },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MapThemeControl',
        type: 'MapThemeControl',
        metadata: {
          name: '地图主题',
        },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MouseLocationControl',
        type: 'MouseLocationControl',
        metadata: {
          name: '光标经纬度',
        },
        properties: {
          position: 'leftbottom',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'ScaleControl',
        type: 'ScaleControl',
        metadata: {
          name: '比例尺',
        },
        properties: {
          position: 'leftbottom',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
        type: 'ExportImageControl',
        metadata: {
          name: '导出图片',
        },
        properties: {
          position: 'topright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'PropertiesPanel_e6e6b828-fe13-45e0-8f33-e432f8d461b5',
        type: 'PropertiesPanel',
        metadata: {
          name: '属性面板',
        },
        properties: {
          isOpen: true,
          items: [
            {
              layerId: 'FlowLayer_76da712e-dea4-473b-b61c-a9f9a6e160fc',
              datasetId: 'c88659da-b502-4eb5-b0b6-d37e92ee5f02',
              enable: true,
            },
          ],
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default APP_CONFIG;
