import EventEmitter from '@antv/event-emitter';
import type { Application, AssetPackage } from '@antv/li-sdk';
import { LIRuntimeApp } from '@antv/li-sdk';
import React, { useMemo } from 'react';
import { Registry_Default_Editor_Widgets } from '../constants';
import { LIEditorContext } from '../hooks/internal';
import type { LayoutProps } from '../layout';
import Layout from '../layout';
import AppService from '../services/app-service';
import EditorService from '../services/editor-service';
import type EditorWidgetManager from '../services/editor-widget-manager';
import type { EditorContextServices, ImplementEditorWidget } from '../types';

export type LIEditorProps = Omit<LayoutProps, 'App'> & {
  /** 默认的应用配置 */
  defaultApplication: Application;
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
    const editorService = new EditorService(this, widgets, appService);

    this.options = options;
    this.runtimeApp = runtimeApp;
    this.appService = appService;
    this.editorService = editorService;
    this.registryAssetManager = runtimeApp.registryManager;
    this.editorWidgetManager = editorService.editorWidgetManager;

    this.Editor = this.getEditor();
  }

  /**
   * 获取编辑器组件
   */
  private getEditor() {
    const { runtimeApp, appService, editorService } = this;
    const App = runtimeApp.App;
    const { editorState, containerSlotMap } = editorService;

    // 编辑器上下文服务
    const contextValue: EditorContextServices = {
      appService,
      editorService,
      containerSlotMap,
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return function LIEditor(props: LIEditorProps) {
      const { defaultApplication, defaultActiveNavMenuKey } = props;
      const activeNavMenuKey = useMemo(() => {
        const navMenuList = editorService.getNavMenuList();
        if (defaultActiveNavMenuKey && navMenuList.find((item) => item.key === defaultActiveNavMenuKey)) {
          return defaultActiveNavMenuKey;
        }
        const defaultKey = navMenuList[0] && navMenuList[0].key;
        return defaultKey;
      }, [defaultActiveNavMenuKey]);

      // 初始化 editorState
      useMemo(() => editorState.initState(defaultApplication, activeNavMenuKey), []);

      return (
        <LIEditorContext.Provider value={contextValue}>
          <Layout App={App} {...props} />
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
