import type { Metadata } from './metadata';

export type WidgetSchema = {
  /** 组件 ID */
  id: string;
  /** 组件资产类型，组件资产名 */
  type: string;
  /** 组件信息，用于存储组件元数据信息 */
  metadata: Metadata;
  /** 组件属性 */
  properties: Record<string, unknown>;
  /** 组件挂载的容器，可选 */
  container?: {
    /** 容器的组件的 ID */
    id: string;
    /** 容器组件的插槽 */
    slot: string;
  };
};
