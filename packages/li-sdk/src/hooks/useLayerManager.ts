import { useEffect, useState } from 'react';
import { LayersStoreEvent } from '../state/constants';
import { useStateManager } from './internal';

export const useLayerManager = () => {
  const { layersStore } = useStateManager();
  const [layerManager, setLayerManager] = useState(layersStore.state.layerManager);

  useEffect(() => {
    const onSetLayerManager = () => {
      setLayerManager(layersStore.getLayerManager());
    };
    layersStore.on(LayersStoreEvent.SET_LAYERMANAGER, onSetLayerManager);
    return () => {
      layersStore.off(LayersStoreEvent.SET_LAYERMANAGER, onSetLayerManager);
    };
  }, [layersStore]);

  return layerManager;
};
