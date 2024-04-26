import type { Application } from '@antv/li-sdk';

const APP_CONFIG: Application = {
  version: 'v0.1',
  metadata: {
    name: '海洋保护区分布',
    creatTime: '2022-12-16 16:04:51',
    description:
      '可视化中国海洋保护区地域分布，海洋保护区分类为：水产种质资源保护区、海洋自然保护区、海洋公园、特别海洋保护区的。',
  },
  datasets: [
    {
      id: 'online-map-of-Marine-protected-areas',
      type: 'remote',
      metadata: {
        name: '海洋保护区分布',
      },
      serviceType: 'GET_FETCH_DATA_LIST',
      properties: {
        url: 'https://mdn.alipayobjects.com/afts/file/A*MLyCRY9Z5DUAAAAAAAAAAAAADrd2AQ/marine-protected-areas.json',
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
        zoom: 5,
        center: [117.392917, 30.473057],
        pitch: 15,
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
        id: 'IconLayer_online-map-of-Marine-protected-areas',
        type: 'IconLayer',
        metadata: {
          name: '海洋保护区图层',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            x: 'Longitude',
            y: 'Latitude',
          },
          datasetId: 'online-map-of-Marine-protected-areas',
        },
        visConfig: {
          blend: 'normal',
          icon: {
            field: 'Type',
            value: [
              'other_aquatic-germplasm-reserve',
              'other_marine-nature-reserves',
              'other_marine-park',
              'other_special-marinep-protected-areas',
            ],
            scale: {
              type: 'cat',
              domain: [
                'Aquatic Germplasm Reserve',
                'Marine Nature Reserves',
                'Marine Park',
                'Special Marine Protected Areas',
              ],
              unknown: 'unknown_icon',
            },
          },
          iconAtlas: {
            'other_aquatic-germplasm-reserve':
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sSbCRKP1RsgAAAAAAAAAAAAADmJ7AQ/original',
            'other_marine-nature-reserves':
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dPoYQoBq4f0AAAAAAAAAAAAADmJ7AQ/original',
            'other_marine-park':
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*on7pR5VRjHsAAAAAAAAAAAAADmJ7AQ/original',
            'other_special-marinep-protected-areas':
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DulySrR5zuwAAAAAAAAAAAAADmJ7AQ/original',
            unknown_icon:
              'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EcQZS6JM69EAAAAAAAAAAAAADmJ7AQ/original',
          },
          iconStyle: {
            opacity: 0.9,
          },
          label: {
            field: undefined,
            style: { fill: '#c0c0c0', fontSize: 12, textAnchor: 'center', textOffset: [0, 0] },
            visible: false,
          },
          maxZoom: 24,
          minZoom: 0,
          radius: 12,
          state: {
            active: false,
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
              layerId: 'IconLayer_online-map-of-Marine-protected-areas',
              fields: [
                {
                  field: 'ChineseName',
                },
                {
                  field: 'Type',
                },
                {
                  field: 'Province',
                },
                {
                  field: 'Sea',
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
    ],
  },
};

export default APP_CONFIG;
