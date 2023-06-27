import type { GridLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-grid-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultGridLayerStyle: GridLayerStyleAttributeValue = {
  aggregateSize: 10000,
  color: 'rgb(90, 216, 166)',
  style: {
    coverage: 0.9,
    opacity: 1,
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
  state: { active: { color: 'yellow' } },
};
