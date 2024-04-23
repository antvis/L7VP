import type { WidgetSchema } from '@antv/li-sdk';
import type { Project as ProjectType } from '@/services';

export const DEFAULT_MAP_WIDGETS: WidgetSchema[] = [
  {
    id: 'BaseLayout',
    type: 'BaseLayout',
    metadata: {
      name: '布局组件',
    },
    properties: {
      showSidePanel: false,
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
      id: 'BaseLayout',
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
      items: [],
    },
    container: {
      id: 'BaseLayout',
      slot: 'controls',
    },
  },
  {
    id: 'FullscreenControl',
    type: 'FullscreenControl',
    metadata: {
      name: '全屏切换',
    },
    properties: {
      position: 'topright',
    },
    container: {
      id: 'BaseLayout',
      slot: 'controls',
    },
  },
  {
    id: 'MapThemeControl',
    type: 'MapThemeControl',
    metadata: {
      name: '底图主题切换',
    },
    properties: {
      position: 'bottomright',
    },
    container: {
      id: 'BaseLayout',
      slot: 'controls',
    },
  },
  {
    id: 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
    type: 'ExportImageControl',
    metadata: {
      name: '地图截图',
    },
    properties: {
      position: 'topright',
    },
    container: {
      id: 'BaseLayout',
      slot: 'controls',
    },
  },
];

export const DEFAULT_ANALYSIS_WIDGETS: WidgetSchema[] = [
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
      name: '地名查询',
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
      name: '信息框',
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
    id: 'FullscreenControl',
    type: 'FullscreenControl',
    metadata: {
      name: '全屏切换',
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
      name: '图例',
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
      name: '底图主题切换',
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
    id: 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
    type: 'ExportImageControl',
    metadata: {
      name: '地图截图',
    },
    properties: {
      position: 'topright',
    },
    container: {
      id: 'AnalysisLayout',
      slot: 'controls',
    },
  },
];

export const DEFAULT_PROJECTS: ProjectType[] = [];
