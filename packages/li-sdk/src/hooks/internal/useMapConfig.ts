import type { Scene } from '@antv/l7';
import type { LayerManager } from '@antv/larkmap/es/utils';
import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import type { MapSchema } from '../../specs';
import { MapStoreEvent } from '../../state/constants';
import { useStateManager } from './useStateManager';

export function useMapConfig() {
  const { layersStore, mapStore } = useStateManager();
  const [mapConfig, setMapConfig] = useState(mapStore.getMapConfig());

  useUpdateEffect(() => {
    setMapConfig(mapStore.getMapConfig());
  }, [mapStore.getMapConfig()]);

  useEffect(() => {
    const onMapOptionsChange = () => {
      setMapConfig(mapStore.getMapConfig());
    };
    mapStore.on(MapStoreEvent.UPDATE_VIEWSTATE, onMapOptionsChange);
    return () => {
      mapStore.off(MapStoreEvent.UPDATE_VIEWSTATE, onMapOptionsChange);
    };
  }, [mapStore]);

  const setMapViewState = useCallback((viewState: MapSchema['config']) => {
    mapStore.setMapViewState(viewState);
  }, []);

  const setScene = useCallback((scene: Scene) => {
    mapStore.setScene(scene);
  }, []);

  const setLayerManager = useCallback((layerManager: LayerManager) => {
    layersStore.setLayerManager(layerManager);
  }, []);

  return [mapConfig, { setMapViewState, setScene, setLayerManager }] as const;
}
