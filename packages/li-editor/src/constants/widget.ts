import type { WidgetCategory, WidgetSchema, WidgetType } from '@antv/li-sdk';

export const Widget_Category_Map = new Map<WidgetCategory, string>([
  ['Layout', '布局组件'],
  ['Container', '容器组件'],
  ['LayerInteraction', '图层交互组件'],
  ['DataAnalysis', '数据分析组件'],
  ['MapControl', '地图控件组件'],
  ['MapInteraction', '地图交互组件'],
]);

export const WidgetTypeMap: Record<WidgetType, string> = {
  Layout: 'Layout',
  Container: 'Container',
  Atom: 'Atom',
  Auto: 'Auto',
};

export const AtomWidgets = ['Atom', 'Container'];

export const AtomWidgetEmptyContainer: WidgetSchema['container'] = { id: '', slot: '' };
