import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '中国第七次人口普查-省份人口性别比',
    creatTime: '2023-06-21 17:17:48',
    description: '中国第七次人口普查省份数据，统计时间点为 2020 年底。数据来源：https://github.com/leiii/census。',
  },
  datasets: [
    {
      id: '1e06bfa2-3f0e-4dc3-9714-7f4e05aff82f',
      type: 'remote',
      metadata: {
        name: '中国第七次人口普查-省份数据',
      },
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*JODYRJsGj2UAAAAAAAAAAAAADrd2AQ/census-provice.json',
        requestOptions: {
          method: 'GET',
          headers: {},
        },
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 4,
        center: [109.41985, 34.032325],
        pitch: 0,
        bearing: 0,
        style: 'grey',
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
        id: 'ChinaAdminLayer_fd790301-780b-4e56-a183-48dfa32f11c8',
        type: 'ChinaAdminLayer',
        metadata: {
          name: '中国第七次人口普查-省份数据图层',
        },
        sourceConfig: {
          parser: {
            type: 'json',
          },
          countryAdConfig: {
            countryGranularity: 'province',
            countryAdType: 'adcode',
            countryAdField: '区划代码',
          },
          datasetId: '1e06bfa2-3f0e-4dc3-9714-7f4e05aff82f',
        },
        visConfig: {
          fillColor: {
            field: '性别比（女=100）',
            value: ['#fcfbfd', '#efedf5', '#dadaeb', '#bcbddc', '#9e9ac8', '#807dba', '#6a51a3', '#4a1486'],
            scale: {
              type: 'quantize',
              unknown: '#c0c0c0',
            },
            isReversed: false,
          },
          opacity: 0.8,
          strokeColor: '#a9abb1',
          lineWidth: 0.5,
          lineOpacity: 0.7,
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
          showNationalBorders: false,
          showAdminLabel: true,
          adminLabelColor: '#fff',
          adminLabelFontSize: 12,
          adminLabelStroke: '#606060',
          adminLabelStrokeWidth: 0.5,
          state: {
            active: {
              strokeColor: 'yellow',
              fillColor: false,
            },
            select: {
              fillColor: false,
              strokeColor: 'red',
            },
          },
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
          showBounds: false,
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
        id: 'ZoomControl1',
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
          items: [
            {
              layerId: 'ChinaAdminLayer_fd790301-780b-4e56-a183-48dfa32f11c8',
              datasetId: '中国第七次人口普查-省份数据_9680e6f7-7520-41ea-9149-20c3996c2d15',
              enable: false,
            },
          ],
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
          isOpen: true,
          trigger: 'click',
          items: [
            {
              layerId: 'ChinaAdminLayer_fd790301-780b-4e56-a183-48dfa32f11c8',
              fields: [
                {
                  field: '区划',
                },
                {
                  field: '性别比（女=100）',
                },
                {
                  field: '人口数_男',
                },
                {
                  field: '人口数_女',
                },
                {
                  field: '人口数_合计',
                },
                {
                  field: '少数民族人口比重（%）',
                },
                {
                  field: '城镇人口',
                },
                {
                  field: '乡村人口',
                },
                {
                  field: '城区人口',
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
        id: 'MapViewSettingControl1',
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
        id: 'LegendWidget1',
        type: 'LegendWidget',
        metadata: {
          name: '图例组件',
        },
        properties: {
          position: 'topright',
          open: true,
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
        id: 'MiniChart_9ef6fce2-7803-4537-9c09-05f4d962552c',
        type: 'MiniChart',
        metadata: {
          name: '省份人口性别比（女=100）',
        },
        properties: {
          chartType: 'line',
          sortBy: 'y',
          orderBy: 'ASC',
          aggregationMethod: 'sum',
          datasetId: '1e06bfa2-3f0e-4dc3-9714-7f4e05aff82f',
          xField: '区划',
          yField: '性别比（女=100）',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
    ],
  },
};

export default APP_CONFIG;
