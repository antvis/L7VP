import type { AssetPackage, ImplementService, LayerSchema, LIRuntimeApp, WidgetSchema } from '@antv/li-sdk';
import { isEmpty } from 'lodash-es';
import { AtomWidgetEmptyContainer, AtomWidgets } from '../constants';

const NOOP_SERVICE: ImplementService = {
  version: 'noop',
  metadata: { name: 'noop', displayName: 'noop', type: 'Dataset' },
  service: () => Promise.resolve([]),
};

class AppService {
  /** 运行时应用 */
  private runtimeApp: LIRuntimeApp;

  constructor(runtimeApp: LIRuntimeApp) {
    this.runtimeApp = runtimeApp;
  }

  /**
   * 安装资产包
   */
  public installAssets(assets: AssetPackage[]) {
    this.runtimeApp.installAssets(assets);
  }

  /**
   * 获取所有注册的组件资产
   */
  private getImplementWidgetsMap() {
    return this.runtimeApp.registryManager.widgets;
  }

  /**
   * 获取所有注册的服务资产
   */
  private getImplementServicesMap() {
    return this.runtimeApp.registryManager.services;
  }

  /**
   * 获取实现组件资产
   */
  public getImplementWidget(name: string) {
    const widget = this.getImplementWidgetsMap().get(name);
    if (!widget) {
      console.warn(`组件 ${name} 未在资产中.`);
    }
    return widget;
  }

  /**
   * 获取所有注册的组件列表资产
   */
  public getImplementWidgets() {
    const registryManager = this.runtimeApp.registryManager;
    const widgets = registryManager.getAllWidgets();

    return widgets;
  }

  public getImplementService(name: string) {
    const service = this.getImplementServicesMap().get(name);
    if (!service) {
      console.warn(`服务 ${name} 未在资产中.`);
    }
    return service;
  }

  /**
   * 获取所有注册的服务列表资产
   */
  public getImplementServices() {
    const registryManager = this.runtimeApp.registryManager;
    return registryManager.getAllServices();
  }

  /**
   * 获取注册的数据集类型服务资产
   */
  public getImplementDatasetServices() {
    return this.getImplementServices().filter((service) => service.metadata.type === 'Dataset');
  }

  /**
   * 获取注册的数据集类型服务资产
   */
  public getImplementDatasetService(name: string) {
    const service = this.getImplementServicesMap().get(name);
    if (!service) {
      console.error(`数据集查询服务 ${name} 未在资产中.`);
    } else if (service.metadata.type !== 'Dataset') {
      console.error(`${name} 不属于数据集查询服务.`);
    }
    return service || NOOP_SERVICE;
  }

  /**
   * 获取布局组件资产
   */
  public getLayoutWidget(widgets: WidgetSchema[]) {
    const layoutWidget = widgets.find((widget) => {
      const implementWidget = this.getImplementWidget(widget.type);
      const isLayout = implementWidget?.metadata.type === 'Layout';
      return isLayout;
    });

    return layoutWidget;
  }

  /**
   * 判断是否是原子组件资产
   */
  public isAtomWidget(widget: WidgetSchema) {
    const implementWidget = this.getImplementWidget(widget.type);
    if (!implementWidget) return false;
    const isAtom = AtomWidgets.includes(implementWidget?.metadata.type);
    return isAtom;
  }

  /**
   * 获取容器组件可插槽的原子组件资产
   */
  public getAtomWidgets(widgets: WidgetSchema[], containerId: string) {
    const atomWidgets = widgets.filter((widget) => {
      // 过滤原子组件已经被其它容器组件选择的情况
      const hasSelected =
        widget.container && widget.container.id !== AtomWidgetEmptyContainer?.id && widget.container.id !== containerId;
      if (hasSelected) return false;
      const isAtom = this.isAtomWidget(widget);
      return isAtom;
    });

    return atomWidgets;
  }

