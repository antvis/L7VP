import type { HeatmapLayerOptions } from '@antv/l7-composite-layers';
import type { ColorRange } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 网格图层样式属性值
 */
export type GridLayerStyleAttributeValue = Omit<HeatmapLayerOptions, 'source'> & {
  aggregateSize?: number;
};

/**
 * 组件类型定义
 */
export interface GridLayerStyleAttributeProps extends CommonProps {
  /**
   * 色带配置
   */
  colorRanges?: ColorRange[];
  /**
   * 初始值
   */
  initialValues: GridLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: GridLayerStyleAttributeValue) => void;
}
