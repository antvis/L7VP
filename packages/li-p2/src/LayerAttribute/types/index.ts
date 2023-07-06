import type { ColorRange, FieldSelectOptionType } from '../../components/Formily';
export type { FieldSelectOptionType, ColorRange };

/**
 * 配置项
 */
export type AttributeSchemaOptions = {
  /**
   * 数据字段
   */
  fieldList?: FieldSelectOptionType[];
  /**
   * 色带配置
   */
  colorRanges?: ColorRange[];
  /**
   * 折叠面板名称
   */
  collapseTitle?: string;
};
