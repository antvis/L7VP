import type { ChoroplethLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-choropleth-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultChoroplethLayerStyle: ChoroplethLayerStyleAttributeValue = {
  fillColor: 'rgb(239,243,255)',
  opacity: 0.8,
  strokeColor: 'blue',
  lineWidth: 1,
  lineOpacity: 1,
  label: { style: { fill: 'red', fontSize: 18, textAnchor: 'center', textOffset: [0, 0] } },
  blend: 'normal',
  minZoom: 0,
  maxZoom: 24,
};
