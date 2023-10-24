import type { Application, DatasetSchema, LayerSchema, MapSchema, RemoteDataset, WidgetSchema } from '@antv/li-sdk';
import type AppService from '../services/app-service';
import type EditorService from '../services/editor-service';
import type { ContainerSlotMap } from './widget';

/** 编辑器上下文服务 */
export type EditorContextServices = {
  appService: AppService;
  editorService: EditorService;
  containerSlotMap: ContainerSlotMap;
};

export type EditorServiceCache = Record<string, Pick<RemoteDataset, 'data' | 'columns'>>;

/** 编辑器数据状态 */
export type EditorContextState = {
  /** 当前打开 Navbar 菜单的 Key */
  activeNavMenuKey: string;
  /** 当前 SideBar 是否收起 */
  collapsed: boolean;
  /** 应用元数据 */
  metadata: Application['metadata'];
  /** 地图管理 */
  map: MapSchema;
  /** 数据集管理 */
  datasets: DatasetSchema[];
  /** 图层管理 */
  layers: LayerSchema[];
  /** 组件管理 */
  widgets: WidgetSchema[];
};

/** LISDK 配置项  */
export type LIConfigState = Application;
