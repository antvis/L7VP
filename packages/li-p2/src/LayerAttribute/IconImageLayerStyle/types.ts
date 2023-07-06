import type { IconImageLayerOptions } from '@antv/l7-composite-layers';
import type { FieldSelectOptionType } from '../types';
import type { CommonProps } from '../types/common';

/**
 * 图标图层样式属性值
 */
export type IconImageLayerStyleAttributeValue = Omit<IconImageLayerOptions, 'source'>;

export type IconSelectOptionType = { id: string; image: string };
/**
 * 组件类型定义
 */
export interface IconImageLayerStyleAttributeProps extends CommonProps {
  /**
   * 数据字段
   */
  fieldList: FieldSelectOptionType[];
  /**
   * 图标配置
   */
  iconList?: IconSelectOptionType;
  /**
   * 初始值
   */
  initialValues: IconImageLayerStyleAttributeValue;
  /**
   * 属性表单发生改变时
   */
  onChange?: (values: IconImageLayerStyleAttributeValue) => void;
}
