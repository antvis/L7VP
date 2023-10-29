import type EventEmitter from '@antv/event-emitter';
import type { AutoCreateSchema, ContainerSlotMap, EditorContextState, ImplementEditorWidget } from '../types';
import { getMenuList, requestIdleCallback, resolveContainerSlotMap } from '../utils';
import { creatEmptyApplication, getApplicationSchemaFromEditorState } from '../utils/application';
import type AppService from './app-service';
import EditorDatasetManager from './editor-dataset-manager';
import { EditorState } from './editor-state';
import EditorWidgetManager from './editor-widget-manager';

class EditorService {
  private eventBus: EventEmitter;
  private appService: AppService;
  public editorState: EditorState;
  public containerSlotMap: ContainerSlotMap;
  public editorDatasetManager: EditorDatasetManager;
  public editorWidgetManager: EditorWidgetManager;
  public editorStateRef!: EditorContextState;

  constructor(eventBus: EventEmitter, editorWidgets: ImplementEditorWidget[], appService: AppService) {
    this.eventBus = eventBus;
    this.appService = appService;
    this.editorState = new EditorState(creatEmptyApplication('empty'));
    this.editorDatasetManager = new EditorDatasetManager(appService);
    this.editorWidgetManager = new EditorWidgetManager(editorWidgets);
    this.containerSlotMap = this.getWidgetsContainerSlotMap();

    // 同步 datasetSchemas 更新到 editorDatasetManager
    this.editorState.subscribe((result) => {
      this.editorDatasetManager.update(result.datasets, this.autoCreateSchemaHandler);
    });
  }

  /**
   * 获取自定义编辑器组件插槽空间
   */
  getWidgetsContainerSlotMap() {
    const editorWidget = this.editorWidgetManager.getAllWidgets();
    const containerSlotMap = resolveContainerSlotMap(editorWidget);

    return containerSlotMap;
  }

  /**
   * 解析侧边导航栏 menuPanel 插槽
   */
  getNavMenuList() {
    const widgets = this.containerSlotMap.SideNav?.menuPanel || [];
    return getMenuList(widgets);
  }

  /**
   * 发布事件
   */
  public publishEvent(evt: string, ...params: any[]) {
    this.eventBus.emit(evt, ...params);
  }

  /**
   * 获取应用配置
   */
  public getApplicationConfig() {
    const config = getApplicationSchemaFromEditorState(this.editorState.getSnapshot());

    return config;
  }

  /**
   * autoCreateSchemaHandler
   */
  private autoCreateSchemaHandler = (data: AutoCreateSchema) => {
    const { layers, layerPopup, bounds } = data;
    if (!layers.length) return;

    this.editorState.setState((draft) => {
      draft.layers.push(...layers);

      // 如果 layerPopup 资产存在且开启，自动添加属性字段
      const index = draft.widgets.findIndex((w) => w.type === layerPopup.type);
      if (index !== -1) {
        const items = layerPopup.properties.items as Record<string, any>[];
        if (draft.widgets[index].properties?.isOpen) {
          (draft.widgets[index].properties as Record<string, any>)?.items?.push(...items);
        }
      }

      draft.activeNavMenuKey = 'layers';
    });

    if (bounds) {
      // 放到下一帧，图层加载到地图上渲染耗时，影响 fitBounds 流程度
      requestIdleCallback(() => {
        this.appService.syncMapBounds(bounds);
      });
    }
  };
}

export default EditorService;
