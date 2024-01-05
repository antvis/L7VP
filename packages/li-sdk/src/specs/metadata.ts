export type Metadata = {
  /** 名称 */
  name: string;
  /** 描述 */
  description?: string;
  /** 其它属性 */
  [key: string]: any;
};

/**
 * 应用元数据信息
 */
export type ApplicationMetadata = Metadata & {
  /** 创建时间 */
  creatTime?: string;
};

/**
 * 图层资产元数据信息
 */
export type LayerMetadata = Metadata & {
  /** 显示名称 */
  displayName: string;
  /**
   * 图层资产类型:
   */
  type?: 'Layer';
  /** 图层资产分类 */
  category?: string;
  /** 图层图标，用于图层市场展示 */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  /** 图层颜色，用于图层列表展示 */
  color?: string;
};

/**
 * 组件资产类型：
 * Layout-布局组件;
 * Container-容器组件（容器内可随意添加原子组件）;
 * Atom-原子组件（需要加载到容器的组件）;
 * Auto-自加载组件（自动挂载到地图画布的组件）;
 */
export type WidgetType = 'Layout' | 'Container' | 'Atom' | 'Auto';

/**
 * 组件资产类别：
 * https://www.yuque.com/antv/l7vp/zqvk302x61qq2kcq#kg6q1
 */
export type WidgetCategory =
  | 'Layout'
  | 'Container'
  | 'MapInteraction'
  | 'MapControl'
  | 'DataAnalysis'
  | 'LayerInteraction';

/**
 * 组件资产元数据信息
 */
export type WidgetMetadata = Metadata & {
  /** 显示名称 */
  displayName: string;
  /**
   * 组件资产类型:
   * Layout-布局组件;
   * Container-容器组件（容器内可随意添加原子组件）;
   * Atom-原子组件（需要加载到容器的组件）;
   * Auto-自加载组件（自动挂载到地图画布的组件）;
   */
  type: WidgetType;
  /** 组件资产分类，支持自定义分类 */
  category?: WidgetCategory | string;
  /** 组件图标，用于组件市场展示 */
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

/**
 * 服务资产类型：
 * Dataset-数据集查询服务;
 * [Spatial-空间查询服务;]
 * Custom-自定义服务类型
 */
export type ServiceType = 'Dataset' | 'Custom';

/**
 * 服务元数据信息
 */
export type ServiceMetadata = Metadata & {
  /** 显示名称 */
  displayName: string;
  /**
   * 服务资产类型：
   * Dataset-数据集查询服务;
   * [Spatial-空间查询服务;]
   * Custom-自定义服务类型
   */
  type: ServiceType;
  /** 服务资产分类，自定义分类 */
  category?: string;
};
