import type { AssetPackage, ImplementLayer, ImplementService, ImplementWidget } from '../types';

// export type RegistryManagerInterface = InstanceType<typeof RegistryManager>;

class RegistryManager {
  public widgets = new Map<string, ImplementWidget>();
  public layers = new Map<string, ImplementLayer>();
  public services = new Map<string, ImplementService>();

  constructor(assets: AssetPackage[] = []) {
    assets.forEach((asset) => this.installAsset(asset));
  }

  /**
   * 注册组件资产
   */
  public registerWidget(widget: ImplementWidget) {
    // if (this.widgets.get(widget.metadata.name)) {
    //   throw new Error(`Already has widget ${widget.metadata.name} in this registry.`);
    // }
    if (!this.widgets.has(widget.metadata.name)) {
      this.widgets.set(widget.metadata.name, widget);
    }
  }

  /**
   * 注册图层资产
   */
  public registerLayer(layer: ImplementLayer) {
    // if (this.layers.get(layer.metadata.name)) {
    //   throw new Error(`Already has layer ${layer.metadata.name} in this registry.`);
    // }
    if (!this.layers.has(layer.metadata.name)) {
      this.layers.set(layer.metadata.name, layer);
    }
  }

  /**
   * 注册图层资产
   */
  public registerService(service: ImplementService) {
    // if (this.layers.get(layer.metadata.name)) {
    //   throw new Error(`Already has layer ${layer.metadata.name} in this registry.`);
    // }
    if (!this.services.has(service.metadata.name)) {
      this.services.set(service.metadata.name, service);
    }
  }

  /**
   * 获取组件资产
   */
  public getWidget(name: string): ImplementWidget {
    const c = this.widgets.get(name);
    if (!c) {
      // throw new Error(`Widget ${name} has not registered yet.`);
      const empty = { component: () => `组件 ${name} 未注册成功.`, metadata: {}, registerForm: {} };
      console.error(`[li-sdk]: 组件 ${name} 未注册成功.`);
      return (empty as any) as ImplementWidget;
    }
    return c;
  }

  /**
   * 获取图层资产
   */
  public getLayer(name: string): ImplementLayer {
    const c = this.layers.get(name);
    if (!c) {
      // throw new Error(`Layer ${name} has not registered yet.`);
      const empty = { component: () => null, metadata: {}, registerForm: {} };
      console.error(`[li-sdk]: 图层 ${name} 未注册成功.`);
      return (empty as any) as ImplementLayer;
    }
    return c;
  }

  /**
   * 获取图层资产
   */
  public getService(name: string): ImplementService {
    const c = this.services.get(name);
    if (!c) {
      // throw new Error(`Layer ${name} has not registered yet.`);
      const empty = { service: () => Promise.resolve([]), metadata: {} };
      console.error(`[li-sdk]: 服务 ${name} 未注册成功.`);
      return (empty as any) as ImplementService;
    }
    return c;
  }

  /**
   * 获取所有组件资产
   */
  public getAllWidgets(): ImplementWidget[] {
    const result: ImplementWidget[] = [];
    for (const widget of this.widgets.values()) {
      result.push(widget);
    }
    return result;
  }

  /**
   * 获取所有图层资产
   */
  public getAllLayers(): ImplementLayer[] {
    const result: ImplementLayer[] = [];
    for (const layer of this.layers.values()) {
      result.push(layer);
    }
    return result;
  }

  /**
   * 获取所有服务资产
   */
  public getAllServices(): ImplementService[] {
    const result: ImplementService[] = [];
    for (const service of this.services.values()) {
      result.push(service);
    }
    return result;
  }

  /**
   * 安装资产包
   */
  public installAsset(asset: AssetPackage) {
    asset.widgets?.forEach((w) => this.registerWidget(w));
    asset.layers?.forEach((w) => this.registerLayer(w));
    asset.services?.forEach((w) => this.registerService(w));
  }
}

export default RegistryManager;
