import EventEmitter from '@antv/event-emitter';
import type { AssetPackage } from '@antv/li-sdk';
import { LIRuntimeApp } from '@antv/li-sdk';
import React, { useMemo } from 'react';
import { Registry_Default_Editor_Widgets } from '../constants';
import { LIEditorStateContext } from '../hooks';
import { LIEditorContext, useImmer } from '../hooks/internal';
import type { LayoutProps } from '../layout';
import Layout from '../layout';
import AppService from '../services/app-service';
import EditorService from '../services/editor-service';
import EditorWidgetManager from '../services/editor-widget-manager';
import type { EditorContextServices, EditorContextState, ImplementEditorWidget } from '../types';
import { validateApplicationSchema } from '../utils/application';

export type LIEditorProps = Omit<LayoutProps, 'App'> & {
  /** 默认打开 Navbar 菜单的 Key */
  defaultActiveNavMenuKey?: string;
};

export type LIEditorOptions = {
  /** 应用资产包 */
  assets: AssetPackage[];
  /** 自定义编辑器控件 */
  editorWidgets?: ImplementEditorWidget[];
};

/**
 * LIEditor
 */
class LIEditor extends EventEmitter {
  /**
   * 默认内置编辑器控件
   */
  public static DefaultEditorWidgets = Registry_Default_Editor_Widgets;
  /**
   * 配置项
   */
  private options: LIEditorOptions;
  /**
   * 自定义编辑器控件管理
   */
  private editorWidgetManager: EditorWidgetManager;
  /**
   * 资产注册管理
   */
  private registryAssetManager: LIRuntimeApp['registryManager'];
  /**
   * runtimeApp
   */
  private runtimeApp: LIRuntimeApp;
  /**
   * Editor
   */
  public Editor: React.FC<LIEditorProps>;
  /**
   * appService
   */
  private appService: AppService;
  /**
   * editorService
   */
  private editorService: EditorService;

  constructor(options: LIEditorOptions) {
    super();
    const { assets, editorWidgets = [] } = options;
    const widgets = LIEditor.DefaultEditorWidgets.concat(editorWidgets);
    const runtimeApp = new LIRuntimeApp({ assets });
    const appService = new AppService(runtimeApp);
    const editorWidgetManager = new EditorWidgetManager(widgets);
    const editorService = new EditorService(this, appService, editorWidgetManager);

    this.options = options;
    this.runtimeApp = runtimeApp;
    this.registryAssetManager = runtimeApp.registryManager;
    this.editorWidgetManager = editorWidgetManager;
    this.appService = appService;
    this.editorService = editorService;

    this.Editor = this.getEditor();
  }

  /**
   * 获取编辑器组件
   */
  private getEditor() {
    const { runtimeApp, appService, editorService } = this;
    const App = runtimeApp.App;
    const { containerSlotMap } = editorService;

    // 编辑器上下文服务
    const contextValue: EditorContextServices = {
      appService,
      editorService,
      containerSlotMap,
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return function LIEditor(props: LIEditorProps) {
      const { defaultActiveNavMenuKey } = props;
      // 校验 Application Schema 是否规范
      const defaultApplication = useMemo(() => {
        const _defaultApplication = validateApplicationSchema(props.defaultApplication);
        editorService.editorDatasetManager.update(_defaultApplication.datasets);
        return _defaultApplication;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const activeNavMenuKey = useMemo(() => {
        const navMenuList = editorService.getNavMenuList();
        if (defaultActiveNavMenuKey && navMenuList.find((item) => item.key === defaultActiveNavMenuKey)) {
          return defaultActiveNavMenuKey;
        }
        const defaultKey = navMenuList[0] && navMenuList[0].key;
        return defaultKey;
      }, [defaultActiveNavMenuKey]);

      const { metadata, datasets, spec } = defaultApplication;
      const { map, layers, widgets } = spec;
      const [editorState, updateEditorState] = useImmer<EditorContextState>({
        activeNavMenuKey,
        collapsed: false,
        metadata,
        map,
        datasets,
        layers,
        widgets,
        serviceCache: {},
      });

      // 编辑器上下文状态
      const editorContextValue = useMemo(() => {
        return { state: editorState, updateState: updateEditorState };
      }, [editorState, updateEditorState]);

      editorService.editorStateRef = editorState;

      return (
        <LIEditorContext.Provider value={contextValue}>
          <LIEditorStateContext.Provider value={editorContextValue}>
            <Layout App={App} {...props} defaultApplication={defaultApplication} />
          </LIEditorStateContext.Provider>
        </LIEditorContext.Provider>
      );
    };
  }

  /**
   * 安装资产包
   */
  public installAssets(assets: AssetPackage[]) {
    this.appService.installAssets(assets);
  }

  /**
   * 获取应用配置
   */
  public getApplicationConfig() {
    const config = this.editorService.getApplicationConfig();

    return config;
  }
}

export default LIEditor;
