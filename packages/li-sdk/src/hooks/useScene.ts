import { useCallback, useEffect, useState } from 'react';
import type { MapSchema } from '../specs';
import { MapStoreEvent } from '../state/constants';
import { useStateManager } from './internal';

export function useScene() {
  const { mapStore } = useStateManager();
  const [scene, setScene] = useState(mapStore.getScene());

  useEffect(() => {
    const onSetScene = () => {
      setScene(mapStore.getScene());
    };
    mapStore.on(MapStoreEvent.SET_SCENE, onSetScene);
    return () => {
      mapStore.off(MapStoreEvent.SET_SCENE, onSetScene);
    };
  }, [mapStore]);

  const setMapViewState = useCallback((viewState: MapSchema['config']) => {
    mapStore.setMapViewState(viewState);
  }, []);

  return [scene, { setMapViewState }] as const;
}
