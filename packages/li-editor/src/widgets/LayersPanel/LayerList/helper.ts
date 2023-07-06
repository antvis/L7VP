import type { LayerSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';

export const getDefaultLayerAttr = (name: string, datasetId: string) => {
  const config: LayerSchema = {
    id: getUniqueId('layer_id'),
    type: '',
    metadata: {
      name,
    },
    sourceConfig: { datasetId } as LayerSchema['sourceConfig'],
    visConfig: { visible: true },
  };

  return config;
};