  /**
   * 获取容器组件的插槽内容
   */
  public getContainerWidgetSlotMap(widgets: WidgetSchema[], containerId: string) {
    const containerSlotMap: Record<string, string[]> = {};
    widgets.forEach((widget) => {
      if (widget.container && widget.container.id === containerId) {
        if (containerSlotMap[widget.container.slot]) {
          containerSlotMap[widget.container.slot].push(widget.id);
        } else {
          containerSlotMap[widget.container.slot] = [widget.id];
        }
      }
    });

    return containerSlotMap;
  }

  /**
   * 获取所有注册的图层资产
   */
  private getImplementLayersMap() {
    return this.runtimeApp.registryManager.layers;
  }

  /**
   * 获取实现图层资产
   */
  public getImplementLayer(name: string) {
    if (isEmpty(name)) return undefined;
    const layer = this.getImplementLayersMap().get(name);
    if (!layer) {
      console.warn(`图层 ${name} 未在资产中.`);
    }
    return layer;
  }

  /**
   * 获取所有注册的图层列表资产
   */
  public getImplementLayers() {
    const registryManager = this.runtimeApp.registryManager;
    const layers = registryManager.getAllLayers();

    return layers;
  }

  /**
   * 获取图层资产默认的可视化配置
   */
  public getImplementLayerDefaultVis(name: string): LayerSchema['visConfig'] {
    return this.getImplementLayer(name)?.defaultVisConfig ?? {};
  }

  /**
   * 获取地图实例
   */
  public getInstanceLayerById(id: string) {
    const { layersStore } = this.runtimeApp.stateManager;
    const layerManager = layersStore.getLayerManager();
    return layerManager?.getLayerById(id);
  }

  /**
   * 图层定位到数据可视范围
   */
  public handleLayerFitBounds(id: string) {
    const { layersStore } = this.runtimeApp.stateManager;
    const layerManager = layersStore.getLayerManager();
    const layerInstance = layerManager?.getLayerById(id);
    layerInstance?.fitBounds();
  }

  /**
   * 获取地图当前视野信息
   */
  public getMapViewState() {
    const { mapStore } = this.runtimeApp.stateManager;
    const sceneInstance = mapStore.getScene();
    if (!sceneInstance) return;

    const zoom = sceneInstance.getZoom();
    const center = sceneInstance.getCenter();
    const pitch = sceneInstance.getPitch();
    const rotation = sceneInstance.getRotation();
    const bounds = sceneInstance.getBounds();

    return {
      zoom,
      center,
      pitch,
      rotation,
      bounds,
    };
  }

  /**
   * 获取地图当前视野信息
   */
  public getSceneInstance() {
    const { mapStore } = this.runtimeApp.stateManager;
    const sceneInstance = mapStore.getScene();
    if (!sceneInstance) return;

    return sceneInstance;
  }

  /**
   * 设置地图 Bounds
   *  bounds [[minlng,minlat],[maxlng,maxlat]]
   */
  public fitMapBounds(bounds: [[number, number], [number, number]]) {
    const { mapStore } = this.runtimeApp.stateManager;
    const sceneInstance = mapStore.getScene();

    // 0.001 度，约 100 米
    // const pading = 0.001;
    // const paddingBounds: [[number, number], [number, number]] = [
    //   [bounds[0][0] - pading, bounds[0][1] - pading],
    //   [bounds[1][0] + pading, bounds[1][1] + pading],
    // ];

    sceneInstance?.fitBounds(bounds);
  }

  /**
   * 同步地图 Bounds
   */
  public syncMapBounds(bounds: [[number, number], [number, number]]) {
    const { mapStore } = this.runtimeApp.stateManager;
    const sceneInstance = mapStore.getScene();

    // 地图实例还未创建时，待实例创建完成再同步 bounds
    // 地图还未实例化，需要同步地图情况：pyl7vp 场景会用到
    // TODO:针对 pyl7vp 场景，解决方案：暴露出自动生成 schema API 方法，提前生成好，也可保证预览态可用，like addDatasetToMap
    if (!sceneInstance) {
      mapStore.once('set-scene', () => {
        this.fitMapBounds(bounds);
      });
      return;
    }

    this.fitMapBounds(bounds);
  }
}

export default AppService;
