import type { HeatmapLayerStyleAttributeValue } from './types';

/** 组件名称, 前缀 */
export const CLS_PREFIX = 'li-p2-heatmap-layer-style-attribute';

/** 默认值样式属性 */
export const DefaultHeatmapLayerStyle: HeatmapLayerStyleAttributeValue = {
  size: undefined,
  style: {
    intensity: 1,
    radius: 20,
    opacity: 0.8,
    rampColors: {
      colors: ['#800026', '#bd0026', '#e31a1c', '#fc4e2a', '#fd8d3c', '#feb24c', '#fed976', '#ffeda0', '#ffffcc'],
      positions: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
      // @ts-ignore
      isReversed: true,
    },
  },
  minZoom: 0,
  maxZoom: 24,
  blend: 'normal',
};
