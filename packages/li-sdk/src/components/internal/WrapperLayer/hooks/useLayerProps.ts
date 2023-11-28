import { omit } from 'lodash-es';
import { useMemo } from 'react';
import { useDataset } from '../../../../hooks/useDataset';
import type { LayerSchema, LayerSourceConfig } from '../../../../specs';
import type { Dataset } from '../../../../types';
import { isLocalOrRemoteDataset } from '../../../../utils';

const getLayerSource = (dataset: Dataset, sourceConfig: LayerSourceConfig) => {
  if (isLocalOrRemoteDataset(dataset)) {
    const restSourceConfig = omit(sourceConfig, ['datasetId', 'parser']);
    return {
      data: dataset.data,
      parser: { type: 'json', ...sourceConfig?.parser },
      ...restSourceConfig,
    };
  }

  const tileProperties = dataset.properties;
  const restTileProperties = omit(tileProperties, ['type', 'url']);
  const restLayerSourceConfig = omit(sourceConfig, ['datasetId', 'parser']);
  return {
    data: dataset.properties.url,
    // TODO: 数据冗余属性不注入进去
    parser: { ...restTileProperties, ...sourceConfig.parser },
    ...restLayerSourceConfig,
  };
};

export const useLayerProps = (visConfig: LayerSchema['visConfig'], sourceConfig: LayerSchema['sourceConfig']) => {
  const datasetId = sourceConfig.datasetId;
  const [dataset] = useDataset(datasetId);

  const layerProps = useMemo(() => {
    if (sourceConfig.datasetId && dataset) {
      const source = getLayerSource(dataset, sourceConfig);
      return {
        ...visConfig,
        source,
      };
    }

    return visConfig;
  }, [visConfig, sourceConfig, dataset]);

  return layerProps;
};
