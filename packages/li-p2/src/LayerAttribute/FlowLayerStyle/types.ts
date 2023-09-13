import type { FlowLayerOptions, SizeStyleAttribute } from '@antv/l7-composite-layers';
import type { FieldSelectOptionType, ColorRange } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 客流图层样式属性值
 */
export type FlowLayerStyleAttributeValue = Omit<FlowLayerOptions, 'source'> & {
  linColorIsReversed?: boolean;
  pointColorIsReversed?: boolean;
};

/**
 * 组件类型定义
 */
export interface FlowLayerStyleAttributeProps extends CommonProps {
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
  initialValues: FlowLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: FlowLayerStyleAttributeValue) => void;
}

export type ISize = SizeStyleAttribute;
