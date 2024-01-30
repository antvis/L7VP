import type { Scene } from '@antv/l7';
import type { MapSchema } from '../specs';
import BaseStore from './base-store';
import { MapStoreEvent } from './constants';

export type MapState = {
  /**
   * 场景实例
   */
  sceneInstance?: Scene;
  /**
   * 地图配置项
   */
  mapConfig: MapSchema;
  /**
   * hover 中的数据
   * @deprecated 暂无用途
   */
  hoverFeature?: Record<string, any>;
  /**
   * 单选中的数据
   * @deprecated 暂无用途
   */
  selectFeatures: Record<string, any>[];
  /**
   * 绘制工具选中的数据
   * @deprecated 暂无用途
   */
  geometrySelectionFeatures: Record<string, any>[];
};

/**
 * 地图状态管理
 */
class MapStore extends BaseStore<MapState> {
  public state: MapState = {
    mapConfig: { basemap: 'Gaode', config: {} },
    selectFeatures: [],
    geometrySelectionFeatures: [],
  };

  constructor(initialState?: MapState) {
    super();
    if (initialState) {
      this.state = initialState;
    }
  }

  public initMapConfigState(mapConfig: MapSchema) {
    this.state.mapConfig = mapConfig;
  }

  public setMapViewState(viewState: MapState['mapConfig']['config']) {
    const mapConfig = {
      ...this.state.mapConfig,
      config: {
        ...this.state.mapConfig.config,
        ...viewState,
      },
    };

    this.state = {
      ...this.state,
      mapConfig,
    };

    this.emit(MapStoreEvent.UPDATE_VIEWSTATE, viewState);
  }

  public getMapConfig() {
    return this.state.mapConfig;
  }

  public setScene(scene: Scene) {
    this.state = { ...this.state, sceneInstance: scene };
    this.emit(MapStoreEvent.SET_SCENE, scene);
  }

  public getScene() {
    return this.state.sceneInstance;
  }
}

export default MapStore;
