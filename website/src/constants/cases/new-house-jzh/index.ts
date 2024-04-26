import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '上海杭州南京及周边新楼盘',
    creatTime: '2023-10-16 20:59:27',
    description:
      '地图上标识出楼盘的分布情况，点的大小表示平均总价，点颜色深浅表示均价，从时间变化和空间分布的视角，每年新楼盘的分布及价格变化等趋势。',
    assetPackageIds: ['@antv/li-core-assets', '@antv/li-analysis-assets'],
  },
  datasets: [
    {
      id: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
      metadata: {
        name: '江浙沪新楼盘数据',
      },
      type: 'remote',
      columns: [
        {
          type: 'string',
          name: '_id',
        },
        {
          type: 'string',
          name: '楼盘名',
        },
        {
          type: 'string',
          name: '地址',
        },
        {
          type: 'string',
          name: '小区名称',
        },
        {
          type: 'string',
          name: '城市名称',
        },
        {
          type: 'string',
          name: '开发商',
        },
        {
          type: 'string',
          name: '街区名称',
        },
        {
          type: 'string',
          name: '房屋款型',
        },
        {
          type: 'string',
          name: '房屋类别',
        },
        {
          type: 'number',
          name: '纬度',
        },
        {
          type: 'number',
          name: '经度',
        },
        {
          type: 'number',
          name: '均价(元/平米)',
        },
        {
          type: 'number',
          name: '参考总价(万元)',
        },
        {
          type: 'date',
          name: '开盘日期',
          format: 'YYYY-MM-DD',
        },
        {
          type: 'date',
          name: '房价确认时间',
          format: 'YYYY/MM/DD HH:mm:ss',
        },
        {
          type: 'string',
          name: '物业公司',
        },
        {
          type: 'string',
          name: '房屋照片',
        },
      ],
      filter: {
        relation: 'AND',
        children: [
          {
            id: '98e123c7-102b-c762-ce71-3b235d2ed64b',
            type: 'number',
            field: '均价(元/平米)',
            operator: '>',
            value: 0,
          },
          {
            id: '7dd5ca42-6fb2-ceb4-dbbb-95061d53980c',
            type: 'number',
            field: '参考总价(万元)',
            operator: '>',
            value: 0,
          },
          {
            id: '9c1b2298-d22a-fc24-b9d9-38bf1e61859e',
            type: 'string',
            field: '城市名称',
            operator: 'IN',
            value: [
              '上海市',
              '杭州市',
              '苏州市',
              '湖州市',
              '嘉兴市',
              '无锡市',
              '宁波市',
              '常州市',
              '舟山市',
              '南通市',
              '南京市',
              '镇江市',
              '扬州市',
              '绍兴市',
            ],
          },
          {
            id: '19045560-7474-ebee-0a79-f7a0700e9f8a',
            type: 'string',
            field: '房屋类别',
            operator: 'IN',
            value: ['住宅'],
          },
        ],
      },
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*bcirT44OXmcAAAAAAAAAAAAADrd2AQ/new-housing-data-in-jzh.json',
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
        zoom: 8.16,
        center: [119.679625, 31.277315],
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
        id: 'BubbleLayer_09d0f372-3b28-451e-902a-ae3f62181c68',
        type: 'BubbleLayer',
        metadata: {
          name: '周边城市新楼盘均价',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            x: '经度',
            y: '纬度',
          },
          datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
        },
        visConfig: {
          fillColor: {
            field: '均价(元/平米)',
            value: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'],
            scale: {
              type: 'quantile',
              unknown: '#c0c0c0',
            },
            isReversed: false,
          },
          opacity: 0.8,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          radius: {
            field: '参考总价(万元)',
            value: [8, 16],
          },
          label: {
            visible: false,
            style: {
              fill: '#c0c0c0',
              fontSize: 15,
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
        id: 'ZoomControl1',
        type: 'ZoomControl',
        metadata: {
          name: '缩放器',
        },
        properties: {
          position: 'bottomleft',
          showZoom: true,
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
          name: '信息框',
        },
        properties: {
          isOpen: true,
          trigger: 'hover',
          items: [
            {
              layerId: 'BubbleLayer_09d0f372-3b28-451e-902a-ae3f62181c68',
              fields: [
                {
                  field: '楼盘名',
                },
                {
                  field: '地址',
                },
                {
                  field: '均价(元/平米)',
                },
                {
                  field: '参考总价(万元)',
                },
                {
                  field: '开盘日期',
                },
                {
                  field: '房屋类别',
                },
                {
                  field: '开发商',
                },
                {
                  field: '城市名称',
                },
                {
                  field: '房屋照片',
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
          position: 'bottomleft',
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
        id: 'MiniChart_e1ff393a-13b7-47ce-b0b2-0eb8d1a6607a',
        type: 'MiniChart',
        metadata: {
          name: '城市楼盘均价走势（元/平米）',
        },
        properties: {
          chartType: 'column',
          adaptive: false,
          aggregationMethod: 'avel',
          sortBy: 'default',
          orderBy: 'ASC',
          datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
          xField: '城市名称',
          yField: '均价(元/平米)',
          chartWidth: 760,
          chartHeight: 274,
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'TimeLine_a9460760-6dc9-4eaf-8d4f-892a797159c9',
        type: 'TimeLine',
        metadata: {
          name: '时间轴',
        },
        properties: {
          datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
          dateField: '开盘日期',
          dateGranularity: 'YYYY-MM',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'MiniChart_6dbe309e-8d80-4023-a6a6-818f69784b7a',
        type: 'MiniChart',
        metadata: {
          name: '城市新增楼盘数量变化',
        },
        properties: {
          chartType: 'line',
          adaptive: false,
          aggregationMethod: 'count',
          sortBy: 'default',
          orderBy: 'ASC',
          datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
          xField: '城市名称',
          yField: '均价(元/平米)',
          chartWidth: 760,
          chartHeight: 274,
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'MiniChart_636edf3a-42d2-4650-8e00-4ddb6f9a829a',
        type: 'MiniChart',
        metadata: {
          name: '楼盘房屋类型变化',
        },
        properties: {
          chartType: 'column',
          adaptive: false,
          aggregationMethod: 'count',
          sortBy: 'x',
          orderBy: 'ASC',
          datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
          xField: '房屋类别',
          yField: '均价(元/平米)',
          chartWidth: 660,
          chartHeight: 274,
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'PropertiesPanel_a4722b3c-fc5a-470f-bf01-f0527f452b8f',
        type: 'PropertiesPanel',
        metadata: {
          name: '属性面板',
        },
        properties: {
          isOpen: true,
          items: [
            {
              layerId: 'BubbleLayer_09d0f372-3b28-451e-902a-ae3f62181c68',
              datasetId: '22f4b25e8e8-06f6-4c8b-9c56-7b3194101d62',
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
