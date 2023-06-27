import type { Metadata } from './metadata';

/**
 * 图层配置项
 */
export type LayerVisConfig = {
  /** 图层是否可见 */
  visible?: boolean;
  /** 图层层级 */
  zIndex?: number;
  /** 图层数据源，可选，
   * 如果配置了 sourceConfig，则默认替换为 sourceConfig 的配置
   */
  source?: Record<string, any>;

  /** 其它属性 */
  [key: string]: any;
};

/**
 * 图层数据源配置项
 */
export type LayerSourceConfig = {
  /** 关联的数据集 ID */
  datasetId: string;
  /** 数据解析配置项，对应 L7 的 source.parser */
  parser: {
    type: string;
    x?: string;
    y?: string;
    x1?: string;
    y1?: string;
    geometry?: string;
    [key: string]: any;
  };
  /** 数据转换配置项，对应 L7 的 source.transforms */
  transforms?: Record<string, any>[];
  /** 其它属性 */
  [key: string]: any;
};

export type LayerSchema = {
  /** 图层 ID */
  id: string;
  /** 图层资产类型，图层组件资产名 */
  type: string;
  /** 图层信息，用于存储图层元数据信息 */
  metadata: Metadata;
  /** 数据集配置，用于关联数据集 */
  sourceConfig?: LayerSourceConfig;
  /** 图层可视化配置项，对应 LarkMap 图层组件的 Props 属性 */
  visConfig: LayerVisConfig;
};
