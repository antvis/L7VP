import type { LayerSourceConfig } from '../specs';
import type { LayerMetadata } from '../specs/metadata';
import type { DatasetFieldWithMeta, WidgetRegisterForm } from './widget';

export interface ImplementLayerProps {
  id?: string;
  name?: string;
}

export type LayerRegisterFormProps = {
  /**
   * 图层数据集列字段
   */
  datasetFields: DatasetFieldWithMeta[];
};

/**
 * 属性面板生产的数据类型定义
 */
export type LayerRegisterFormResultType<VisProperties extends Record<string, unknown> = Record<string, unknown>> = {
  sourceConfig: Omit<LayerSourceConfig, 'datasetId'>;
  visConfig: VisProperties;
};

export type LayerRegisterForm<VisProperties extends Record<string, unknown> = Record<string, unknown>> = Omit<
  WidgetRegisterForm,
  'toValues' | 'fromValues'
> & {
  /**
   * 表单数据格式转换，将结构化数据(属性面板数据类型)转换为表单的平铺结构
   */
  toValues?: (config: LayerRegisterFormResultType<VisProperties>) => Record<string, any>;
  /**
   * 表单数据格式转换，将表单的平铺数据结构转为结构化数据(属性面板数据类型)
   */
  fromValues?: (values: Record<string, any>) => LayerRegisterFormResultType<VisProperties>;
};

export type ImplementLayerOptions<
  VisProperties extends Record<string, unknown> = Record<string, unknown>,
  CP extends VisProperties = VisProperties
> = {
  /**
   * 组件资产版本号
   */
  version: string;
  /**
   * 图层组件
   */
  component: React.FC<CP>;
  /**
   * 图层组件资产元属性信息
   */
  metadata: LayerMetadata;
  /**
   * 图层样式面板属性默认值，用于创建图层时默认值设置
   */
  defaultVisConfig?: VisProperties;
  /**
   * 图层组件资产属性面板配置
   */
  registerForm?:
    | LayerRegisterForm<VisProperties>
    | ((props: LayerRegisterFormProps) => LayerRegisterForm<VisProperties>);
};

export type ImplementLayer<
  VisProperties extends Record<string, unknown> = Record<string, unknown>,
  CP extends VisProperties = VisProperties
> = {
  version: string;
  component: React.FC<CP>;
  metadata: LayerMetadata;
  defaultVisConfig?: VisProperties;
  registerForm:
    | LayerRegisterForm<VisProperties>
    | ((props: LayerRegisterFormProps) => LayerRegisterForm<VisProperties>);
};
