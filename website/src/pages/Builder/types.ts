import type {
  Application,
  AssetPackage,
  DatasetField,
  DatasetSchema,
  ImplementWidget,
  LayerSchema,
  LayerSourceConfig,
  LayerVisConfig,
  WidgetSchema,
} from '@antv/li-sdk';
import type { Project } from '@/services';

export {
  LayerSchema,
  AssetPackage,
  Application,
  WidgetSchema,
  DatasetSchema,
  LayerVisConfig,
  LayerSourceConfig,
  DatasetField,
  ImplementWidget,
};

/** 搭建应用的数据类型 */
export type BuilderState = {
  /** 项目信息 */
  project?: Project;
};

/** 搭建应用的上下文类型 */
export type BuilderContextState = {};
