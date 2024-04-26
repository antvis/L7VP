import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '中国第七次人口普查-城市人口增长率',
    creatTime: '2023-06-21 16:17:13',
    description:
      '中国第七次人口普查城市数据，统计时间点为 2020 年底。人口增长率，根据 2010 年的第六次人口普查数据计算获得。数据来源：https://github.com/leiii/census。',
  },
  datasets: [
    {
      id: '9e4711d0-5d01-44ce-bde8-bfebe44ba007',
      type: 'remote',
      metadata: {
        name: '中国第七次人口普查-城市数据',
      },
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*7fwkRJRGetkAAAAAAAAAAAAADrd2AQ/population-growth.json',
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
        center: [109.286937, 32.653319],
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
        id: 'ChinaAdminLayer_a1633686-6c37-46ea-916e-43aa718802bb',
        type: 'ChinaAdminLayer',
        metadata: {
          name: '中国第七次人口普查-城市数据图层',
        },
        sourceConfig: {
          parser: {
            type: 'json',
          },
          countryAdConfig: {
            countryGranularity: 'city',
            countryAdType: 'adcode',
            countryAdField: '城市代码',
          },
          datasetId: '9e4711d0-5d01-44ce-bde8-bfebe44ba007',
        },
        visConfig: {
          fillColor: {
            field: '人口增长率（%）',
            value: ['#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#fee090', '#fdae61', '#f46d43', '#d73027'],
            scale: {
              type: 'quantize',
              unknown: '#c0c0c0',
            },
            isReversed: true,
          },
          opacity: 0.7,
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
          showAdminLabel: false,
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
          showBottomPanel: true,
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
          showZoom: true,
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
              layerId: 'ChinaAdminLayer_a1633686-6c37-46ea-916e-43aa718802bb',
              datasetId: '中国第七次人口普查-城市数据_d4bd6b32-1484-429e-8374-1201fa17c1f2',
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
              layerId: 'ChinaAdminLayer_a1633686-6c37-46ea-916e-43aa718802bb',
              fields: [
                {
                  field: '城市',
                },
                {
                  field: '省',
                },
                {
                  field: '人口增长率（%）',
                },
                {
                  field: '常住人口2020',
                },
                {
                  field: '常住人口2010',
                },
                {
                  field: '平均家庭户人数2020',
                },
                {
                  field: '平均家庭户人数2010',
                },
                {
                  field: '性别比例2020（男性/女性）',
                },
                {
                  field: '性别比例2010（男性/女性）',
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
        id: 'MiniChart_51f71f89-1f1a-4d98-b1db-662f127ea725',
        type: 'MiniChart',
        metadata: {
          name: '各省份人口增长率 (%)',
        },
        properties: {
          chartType: 'column',
          sortBy: 'y',
          orderBy: 'ASC',
          aggregationMethod: 'avel',
          datasetId: '9e4711d0-5d01-44ce-bde8-bfebe44ba007',
          xField: '省',
          yField: '人口增长率（%）',
          adaptive: false,
          chartWidth: 800,
          chartHeight: 274,
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'MiniChart_4714ca90-0e28-4f6b-9c6f-475611968633',
        type: 'MiniChart',
        metadata: {
          name: '各城市人口增长率 (%)',
        },
        properties: {
          chartType: 'column',
          sortBy: 'y',
          orderBy: 'ASC',
          aggregationMethod: 'avel',
          datasetId: '9e4711d0-5d01-44ce-bde8-bfebe44ba007',
          xField: '城市',
          yField: '人口增长率（%）',
          adaptive: false,
          chartWidth: 1400,
          chartHeight: 274,
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
