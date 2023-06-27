import type { HeatmapLayerOptions } from '@antv/l7-composite-layers';
import type { ColorRange } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 蜂窝图层样式属性值
 */
export type HexbinLayerStyleAttributeValue = Omit<HeatmapLayerOptions, 'source'> & {
  aggregateSize?: number;
};

/**
 * 组件类型定义
 */
export interface HexbinLayerStyleAttributeProps extends CommonProps {
  /**
   * 色带配置
   */
  colorRanges?: ColorRange[];
  /**
   * 初始值
   */
  initialValues: HexbinLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: HexbinLayerStyleAttributeValue) => void;
}
