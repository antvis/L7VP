import type { HexbinLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-hexbin-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHexbinLayerStyle: HexbinLayerStyleAttributeValue = {
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
