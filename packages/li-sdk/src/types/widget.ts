import type { SchemaProperties } from '@formily/json-schema';
import type { DatasetField, LayerSchema, WidgetSchema } from '../specs';
import type { WidgetMetadata } from '../specs/metadata';
import type { Dataset } from './dataset';
import type { ImplementService } from './service';

export type SlotsElements<K extends string = string> = {
  [key in K]?: (props?: Record<string, any>) => React.ReactNode;
};

export interface ImplementWidgetProps<K extends string = string> {
  'data-widget-id': string;
  'data-widget-name': string;
  slotsElements: SlotsElements<K>;
}

export type WidgetRegisterForm<
  Properties extends Record<string, unknown> = Record<string, unknown>,
  Values extends Record<string, unknown> = Record<string, unknown>
> = {
  /**
   * 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema：
   * https://react.formilyjs.org/zh-CN/api/shared/schema
   */
  schema: SchemaProperties<any, any, any, any, any, any, any, any>;
  /**
   * 自定义表单组件：
   * https://formilyjs.org/zh-CN/guide/advanced/custom
   */
  components?: Record<string, React.FC>;
  /**
   * 表单数据格式转换，将结构化数据(属性面板数据类型)转换为表单的结构，
   * 默认属性面板与表单数据一致，不做转换。
   */
  toValues?: (config: Properties) => Values;
  /**
   * 表单数据格式转换，将表单的数据结构转为结构化数据(属性面板数据类型)，
   * 默认属性面板与表单数据一致，不做转换。
   */
  fromValues?: (values: Values) => Properties;
};

export type DatasetFieldWithMeta = DatasetField & {
  value: string;
  label: string;
  type?: string;
  typeName?: string;
  typeColor?: string;
};

export type WidgetRegisterFormProps = {
  /**
   * 数据集，用于提供数据集选择
   */
  datasets: Dataset[];
  /**
   * 可视化图层，用于提供图层相关组件配置选择
   */
  layers: LayerSchema[];
  /**
   * 原子组件，用于容器组件选择插槽内的原子组件
   */
  atomWidgets: WidgetSchema[];
  /**
   * 组件 ID，用于原子组件的属性项
   */
  widgetId: string;
  /**
   * 服务资产，用于提供选择可消费的服务资产
   */
  services: ImplementService[];
};

export type ImplementWidgetOptions<
  Properties extends Record<string, unknown> = Record<string, unknown>,
  CP extends Properties = Properties
> = {
  /**
   * 组件资产版本号
   */
  version: string;
  /**
   * 组件
   */
  component: React.FC<CP>;
  /**
   * 组件资产元属性信息
   */
  metadata: WidgetMetadata;
  /**
   * 属性面板默认值，用于创建组件时默认值设置
   */
  defaultProperties?: Properties;
  /**
   * 组件资产属性面板配置
   */
  registerForm?:
    | WidgetRegisterForm<Properties, any>
    | ((props: WidgetRegisterFormProps) => WidgetRegisterForm<Properties, any>);
};

export type ImplementWidget<
  Properties extends Record<string, unknown> = Record<string, unknown>,
  CP extends Properties = Properties
> = {
  version: string;
  component: React.FC<CP>;
  metadata: WidgetMetadata;
  defaultProperties?: Properties;
  registerForm: WidgetRegisterForm<Properties> | ((props: WidgetRegisterFormProps) => WidgetRegisterForm<Properties>);
};

export type ChildrenMap = Record<
  string,
  Record<string, WidgetSchema[]> & {
    _grandChildren?: WidgetSchema[];
    _allChildren: WidgetSchema[];
  }
>;
