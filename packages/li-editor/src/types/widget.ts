import type {
  LayerSchema,
  LocalDatasetSchema,
  Metadata,
  RasterTileDatasetSchema,
  RemoteDatasetSchema,
  VectorTileDatasetSchema,
} from '@antv/li-sdk';

export interface ImplementEditorWidgetProps {}

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type AddDataset =
  | Optional<LocalDatasetSchema, 'id' | 'columns'>
  | Optional<RemoteDatasetSchema, 'id'>
  | Optional<VectorTileDatasetSchema, 'id'>
  | Optional<RasterTileDatasetSchema, 'id'>;

export interface ImplementEditorAddDatasetWidgetProps extends ImplementEditorWidgetProps {
  onSubmit: (addDatasets: AddDataset[], layers?: LayerSchema[]) => void;
  onCancel: () => void;
}

export interface ImplementEditorPreviewDatasetWidgetProps extends ImplementEditorWidgetProps {
  datasetId: string;
  visible: boolean;
  onCancel: () => void;
}

export type EditorWidgetMetadata = Metadata & {
  displayName: string;
  // type?: 'AddDataset' | 'MenuPanel';
  // category?: string;
  icon?: string;
};

type EditorWidgetProperties = {};

/**
 * 自定义扩展
 * side navigation 侧边导航栏容器
 */
export type EditorSideNavContainer = {
  /**
   * 挂载容器类型名
   */
  type: 'SideNav';
  /**
   * 挂载容器位置
   */
  slot: 'top' | 'menuPanel' | 'bottom';
};

/**
 * 侧边导航栏菜单 menuPanel 菜单
 */
export type EditorMenuPanelWithMenu = {
  /** 菜单名称 */
  name: string;
  /** 菜单 key 用于标定选中的值 */
  key: string;
  /** 菜单的 icon */
  icon: React.ReactNode;
};

/**
 * 自定义扩展
 * side panel 侧边栏面板容器
 */
export type EditorSidePanelContainer = {
  /**
   * 挂载容器类型名
   */
  type: 'SidePanel';
  /**
   * 挂载容器位置
   */
  slot: 'header';
};

/**
 * 自定义扩展
 * Datasets 数据集容器
 */
export type EditorDatasetsPanelContainer = {
  /**
   * 挂载容器类型名
   */
  type: 'Datasets';
  /**
   * 挂载容器位置
   */
  slot: 'addDataset' | 'preview';
};

export type EditorWidgetContainer = EditorSideNavContainer | EditorDatasetsPanelContainer;

export type ImplementEditorWidgetOptions = {
  version: string;
  component: React.FC<any>;
  metadata: EditorWidgetMetadata;
  /**
   * 挂载扩展的容器
   */
  container: EditorWidgetContainer;
  /**
   * 侧边导航栏菜单
   */
  menu?: EditorMenuPanelWithMenu;
};

export type ImplementEditorWidget = {
  version: string;
  component: React.FC<any>;
  metadata: EditorWidgetMetadata;
  container: EditorWidgetContainer;
  menu?: EditorMenuPanelWithMenu;
};

export type ContainerSlotMap = Record<string, Record<string, ImplementEditorWidget[]>>;
