import type { HeatmapLayerOptions } from '@antv/l7-composite-layers';
import type { ColorRange, FieldSelectOptionType } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 区域图层样式属性值
 */
export type HeatmapLayerStyleAttributeValue = Omit<HeatmapLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface HeatmapLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldSelectOptionType[];
  /**
   * 色带配置
   */
  colorRanges?: ColorRange[];
  /**
   * 初始值
   */
  initialValues: HeatmapLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: HeatmapLayerStyleAttributeValue) => void;
}
