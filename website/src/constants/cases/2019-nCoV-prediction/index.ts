import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '疫情各城市首轮感染高峰期预测可视化',
    creatTime: '2022-12-21 16:00:15',
    description: '第一波疫情达峰预测与累计感染占总人口占比，预测数据来源于 “数据帝 chenqin”。',
  },
  datasets: [
    {
      id: '12.19 各城市首轮感染高峰期预测_5d159569-f5f0-41d1-a144-3522639f7eb7',
      metadata: {
        name: '12.19 各城市首轮感染高峰期预测',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url:
          'https://mdn.alipayobjects.com/afts/file/A*Ji33RZ5FTx0AAAAAAAAAAAAADrd2AQ/12.19%20%E5%90%84%E5%9F%8E%E5%B8%82%E9%A6%96%E8%BD%AE%E6%84%9F%E6%9F%93%E9%AB%98%E5%B3%B0%E6%9C%9F%E9%A2%84%E6%B5%8B.json',
        requestOptions: {
          method: 'GET',
        },
      },
      columns: [
        {
          type: 'string',
          name: '城市名称',
        },
        {
          type: 'number',
          name: '达峰进度条',
        },
        {
          type: 'number',
          name: '结束进度条',
        },
        {
          type: 'string',
          name: '第一波疫情达峰日期',
        },
        {
          type: 'string',
          name: '第一波疫情结束日期',
        },
        {
          type: 'number',
          name: '累计感染占总人口比值',
        },
        {
          type: 'number',
          name: 'adcode',
        },
        {
          type: 'string',
          name: 'level',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'parent',
        },
        {
          type: 'geo',
          name: 'center',
        },
        {
          type: 'geo',
          name: 'centroid',
        },
        {
          type: 'geo',
          name: 'geometry',
        },
      ],
    },
    {
      id: '12.20 各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841',
      metadata: {
        name: '12.20 各城市首轮感染高峰期预测',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url:
          'https://mdn.alipayobjects.com/afts/file/A*3bbDQph-IqIAAAAAAAAAAAAADrd2AQ/12.20 各城市首轮感染高峰期预测.json',
        requestOptions: {
          method: 'GET',
        },
      },
      columns: [
        {
          type: 'string',
          name: '城市名称',
        },
        {
          type: 'number',
          name: '达峰进度条',
        },
        {
          type: 'number',
          name: '结束进度条',
        },
        {
          type: 'string',
          name: '第一波疫情达峰日期',
        },
        {
          type: 'string',
          name: '第一波疫情结束日期',
        },
        {
          type: 'number',
          name: '累计感染占总人口比值',
        },
        {
          type: 'number',
          name: 'adcode',
        },
        {
          type: 'string',
          name: 'level',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'parent',
        },
        {
          type: 'geo',
          name: 'center',
        },
        {
          type: 'geo',
          name: 'centroid',
        },
        {
          type: 'geo',
          name: 'geometry',
        },
      ],
    },
    {
      id: '12.20 各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb',
      metadata: {
        name: '12.20 各省份首轮感染高峰期预测',
      },
      type: 'remote',
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*BHxBT6M6IFcAAAAAAAAAAAAADrd2AQ/12.20-province.json',
        requestOptions: {
          method: 'GET',
        },
      },
      columns: [
        {
          type: 'string',
          name: '省份名称',
        },
        {
          type: 'number',
          name: '达峰进度条',
        },
        {
          type: 'number',
          name: 'adcode',
        },
        {
          type: 'string',
          name: 'level',
        },
        {
          type: 'string',
          name: 'name',
        },
        {
          type: 'string',
          name: 'parent',
        },
        {
          type: 'number',
          name: 'childrenNum',
        },
        {
          type: 'geo',
          name: 'center',
        },
        {
          type: 'geo',
          name: 'centroid',
        },
        {
          type: 'geo',
          name: 'geometry',
        },
      ],
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode',
      config: {
        zoom: 3.8,
        center: [107.30211, 35.900851],
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
        id:
          'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_3441d548-2972-492d-969d-a20abc61aba0_123a500a-ec8d-4172-b383-661a791cd86f',
        type: 'ChoroplethLayer',
        metadata: {
          name: '12.20 达峰进度-各城市首轮感染',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'geometry',
          },
          datasetId: '12.20 各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841',
        },
        visConfig: {
          fillColor: {
            field: '达峰进度条',
            value: ['#f1eef6', '#d4b9da', '#c994c7', '#df65b0', '#dd1c77', '#980043'],
            scale: {
              type: 'quantize',
            },
          },
          opacity: 0.8,
          strokeColor: '#ff9d4d',
          lineWidth: 0.5,
          lineOpacity: 0.4,
          label: {
            field: '达峰进度条',
            visible: true,
            style: {
              fill: '#a9abb1',
              fontSize: 13,
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
              fillColor: false,
            },
            select: {
              fillColor: false,
              strokeColor: 'red',
            },
          },
          visible: false,
        },
      },
      {
        id: 'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_931c01e9-849e-475c-81c1-b9a67345d28b',
        type: 'ChoroplethLayer',
        metadata: {
          name: '12.20 占总人口比值-各城市首轮感染',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'geometry',
          },
          datasetId: '12.20 各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841',
        },
        visConfig: {
          fillColor: {
            field: '累计感染占总人口比值',
            value: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
            scale: {
              type: 'quantize',
            },
          },
          opacity: 0.8,
          strokeColor: '#a9abb1',
          lineWidth: 0.5,
          lineOpacity: 0.7,
          label: {
            field: '累计感染占总人口比值',
            visible: true,
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
          visible: false,
        },
      },
      {
        id: 'BubbleLayer_db9994a9-e17e-45cc-b6bf-dbcbaf9f8310_ee2dd50f-b268-4ef0-8739-da416f650048',
        type: 'BubbleLayer',
        metadata: {
          name: '12.20 各预测城市名称',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'geometry',
          },
          datasetId: '12.20 各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841',
        },
        visConfig: {
          fillColor: '#a9abb1',
          opacity: 0,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          radius: 0,
          label: {
            field: '城市名称',
            visible: true,
            style: {
              fill: '#c0c0c0',
              fontSize: 12,
              textAnchor: 'center',
              textOffset: [0, -30],
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
          visible: false,
        },
      },
      {
        id: 'ChoroplethLayer_2377a64b-ef83-4151-a967-82fdc0749f97',
        type: 'ChoroplethLayer',
        metadata: {
          name: '12.20 达峰进度-各省份首轮感染',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'geometry',
          },
          datasetId: '12.20 各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb',
        },
        visConfig: {
          fillColor: {
            field: '达峰进度条',
            value: ['#fee5d9', '#fcbba1', '#fc9272', '#fb6a4a', '#de2d26', '#a50f15'],
            scale: {
              type: 'quantize',
              unknown: '#c0c0c0',
            },
          },
          opacity: 1,
          strokeColor: '#a9abb1',
          lineWidth: 0.4,
          lineOpacity: 0.5,
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
      {
        id: 'BubbleLayer_9cc7d746-45bc-454c-b760-65ef3fa4dc9f',
        type: 'BubbleLayer',
        metadata: {
          name: '12.20 各省份名称',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'center',
          },
          datasetId: '12.20 各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb',
        },
        visConfig: {
          fillColor: '#a9abb1',
          opacity: 0,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          radius: 0,
          label: {
            field: '省份名称',
            visible: true,
            style: {
              fill: '#fff',
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
              fillColor: false,
              strokeColor: 'yellow',
            },
            select: {
              fillColor: false,
              strokeColor: 'red',
            },
          },
          visible: true,
        },
      },
      {
        id: 'BubbleLayer_1cc7d746-45bc-454c-b760-55ef3fa4dc8f',
        type: 'BubbleLayer',
        metadata: {
          name: '12.20 各省份指数',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            geometry: 'center',
          },
          datasetId: '12.20 各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb',
        },
        visConfig: {
          fillColor: '#a9abb1',
          opacity: 0,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          radius: 0,
          label: {
            field: '达峰进度条',
            visible: true,
            style: {
              fill: '#fff',
              fontSize: 14,
              textAnchor: 'center',
              textOffset: [0, -30],
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
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LocationSearchControl1',
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
              layerId:
                'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_3441d548-2972-492d-969d-a20abc61aba0_123a500a-ec8d-4172-b383-661a791cd86f',
              datasetId: '12',
              enable: {
                '20各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841': false,
              },
            },
            {
              layerId: 'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_931c01e9-849e-475c-81c1-b9a67345d28b',
              datasetId: '12',
              enable: {
                '20各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb': false,
              },
            },
            {
              layerId: 'BubbleLayer_db9994a9-e17e-45cc-b6bf-dbcbaf9f8310_ee2dd50f-b268-4ef0-8739-da416f650048',
              datasetId: '12',
              enable: {
                '20各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841': false,
              },
            },
            {
              layerId: 'ChoroplethLayer_2377a64b-ef83-4151-a967-82fdc0749f97',
              datasetId: '12',
              enable: {
                '20各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb': false,
              },
            },
            {
              layerId: 'BubbleLayer_9cc7d746-45bc-454c-b760-65ef3fa4dc9f',
              datasetId: '12',
              enable: {
                '20各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb': false,
              },
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
          trigger: 'hover',
          items: [
            {
              layerId:
                'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_3441d548-2972-492d-969d-a20abc61aba0_123a500a-ec8d-4172-b383-661a791cd86f',
              fields: [
                {
                  field: '城市名称',
                },
                {
                  field: '达峰进度条',
                },
                {
                  field: '结束进度条',
                },
                {
                  field: '第一波疫情达峰日期',
                },
                {
                  field: '第一波疫情结束日期',
                },
                {
                  field: '累计感染占总人口比值',
                },
              ],
            },
            {
              layerId: 'ChoroplethLayer_c3bd4d87-4bdd-492a-b417-9847c0518c0f_931c01e9-849e-475c-81c1-b9a67345d28b',
              fields: [
                {
                  field: '城市名称',
                },
                {
                  field: '达峰进度条',
                },
                {
                  field: '结束进度条',
                },
                {
                  field: '第一波疫情达峰日期',
                },
                {
                  field: '第一波疫情结束日期',
                },
                {
                  field: '累计感染占总人口比值',
                },
              ],
            },
            {
              layerId: 'BubbleLayer_db9994a9-e17e-45cc-b6bf-dbcbaf9f8310_ee2dd50f-b268-4ef0-8739-da416f650048',
              fields: [],
            },
            {
              layerId: 'ChoroplethLayer_2377a64b-ef83-4151-a967-82fdc0749f97',
              fields: [
                {
                  field: '省份名称',
                },
                {
                  field: '达峰进度条',
                },
              ],
            },
            {
              layerId: 'BubbleLayer_9cc7d746-45bc-454c-b760-65ef3fa4dc9f',
              fields: [],
            },
          ],
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'FullscreenControl1',
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
        id: 'MapThemeControl2',
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
        id: 'MouseLocationControl4',
        type: 'MouseLocationControl',
        metadata: {
          name: '光标经纬度',
        },
        properties: {
          position: 'bottomleft',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'ScaleControl3',
        type: 'ScaleControl',
        metadata: {
          name: '比例尺',
        },
        properties: {
          position: 'bottomleft',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MiniChart_4b419c39-0c9a-4cd4-b8c9-333dc4097e77',
        type: 'MiniChart',
        metadata: {
          name: '12.19 各城市达峰进度比',
        },
        properties: {
          datasetId: '12.19 各城市首轮感染高峰期预测_5d159569-f5f0-41d1-a144-3522639f7eb7',
          chartType: 'column',
          xField: '城市名称',
          yField: '达峰进度条',
          sortBy: 'y',
          orderBy: 'DESC',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'MiniChart_0b419c39-0c9a-4cd4-b8c9-333dc4097e37',
        type: 'MiniChart',
        metadata: {
          name: '12.20 各省份达峰进度比',
        },
        properties: {
          datasetId: '12.20 各省份首轮感染高峰期预测_bf99e076-cb01-4fa5-9e61-4966706a7edb',
          chartType: 'column',
          xField: '省份名称',
          yField: '达峰进度条',
          sortBy: 'y',
          orderBy: 'DESC',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'MiniChart_1e1ef926-4924-4eb2-99b6-b396ee87663c',
        type: 'MiniChart',
        metadata: {
          name: '12.20 各城市感染占总人口比',
        },
        properties: {
          datasetId: '12.20 各城市首轮感染高峰期预测_d3aebe24-95de-4247-8bf7-d9fe31a8a841',
          chartType: 'column',
          xField: '城市名称',
          yField: '累计感染占总人口比值',
          sortBy: 'y',
          orderBy: 'DESC',
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
