import EventEmitter from '@antv/event-emitter';
import React, { memo, useMemo } from 'react';
import { LIContext } from '../hooks/internal/useLIContext';
import RegistryManager from '../registry';
import StateManager from '../state';
import type { GlobalModel } from '../state/global';
import type { AssetPackage } from '../types';
import type { LIRenderProps } from './Render';
import LIRender from './Render';

export type LIRuntimeAppOptions = {
  /** 应用资产包 */
  assets: AssetPackage[];
  /** 初始化的全局状态 */
  initialGlobalState?: GlobalModel;
};

/**
 * LocationInsight
 * 运行时框架
 */
class LIRuntimeApp {
  /**
   * 配置项
   */
  private options: LIRuntimeAppOptions;
  /**
   * 资产注册管理
   */
  public registryManager: RegistryManager;
  /**
   * 状态管理（运行时
   */
  public stateManager: StateManager;
  /**
   * 组件事件（组件事件订阅
   */
  public eventBus = new EventEmitter();
  /**
   * APP
   */
  public App: React.FC<LIRenderProps>;

  constructor(options: LIRuntimeAppOptions = { assets: [] }) {
    const { assets, initialGlobalState } = options;
    this.options = options;
    this.registryManager = new RegistryManager(assets);
    this.stateManager = new StateManager(initialGlobalState);
    this.App = memo(this.getApp());

    this.installAssets(assets);
  }

  /**
   * 安装资产包
   */
  public installAssets(assets: AssetPackage[]) {
    assets.forEach((asset) => this.registryManager.installAsset(asset));
  }

  private getApp() {
    const { eventBus, registryManager, stateManager } = this;

    // eslint-disable-next-line @typescript-eslint/no-shadow
    return function LIRuntimeApp(props: LIRenderProps) {
      const { datasets, spec } = props.config;

      stateManager.initState(props.config);

      // config 更新 => 强制更新上下文
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const contextValue = useMemo(() => ({ eventBus, registryManager, stateManager }), [datasets, spec]);

      // TODO：registryManager 安装更新资产包后需求强制更新上下文

      return (
        <LIContext.Provider value={contextValue}>
          <LIRender {...props} />
        </LIContext.Provider>
      );
    };
  }
}

export default LIRuntimeApp;
