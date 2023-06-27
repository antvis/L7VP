import type { LineLayerOptions } from '@antv/l7-composite-layers';
import type { ColorRange, FieldSelectOptionType } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 线图层样式属性值
 */
export type LineLayerStyleAttributeValue = Omit<LineLayerOptions, 'source'>;

/**
 * 组件类型定义
 */
export interface LineLayerStyleAttributeProps extends CommonProps {
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
  initialValues: LineLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: LineLayerStyleAttributeValue) => void;
}
