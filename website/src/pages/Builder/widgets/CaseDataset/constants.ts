import type { LayerSchema } from '@antv/li-sdk';
import type { DemoDataSource } from './types';

export const DEMO_CASE: {
  imgUrl: string;
  dataSources: DemoDataSource[];
  demoName: string;
  layerList: LayerSchema[];
}[] = [
  {
    imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/3Cb1AYfvlq/44e305b2-498e-4ff3-924b-bba7c8fdafda.png',
    dataSources: [
      {
        url:
          'https://mdn.alipayobjects.com/afts/file/A*aMdOS56bGT8AAAAAAAAAAAAADrd2AQ/Most-photographed-attractions-in-the-world.json',
        id: 'most-photographed-scenic',
        name: '全球拍照最多的景点',
        type: 'json',
      },
    ],
    demoName: '全球拍照最多的景点',
    layerList: [
      {
        id: 'most-photographed-scenic',
        type: 'BubbleLayer',
        metadata: {
          name: '全球拍照最多的景点',
        },
        sourceConfig: {
          datasetId: 'most-photographed-scenic',
          parser: { type: 'json', x: 'lng', y: 'lat' },
        },
        visConfig: {
          visible: true,
          radius: 3,
          fillColor: {
            field: 'value',
            value: [
              'rgb(102,37,6)',
              'rgb(153,52,4)',
              'rgb(204,76,2)',
              'rgb(236,112,20)',
              'rgb(254,153,41)',
              'rgb(254,196,79)',
              'rgb(254,227,145)',
            ],
            scale: { type: 'quantize' },
          },
          opacity: 1,
          lineWidth: 0,
          state: false,
          blend: 'additive',
          label: {
            field: undefined,
            visible: true,
            style: { fill: '#a9abb1', fontSize: 14, textAnchor: 'center' as const },
          },
        },
      },
    ],
  },
  {
    imgUrl: 'https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*8lyORIRMDNYAAAAAAAAAAAAAARQnAQ',
    dataSources: [
      {
        url: 'https://gw.alipayobjects.com/os/bmw-prod/5c4fdc5c-5cf7-46da-a361-f377938553dc.json',
        id: 'heat-demo-1',
        name: '全球地震热力分布',
        type: 'json',
      },
    ],
    demoName: '全球地震热力分布',
    layerList: [
      {
        id: 'heat-demo-1',
        type: 'HeatmapLayer',
        metadata: {
          name: '全球地震热力图层',
        },
        sourceConfig: {
          datasetId: 'heat-demo-1',
          parser: { type: 'json', x: 'lon', y: 'lat' },
        },
        visConfig: {
          visible: true,
          size: {
            field: 'mag',
            value: [0, 1],
          },
          style: {
            intensity: 4,
            radius: 4,
            opacity: 1,
            rampColors: {
              colors: ['#FF4818', '#F7B74A', '#FFF598', '#F27DEB', '#8C1EB2', '#421EB2'],
              positions: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
            },
          },
        },
      },
    ],
  },
  {
    imgUrl: 'https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*SLbgR72KKFsAAAAAAAAAAAAAARQnAQ',
    dataSources: [
      {
        url: 'https://gw.alipayobjects.com/os/bmw-prod/0a544b66-a04b-4b98-9b69-d71258f5f577.json',
        id: 'arc-line-data',
        name: '国内外航班线数据',
        type: 'json',
      },
    ],
    demoName: '国内外航班线',
    layerList: [
      {
        id: 'arc-point-layer-examsple',
        type: 'BubbleLayer',
        metadata: {
          name: '国内外机场图层',
        },
        sourceConfig: {
          datasetId: 'arc-line-data',
          parser: { type: 'json', x: 'to_lon', y: 'to_lat' },
        },
        visConfig: {
          visible: true,
          zIndex: 1,
          radius: 5,
          fillColor: '#1890ff',
          opacity: 1,
          strokeColor: '#fff',
          lineWidth: 1,
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
      {
        id: 'arc-line-example',
        type: 'ArcLayer',
        metadata: {
          name: '国内外航班弧线图层',
        },
        sourceConfig: {
          datasetId: 'arc-line-data',
          parser: { type: 'json', x: 'from_lon', y: 'from_lat', x1: 'to_lon', y1: 'to_lat' },
        },
        visConfig: {
          zIndex: 2,
          visible: true,
          size: 1,
          style: {
            opacity: 1,
            sourceColor: '#1890ff',
            targetColor: '#1890ff',
          },
          state: { active: { color: 'yellow' } },
        },
      },
    ],
  },
  // {
  //   imgUrl: 'https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*pZBySbhAUp4AAAAAAAAAAAAAARQnAQ',
  //   dataSources: [
  //     {
  //       url: 'https://gw.alipayobjects.com/os/bmw-prod/1ee29c43-eefe-4bbe-8ed6-87f64312c461.json',
  //       id: 'line-demo-2',
  //       name: '3D线图层',
  //       type: 'json',
  //     },
  //   ],
  //   demoName: '3D线图层示例',
  //   layerList: [
  //     {
  //       id: 'arc3d-line-example',
  //       type: 'ArcLayer',
  //       metadata: {
  //         name: '弧线图层',
  //       },
  //       sourceConfig: {
  //         datasetId: 'line-demo-2',
  //         parser: { type: 'json', x: 'from_lon', y: 'from_lat', x1: 'to_lon', y1: 'to_lat' },
  //       },
  //       visConfig: {
  //         visible: true,
  //         size: 1,
  //         color: '#1890ff',
  //         style: {
  //           opacity: 1,
  //         },
  //       },
  //     },
  //   ],
  // },
  {
    demoName: '加州 2.5 级以上地震数据',
    imgUrl: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*p7W-SKyg8ekAAAAAAAAAAAAADmJ7AQ/original',
    dataSources: [
      {
        name: '加州 2.5 级以上地震数据',
        id: 'california-earthquakes',
        url: 'https://mdn.alipayobjects.com/afts/file/A*8ARuTJPfyvcAAAAAAAAAAAAADrd2AQ/earthquake',
        type: 'json',
      },
    ],
    layerList: [
      {
        id: 'california-earthquakes',
        type: 'BubbleLayer',
        metadata: {
          name: '加州 2.5 级以上地震数据',
        },
        sourceConfig: {
          datasetId: 'california-earthquakes',
          parser: { type: 'json', x: 'Longitude', y: 'Latitude' },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'Magnitude',
            value: ['#ffffcc', '#c7e9b4', '#7fcdbb', '#41b6c4', '#2c7fb8', '#253494'],
            scale: { type: 'quantile' },
          },
          opacity: 1,
          strokeColor: '#fff',
          lineWidth: 1,
          lineOpacity: 1,
          label: {
            field: undefined,
            visible: true,
            style: { fill: '#a9abb1', fontSize: 14, textAnchor: 'center' as const },
          },
          radius: {
            field: 'Depth',
            value: [4, 20],
          },
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
    ],
  },
  {
    demoName: '中国省级行政区域',
    imgUrl: 'https://gw.alipayobjects.com/mdn/rms_e7e1c6/afts/img/A*0W_dSre5Tq4AAAAAAAAAAAAAARQnAQ',
    dataSources: [
      {
        name: '中国省级行政区域',
        id: 'china-provice',
        url:
          'https://npm.elemecdn.com/static-geo-atlas@0.1.0/geo-data/choropleth-data/country/100000_country_province.json',
        type: 'geojson',
      },
    ],
    layerList: [
      {
        id: 'choroplethLayer',
        type: 'ChoroplethLayer',
        metadata: {
          name: '中国省级行政区域图层',
        },
        sourceConfig: {
          datasetId: 'china-provice',
          parser: { type: 'json', geometry: '_geometry' },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'childrenNum',
            value: ['#0f9960', '#33a02c', '#377eb8'],
            scale: { type: 'quantize' },
          },
          opacity: 1,
          strokeColor: '#a9abb1',
          lineWidth: 1,
          lineOpacity: 1,
          label: {
            field: 'name',
            visible: true,
            style: { fill: '#a9abb1', fontSize: 14, textAnchor: 'center' as const, stroke: '#fff', strokeWidth: 1 },
          },
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
    ],
  },
  {
    demoName: '中国城市行政区域',
    imgUrl: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*9t6mRpeK0DEAAAAAAAAAAAAADmJ7AQ/original',
    dataSources: [
      {
        name: '中国城市行政区域',
        id: 'china-city',
        url: 'https://mdn.alipayobjects.com/afts/file/A*6VJLQ5arJMgAAAAAAAAAAAAADrd2AQ/100000_country_city.json',
        type: 'geojson',
      },
    ],
    layerList: [
      {
        id: 'choroplethCityLayer',
        type: 'ChoroplethLayer',
        metadata: {
          name: '中国城市行政区域图层',
        },
        sourceConfig: {
          datasetId: 'china-city',
          parser: { type: 'json', geometry: '_geometry' },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'childrenNum',
            value: ['#f7fbff', '#ddebf7', '#c6dcef', '#6caed7', '#4292c6', '#2071b5', '#08519c', '#09306b'],
            scale: { type: 'quantize', unknown: '#c0c0c0' },
            isReversed: false,
          },
          opacity: 0.9,
          strokeColor: '#1990ff',
          lineWidth: 0.3,
          lineOpacity: 0.7,
          label: {
            field: undefined,
            visible: true,
            style: {
              fill: '#252525',
              fontSize: 12,
              textAnchor: 'center' as const,
              stroke: '#fff',
              strokeWidth: 1,
            },
          },
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
    ],
  },
  {
    demoName: '2017 年美国各县的失业率',
    imgUrl: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*w1DdRJcE1jQAAAAAAAAAAAAADmJ7AQ/original',
    dataSources: [
      {
        name: '2017 年美国各县的失业率',
        id: 'unemployment-rates-for-US-counties',
        url: 'https://mdn.alipayobjects.com/afts/file/A*UF2kT5xWRr4AAAAAAAAAAAAADrd2AQ/unemployment',
        type: 'json',
      },
    ],
    layerList: [
      {
        id: 'unemployment-rates-for-US-counties',
        type: 'ChoroplethLayer',
        metadata: {
          name: '2017 年美国各县的失业率',
        },
        sourceConfig: {
          datasetId: 'unemployment-rates-for-US-counties',
          parser: { type: 'json', geometry: '_geometry' },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'unemployment_rate',
            value: [
              'rgb(255, 247, 243)',
              'rgb(253, 224, 221)',
              'rgb(252, 197, 192)',
              'rgb(250, 159, 181)',
              'rgb(247, 104, 161)',
              'rgb(221, 52, 151)',
              'rgb(174, 1, 126)',
              'rgb(122, 1, 119)',
              'rgb(73, 0, 106)',
            ],
            scale: { type: 'quantile' },
          },
          opacity: 0.8,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 1,
          lineOpacity: 1,
          label: {
            field: undefined,
            visible: true,
            style: { fill: '#a9abb1', fontSize: 14, textAnchor: 'center' as const },
          },
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
    ],
  },
  {
    demoName: '新能源充电桩分布',
    imgUrl: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*gH-fRrU4G7oAAAAAAAAAAAAADmJ7AQ/original.png',
    dataSources: [
      {
        name: '新能源充电桩分布',
        id: 'new-energy-charging-pile-distribution',
        url: 'https://mdn.alipayobjects.com/afts/file/A*uaGISLpSx7AAAAAAAAAAAAAADrd2AQ/charging ',
        type: 'json',
      },
    ],
    layerList: [
      {
        id: 'HexbinLayer_new-energy-charging-pile-distribution',
        type: 'HexbinLayer',
        metadata: {
          name: '新能源充电桩分布',
        },
        sourceConfig: {
          datasetId: 'new-energy-charging-pile-distribution',
          parser: { type: 'json', geometry: '_geometry' },
          transforms: [{ type: 'hexagon', size: 1000, field: 'count', method: 'sum' }],
        },
        visConfig: {
          visible: true,
          aggregateSize: 1000,
          color: {
            field: 'count',
            isReversed: false,
            scale: { type: 'quantize' },
            value: ['#c2ad1f', '#bf6261', '#bb3432', '#5c257d', '#162044'],
          },
          style: {
            coverage: 1,
            opacity: 0.6,
          },
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
      {
        id: 'BubbleLayer_new-energy-charging-pile-distribution',
        type: 'BubbleLayer',
        metadata: {
          name: '充电桩图层',
        },
        sourceConfig: {
          datasetId: 'new-energy-charging-pile-distribution',
          parser: { type: 'json', geometry: '_geometry' },
        },
        visConfig: {
          visible: true,
          lineOpacity: 1,
          lineWidth: 0,
          opacity: 0.8,
          radius: 4,
          fillColor: '#f8dc31',
          blend: 'normal',
          label: {
            field: undefined,
            visible: false,
            style: { fill: '#c0c0c0', fontSize: 14, textAnchor: 'center' as const },
          },
          state: {
            active: { fillColor: false, strokeColor: 'red' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
    ],
  },
  {
    imgUrl: 'https://mdn.alipayobjects.com/mdn/huamei_qa8qxu/afts/img/A*g8RGQ47Xbc8AAAAAAAAAAAAADmJ7AQ',
    dataSources: [
      {
        url: 'https://mdn.alipayobjects.com/afts/file/A*XCJJQK2L5O8AAAAAAAAAAAAADrd2AQ/city.json',
        id: 'bus-travel-volume-example',
        name: '城市公交出行量',
        type: 'json',
      },
    ],
    demoName: '城市公交出行量',
    layerList: [
      {
        id: 'bus-travel-volume-example',
        type: 'H3HexagonLayer',
        metadata: {
          name: '城市公交出行量图层',
        },
        sourceConfig: {
          datasetId: 'bus-travel-volume-example',
          parser: { type: 'json', hexagonId: 'oh' },
        },
        visConfig: {
          visible: true,
          fillColor: {
            field: 'od_cnt',
            value: [
              'rgb(127, 0, 0)',
              'rgb(179, 0, 0)',
              'rgb(215, 48, 31)',
              'rgb(239, 101, 72)',
              'rgb(252, 141, 89)',
              'rgb(253, 187, 132)',
              'rgb(253, 212, 158)',
              'rgb(254, 232, 200)',
              'rgb(255, 247, 236)',
            ],
            scale: { type: 'quantile' },
          },
          opacity: 0.8,
          lineWidth: 0,
          minZoom: 0,
          maxZoom: 24,
          blend: 'normal',
          state: {
            active: { fillColor: false, strokeColor: 'yellow' },
            select: { fillColor: false, strokeColor: 'red' },
          },
        },
      },
      {
        id: 'bus-travel-volume-arcLayer',
        type: 'ArcLayer',
        metadata: {
          name: '成都公交出行量关系',
        },
        sourceConfig: {
          parser: {
            type: 'json',
            x: 'f_lon',
            y: 'f_lat',
            x1: 't_lon',
            y1: 't_lat',
          },
          datasetId: 'bus-travel-volume-example',
        },
        visConfig: {
          size: 1.5,
          color: '#5ad8a6',
          style: {
            opacity: 0.8,
            lineType: 'solid',
            sourceColor: '#5ad8a6',
            targetColor: '#5B8FF9',
          },
          minZoom: 1,
          maxZoom: 23,
          blend: 'normal',
          animate: {
            enable: true,
            duration: 4,
            interval: 0.8,
            trailLength: 1,
          },
          state: {
            active: {
              color: 'yellow',
            },
          },
          visible: false,
        },
      },
    ],
  },
];
