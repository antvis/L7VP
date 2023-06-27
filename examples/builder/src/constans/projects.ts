import type { Project } from '@/types';
import type { Application } from '@antv/li-sdk';
import { cloneDeep } from 'lodash-es';

const DEFAULT_ANALYSIS_APP: Application = {
  version: 'v0.1',
  metadata: {
    name: 'Earthquake 可视分析案例',
    description: 'Earthquake 等级与震深分布情况',
    creatTime: '2022-09-19 16:29:09',
  },
  datasets: [
    {
      id: 'datasetId_1',
      metadata: {
        name: 'Earthquake 数据',
      },
      data: [
        {
          lng: 105.005,
          lat: 32.349,
          lnglat: '105.005, 32.349',
          depth: 10,
          mag: 5.2,
          time: 1212640865530,
          title: 'M 5.2 - Sichuan-Gansu border region, China',
        },
        {
          lng: 104.602,
          lat: 32.067,
          lnglat: '104.602, 32.067',
          depth: 10,
          mag: 5,
          time: 1212462569360,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 105.272,
          lat: 32.451,
          lnglat: '105.272, 32.451',
          depth: 10,
          mag: 5.2,
          time: 1211177214760,
          title: 'M 5.2 - Sichuan-Gansu border region, China',
        },
        {
          lng: 105.042,
          lat: 32.402,
          lnglat: '105.042, 32.402',
          depth: 10,
          mag: 5,
          time: 1211170138690,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 104.982,
          lat: 32.24,
          lnglat: '104.982, 32.24',
          depth: 9,
          mag: 5.8,
          time: 1211044105480,
          title: 'M 5.8 - Sichuan-Gansu border region, China',
        },
        {
          lng: 103.665,
          lat: 31.29,
          lnglat: '103.665, 31.29',
          depth: 10,
          mag: 5,
          time: 1210969012190,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.351,
          lat: 31.355,
          lnglat: '103.351, 31.355',
          depth: 3,
          mag: 5.6,
          time: 1210915547320,
          title: 'M 5.6 - eastern Sichuan, China',
        },
        {
          lng: 104.214,
          lat: 31.66,
          lnglat: '104.214, 31.66',
          depth: 10,
          mag: 5.1,
          time: 1210798867000,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 104.014,
          lat: 31.356,
          lnglat: '104.014, 31.356',
          depth: 10,
          mag: 5.1,
          time: 1210757203950,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 104.032,
          lat: 31.996,
          lnglat: '104.032, 31.996',
          depth: 10,
          mag: 5.1,
          time: 1210744497980,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 103.518,
          lat: 31.325,
          lnglat: '103.518, 31.325',
          depth: 18.8,
          mag: 5.4,
          time: 1210733679980,
          title: 'M 5.4 - eastern Sichuan, China',
        },
        {
          lng: 105.275,
          lat: 32.416,
          lnglat: '105.275, 32.416',
          depth: 10,
          mag: 5,
          time: 1210663156260,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 103.194,
          lat: 30.89,
          lnglat: '103.194, 30.89',
          depth: 9,
          mag: 5.8,
          time: 1210662428500,
          title: 'M 5.8 - eastern Sichuan, China',
        },
        {
          lng: 103.682,
          lat: 31.205,
          lnglat: '103.682, 31.205',
          depth: 10,
          mag: 5,
          time: 1210647638330,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.53,
          lat: 31.298,
          lnglat: '103.53, 31.298',
          depth: 10,
          mag: 5.1,
          time: 1210636486860,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 103.527,
          lat: 31.282,
          lnglat: '103.527, 31.282',
          depth: 10,
          mag: 5.2,
          time: 1210635978970,
          title: 'M 5.2 - eastern Sichuan, China',
        },
        {
          lng: 104.454,
          lat: 31.746,
          lnglat: '104.454, 31.746',
          depth: 32.7,
          mag: 5.3,
          time: 1210625134820,
          title: 'M 5.3 - eastern Sichuan, China',
        },
        {
          lng: 103.889,
          lat: 31.413,
          lnglat: '103.889, 31.413',
          depth: 21.7,
          mag: 5.6,
          time: 1210622930430,
          title: 'M 5.6 - eastern Sichuan, China',
        },
        {
          lng: 103.524,
          lat: 31.178,
          lnglat: '103.524, 31.178',
          depth: 34.8,
          mag: 5,
          time: 1210614875910,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.514,
          lat: 31.058,
          lnglat: '103.514, 31.058',
          depth: 10,
          mag: 5,
          time: 1210606133440,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 104.575,
          lat: 31.952,
          lnglat: '104.575, 31.952',
          depth: 10,
          mag: 5.1,
          time: 1210604939660,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 103.692,
          lat: 31.243,
          lnglat: '103.692, 31.243',
          depth: 17.4,
          mag: 5,
          time: 1210604731260,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 104.65,
          lat: 32.12,
          lnglat: '104.65, 32.12',
          depth: 18.3,
          mag: 5,
          time: 1210601727380,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 103.511,
          lat: 31.028,
          lnglat: '103.511, 31.028',
          depth: 10,
          mag: 5,
          time: 1210599654130,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.618,
          lat: 31.214,
          lnglat: '103.618, 31.214',
          depth: 10,
          mag: 6.1,
          time: 1210590662480,
          title: 'M 6.1 - eastern Sichuan, China',
        },
        {
          lng: 103.365,
          lat: 30.966,
          lnglat: '103.365, 30.966',
          depth: 10,
          mag: 5,
          time: 1210587820080,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 104.092,
          lat: 31.527,
          lnglat: '104.092, 31.527',
          depth: 10,
          mag: 5.5,
          time: 1210585344860,
          title: 'M 5.5 - eastern Sichuan, China',
        },
        {
          lng: 103.682,
          lat: 31.206,
          lnglat: '103.682, 31.206',
          depth: 10,
          mag: 5,
          time: 1210583220430,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 104.052,
          lat: 31.503,
          lnglat: '104.052, 31.503',
          depth: 10,
          mag: 5,
          time: 1210580499930,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.53,
          lat: 31.1,
          lnglat: '103.53, 31.1',
          depth: 10,
          mag: 5,
          time: 1210579858350,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 103.625,
          lat: 31.243,
          lnglat: '103.625, 31.243',
          depth: 10,
          mag: 5.1,
          time: 1210577682540,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 105.134,
          lat: 32.165,
          lnglat: '105.134, 32.165',
          depth: 10,
          mag: 5,
          time: 1210575905390,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 104.217,
          lat: 31.636,
          lnglat: '104.217, 31.636',
          depth: 10,
          mag: 5.3,
          time: 1210575694040,
          title: 'M 5.3 - eastern Sichuan, China',
        },
        {
          lng: 104.908,
          lat: 32.195,
          lnglat: '104.908, 32.195',
          depth: 10,
          mag: 5,
          time: 1210575642660,
          title: 'M 5.0 - Sichuan-Gansu border region, China',
        },
        {
          lng: 103.646,
          lat: 31.216,
          lnglat: '103.646, 31.216',
          depth: 10,
          mag: 5,
          time: 1210575628970,
          title: 'M 5.0 - eastern Sichuan, China',
        },
        {
          lng: 104.638,
          lat: 31.857,
          lnglat: '104.638, 31.857',
          depth: 10,
          mag: 5.1,
          time: 1210575454870,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 103.747,
          lat: 31.146,
          lnglat: '103.747, 31.146',
          depth: 10,
          mag: 5.3,
          time: 1210575258100,
          title: 'M 5.3 - eastern Sichuan, China',
        },
        {
          lng: 105.202,
          lat: 32.372,
          lnglat: '105.202, 32.372',
          depth: 10,
          mag: 5.1,
          time: 1210575210090,
          title: 'M 5.1 - Sichuan-Gansu border region, China',
        },
        {
          lng: 104.481,
          lat: 31.906,
          lnglat: '104.481, 31.906',
          depth: 10,
          mag: 5.1,
          time: 1210575036930,
          title: 'M 5.1 - eastern Sichuan, China',
        },
        {
          lng: 105.234,
          lat: 32.436,
          lnglat: '105.234, 32.436',
          depth: 10,
          mag: 5.3,
          time: 1210574939120,
          title: 'M 5.3 - Sichuan-Gansu border region, China',
        },
        {
          lng: 104.705,
          lat: 31.272,
          lnglat: '104.705, 31.272',
          depth: 10,
          mag: 5.4,
          time: 1210574637160,
          title: 'M 5.4 - eastern Sichuan, China',
        },
        {
          lng: 103.715,
          lat: 31.211,
          lnglat: '103.715, 31.211',
          depth: 10,
          mag: 5.8,
          time: 1210574594360,
          title: 'M 5.8 - eastern Sichuan, China',
        },
        {
          lng: 104.682,
          lat: 31.342,
          lnglat: '104.682, 31.342',
          depth: 10,
          mag: 5.7,
          time: 1210574528950,
          title: 'M 5.7 - eastern Sichuan, China',
        },
        {
          lng: 104.032,
          lat: 31.586,
          lnglat: '104.032, 31.586',
          depth: 10,
          mag: 5.7,
          time: 1210574516000,
          title: 'M 5.7 - eastern Sichuan, China',
        },
        {
          lng: 104.787,
          lat: 31.968,
          lnglat: '104.787, 31.968',
          depth: 10,
          mag: 5.2,
          time: 1210574486530,
          title: 'M 5.2 - eastern Sichuan, China',
        },
        {
          lng: 103.322,
          lat: 31.002,
          lnglat: '103.322, 31.002',
          depth: 19,
          mag: 7.9,
          time: 1210573681570,
          title: 'M 7.9 - eastern Sichuan, China',
        },
      ],
      type: 'local',
      columns: [],
    },
  ],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        zoom: 8,
        center: [104.215504, 31.663526],
        pitch: 0,
        bearing: 0,
        style: 'light',
        WebGLParams: {
          preserveDrawingBuffer: true,
        },
      },
    },
    layers: [
      {
        id: 'my-bubble-layer',
        type: 'BubbleLayer',
        metadata: {
          name: 'Earthquake 分布图层',
        },
        sourceConfig: {
          datasetId: 'datasetId_1',
          parser: { type: 'json', x: 'lng', y: 'lat' },
        },
        visConfig: {
          visible: true,
          blend: 'normal',
          autoFit: false,
          maxZoom: 24,
          minZoom: 0,
          radius: {
            field: 'depth',
            value: [13, 36],
          },
          fillColor: {
            field: 'title',
            value: ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854'],
            scale: {
              type: 'cat',
              unknown: '#c0c0c0',
            },
          },
          opacity: 0.8,
          strokeColor: 'rgb(146, 112, 202)',
          lineWidth: 0,
          lineOpacity: 1,
          state: {
            active: { fillColor: false, strokeColor: '#FFF684' },
            select: { fillColor: false, strokeColor: 'red' },
          },
          label: {
            field: '',
            visible: false,
            style: {
              fill: '#454d64',
              fontSize: 14,
              stroke: '#fff',
              strokeWidth: 0,
              textAnchor: 'center',
              textOffset: [0, 0],
            },
          },
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
          position: 'topleft',
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
              layerId: 'my-bubble-layer',
              datasetId: 'datasetId_1',
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
          trigger: 'hover',
          items: [
            {
              layerId: 'my-bubble-layer',
              fields: [
                { field: 'lng', formatField: 'lng' },
                { field: 'lat', formatField: 'lat' },
                { field: 'depth', formatField: 'depth' },
                { field: 'mag', formatField: 'mag' },
                { field: 'time', formatField: 'time' },
                { field: 'title', formatField: 'title' },
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
        id: 'RightClickMenu',
        type: 'RightClickMenu',
        metadata: {
          name: '右键菜单',
        },
        properties: {
          showRightMenu: true,
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
        id: 'ExportImageControl_ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
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
        id: 'MiniChart_0b419c39-0c9a-4cd4-b8c9-333dc4097e37',
        type: 'MiniChart',
        metadata: {
          name: 'Earthquake 深度折线图',
        },
        properties: {
          datasetId: 'datasetId_1',
          chartType: 'line',
          xField: 'time',
          yField: 'depth',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
      {
        id: 'MiniChart_dddef795-2b48-408e-b612-5e29816c58a0',
        type: 'MiniChart',
        metadata: {
          name: 'Earthquake 深度柱状图',
        },
        properties: {
          datasetId: 'datasetId_1',
          chartType: 'column',
          xField: 'time',
          yField: 'mag',
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'bottomPanel',
        },
      },
    ],
  },
};

const EMPTY__ANALYSIS_APP: Application = {
  version: 'v0.1',
  metadata: {
    name: 'Empty 可视分析项目',
  },
  datasets: [],
  spec: {
    map: {
      basemap: 'Gaode' as const,
      config: {
        zoom: 3,
        center: [120.153576, 30.287459] as [number, number],
        pitch: 0,
        bearing: 0,
        style: 'dark',
        WebGLParams: {
          preserveDrawingBuffer: true,
        },
      },
    },
    layers: [],
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
          position: 'topleft',
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
          isOpen: true,
          trigger: 'hover',
          items: [],
        },
        container: {
          id: 'AnalysisLayout',
          slot: 'controls',
        },
      },
      {
        id: 'RightClickMenu',
        type: 'RightClickMenu',
        metadata: {
          name: '右键菜单',
        },
        properties: {
          showRightMenu: true,
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
        id: 'ExportImageControl_ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
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
    ],
  },
};

export const DEFAULT_PROJECTS: Project[] = [
  {
    projectName: 'Earthquake 可视分析案例',
    description: 'Earthquake 等级与震深分布情况',
    projectId: '0001',
    creatTime: '2022-09-19 16:29:09',
    applicationConfig: cloneDeep(DEFAULT_ANALYSIS_APP),
  },
  {
    projectName: 'Empty 可视分析项目',
    description: '空项目的可视分析模版',
    projectId: '0002',
    creatTime: '2022-09-19 16:30:09',
    applicationConfig: cloneDeep(EMPTY__ANALYSIS_APP),
  },
];
