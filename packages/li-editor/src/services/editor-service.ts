import type EventEmitter from '@antv/event-emitter';
import type { ContainerSlotMap, EditorContextState } from '../types';
import { getMenuList, resolveContainerSlotMap } from '../utils';
import { getApplicationSchema } from '../utils/application';
import EditorDatasetManager from './editor-dataset-manager';
import type EditorWidgetManager from './editor-widget-manager';

class EditorService {
  private eventBus: EventEmitter;
  public containerSlotMap: ContainerSlotMap;
  public editorDatasetManager: EditorDatasetManager;
  private editorWidgetManager: EditorWidgetManager;
  public editorStateRef!: EditorContextState;

  constructor(eventBus: EventEmitter, editorWidgetManager: EditorWidgetManager) {
    this.eventBus = eventBus;
    this.editorDatasetManager = new EditorDatasetManager();
    this.editorWidgetManager = editorWidgetManager;
    this.containerSlotMap = this.getWidgetsContainerSlotMap();
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
    const editorState = this.editorStateRef;
    if (!editorState) {
      throw new Error(`The editor component has not been initialized`);
    }
    const config = getApplicationSchema(this.editorStateRef);

    return config;
  }
}

export default EditorService;
