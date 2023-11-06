import type { Application } from '@antv/li-sdk';

const config: Application = {
  version: 'v0.1',
  metadata: {
    name: '测试应用',
  },
  datasets: [
    {
      metadata: { name: '夜光栅格', description: 'SingleBand Raster' },
      id: 'singleBandRaster',
      type: 'raster-tile',
      properties: {
        type: 'xyz-tile',
        url: 'https://gw.alipayobjects.com/zos/antvdemo/assets/light_clip/lightF182013.tiff',
        extent: [73.4821902409999979, 3.8150178409999995, 135.1066187319999869, 57.6300459959999998],
      },
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        center: [120.153576, 30.287459] as [number, number],
        zoom: 2.5,
        pitch: 0,
        bearing: 0,
        style: 'dark',
      },
    },
    layers: [
      {
        id: 'SingleBandRasterLayer',
        type: 'SingleBandRasterLayer',
        metadata: { name: '单波段栅格' },
        sourceConfig: {
          datasetId: 'singleBandRaster',
          parser: {
            type: 'raster',
          },
        },
        visConfig: {
          visible: true,
          style: {
            clampLow: false,
            clampHigh: false,
            domain: [0, 90],
            nodataValue: 0,
            rampColors: {
              positions: [0, 0.05, 0.1, 0.25, 0.5, 1.0],
              colors: ['#5C3A1000', '#5C3A1000', '#fabd08', '#f1e93f', '#f1ff8f', '#fcfff7'],
            },
            opacity: 1,
          },
        },
      },
    ],
    widgets: [
      {
        id: 'AnalysisLayout',
        type: 'AnalysisLayout',
        metadata: { name: '分析布局' },
        properties: {
          showSidePanel: false,
          showBottomPanel: false,
          showFloatPanel: false,
          collapsedFloatPanel: false,
        },
      },
      {
        id: 'zoomControl',
        type: 'ZoomControl',
        metadata: { name: '缩放器' },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'LegendWidget',
        type: 'LegendWidget',
        metadata: { name: '图例' },
        properties: {
          position: 'bottomright',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
    ],
  },
};

export default config;
