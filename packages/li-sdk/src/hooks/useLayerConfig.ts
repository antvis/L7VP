import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import type { LayerSchema } from '../specs';
import { LayersStoreEvent } from '../state/constants';
import { useStateManager } from './internal';

export function useLayerConfig(layerId: string) {
  const { layersStore } = useStateManager();
  const [layerConfig, setLayerConfig] = useState(layersStore.getLayerById(layerId));

  useUpdateEffect(() => {
    setLayerConfig(layersStore.getLayerById(layerId));
  }, [layersStore.getLayers()]);

  useEffect(() => {
    const onUpdateLayer = (layer: LayerSchema) => {
      if (layer.id === layerId) {
        setLayerConfig(layer);
      }
    };
    layersStore.on(LayersStoreEvent.ADD_LAYER, onUpdateLayer);
    layersStore.on(LayersStoreEvent.UPDATE_LAYER, onUpdateLayer);
    return () => {
      layersStore.off(LayersStoreEvent.ADD_LAYER, onUpdateLayer);
      layersStore.off(LayersStoreEvent.UPDATE_LAYER, onUpdateLayer);
    };
  }, [layersStore]);

  const updataLayerConfig = useCallback((layer: Partial<Omit<LayerSchema, 'id' | 'type'>>) => {
    layersStore.updateLayer(layerId, layer);
  }, []);

  return [layerConfig, updataLayerConfig] as const;
}
