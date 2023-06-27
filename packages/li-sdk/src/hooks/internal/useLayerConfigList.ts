import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { LayersStoreEvent } from '../../state/constants';
import { useStateManager } from './useStateManager';

export function useLayerConfigList() {
  const { layersStore } = useStateManager();
  const [layerConfigList, setLayerConfigList] = useState(layersStore.getLayerList());

  useUpdateEffect(() => {
    setLayerConfigList(layersStore.getLayerList());
  }, [layersStore.getLayers()]);

  useEffect(() => {
    const onUpdateLayer = () => {
      setLayerConfigList(layersStore.getLayerList());
    };

    layersStore.on(LayersStoreEvent.ADD_LAYER, onUpdateLayer);
    layersStore.on(LayersStoreEvent.UPDATE_LAYER, onUpdateLayer);
    layersStore.on(LayersStoreEvent.REMOVE_LAYER, onUpdateLayer);
    return () => {
      layersStore.off(LayersStoreEvent.ADD_LAYER, onUpdateLayer);
      layersStore.off(LayersStoreEvent.UPDATE_LAYER, onUpdateLayer);
      layersStore.off(LayersStoreEvent.REMOVE_LAYER, onUpdateLayer);
    };
  }, [layersStore]);

  return [layerConfigList] as const;
}
