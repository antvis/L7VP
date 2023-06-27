import type { LayerManager } from '@antv/larkmap/es/utils';
import { mergeWith } from 'lodash-es';
import type { LayerSchema } from '../specs';
import { mergeWithCustomizer } from '../utils';
import BaseStore from './base-store';
import { LayersStoreEvent } from './constants';

export type LayersState = {
  /**
   * 图层配置数据
   */
  layers: Map<string, LayerSchema>;
  /**
   * 图层配置器实例
   */
  layerManager?: LayerManager;
};

/**
 * 图层状态管理
 */
class LayersStore extends BaseStore<LayersState> {
  public state: LayersState;

  constructor() {
    super();
    this.state = { layers: new Map() };
  }

  public initState(initialState: { layers: LayerSchema[] }) {
    this.state.layers = new Map(initialState.layers.map((item) => [item.id, item]));
  }

  public addLayer(layer: LayerSchema) {
    if (!this.state.layers.has(layer.id)) {
      this.state.layers.set(layer.id, layer);
      this.emit(LayersStoreEvent.ADD_LAYER, layer);
    }
  }

  public removeLayer(id: string) {
    this.state.layers.delete(id);
    this.emit(LayersStoreEvent.REMOVE_LAYER, id);
  }

  public updateLayer(id: string, layer: Partial<Omit<LayerSchema, 'id' | 'type'>>) {
    const layerSchema = this.getLayerById(id);
    if (layerSchema) {
      this.state.layers.set(id, mergeWith({}, layerSchema, layer, mergeWithCustomizer));
      this.emit(LayersStoreEvent.UPDATE_LAYER, this.getLayerById(id));
    }
  }

  public setLayerVisibility(id: string, visible: boolean) {
    const layer = this.getLayerById(id);
    if (layer) {
      this.state.layers.set(id, { ...layer, visConfig: { ...layer.visConfig, visible } });
      this.emit(LayersStoreEvent.UPDATE_LAYER, this.getLayerById(id));
    }
  }

  public getLayerById(id: string) {
    return this.state.layers.get(id);
  }

  public getLayers() {
    return this.state.layers;
  }

  public getLayerList() {
    const layers = Array.from(this.state.layers.values());

    return layers;
  }

  public setLayerManager(layerManager?: LayerManager) {
    this.state = { ...this.state, layerManager: layerManager };
    this.emit(LayersStoreEvent.SET_LAYERMANAGER, layerManager);
  }

  public getLayerManager() {
    return this.state.layerManager;
  }
}

export default LayersStore;
