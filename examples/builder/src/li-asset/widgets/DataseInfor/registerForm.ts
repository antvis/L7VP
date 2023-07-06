import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
import { getDatasetSelectFormSchema } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 选择的数据集 ID */
  datasetId: string;
};

export default (
  props: WidgetRegisterFormProps,
): WidgetRegisterForm<Properties> => {
  // 组件资产的配置表单面板 Schema，表单库 formily 的 Schema
  const schema = {
    ...getDatasetSelectFormSchema(props, 'datasetId', '关联的数据源'),
  };

  return { schema };
};
