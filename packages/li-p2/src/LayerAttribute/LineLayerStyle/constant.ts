import type { LineLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-line-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultLineLayerStyle: LineLayerStyleAttributeValue = {
  size: 1.5,
  color: '#5B8FF9',
  style: {
    opacity: 0.8,
    // lineType: 'solid' as const,
    // sourceColor: '#F7664E',
    // targetColor: '#5D7092',
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
  animate: {
    enable: false,
  },
};
