import { merge, omit } from 'lodash-es';
import { useMemo } from 'react';
import { useDataset } from '../../../../hooks/useDataset';
import type { LayerSchema } from '../../../../specs';
import { isLocalOrRemoteDataset } from '../../../../utils';

export const useLayerProps = (visConfig: LayerSchema['visConfig'], sourceConfig: LayerSchema['sourceConfig']) => {
  const datasetId = sourceConfig?.datasetId || '';
  const [dataset] = useDataset(datasetId);

  const layerProps = useMemo(() => {
    if (sourceConfig?.datasetId && dataset) {
      const restSourceConfig = omit(sourceConfig, ['datasetId']);
      const source = isLocalOrRemoteDataset(dataset)
        ? { data: dataset.data, ...restSourceConfig }
        : { data: dataset.properties.url, ...merge({}, omit(dataset.properties, ['url']), restSourceConfig) };
      return {
        ...visConfig,
        source,
      };
    }

    return visConfig;
  }, [visConfig, sourceConfig, dataset]);

  return layerProps;
};
