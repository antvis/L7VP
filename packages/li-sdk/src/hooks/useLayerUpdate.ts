import type { LayerSchema } from '../specs';
import { useStateManager } from './internal';

export function useLayerUpdate() {
  const { layersStore } = useStateManager();

  const updateLayer = (layerLists: LayerSchema[]) => {
    layerLists.forEach((layer) => {
      if (!layersStore.getLayerById(layer.id)) {
        layersStore.addLayer(layer);
      } else {
        layersStore.updateLayer(layer.id, layer);
      }
    });
  };

  return [layersStore, updateLayer] as const;
}
