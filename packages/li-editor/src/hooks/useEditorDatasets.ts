import type { Dataset } from '@antv/li-sdk';
import { isRemoteDatasetSchema } from '@antv/li-sdk';
import { useMemo } from 'react';
import { useEditorState } from './useEditorState';

export const useEditorDatasets = (datasetIds?: string[]) => {
  const { state } = useEditorState();
  const { serviceCache, datasets: datasetSchemas } = state;

  const datasets = useMemo(() => {
    const newDatasets: Dataset[] = [];

    datasetSchemas.forEach((datasetSchema) => {
      if (Array.isArray(datasetIds) && !datasetIds.includes(datasetSchema.id)) {
        return;
      }

      if (isRemoteDatasetSchema(datasetSchema)) {
        const targetCache = serviceCache[datasetSchema.id];
        newDatasets.push({
          ...datasetSchema,
          data: targetCache?.data ?? [],
          columns: targetCache?.columns ?? [],
        });
      } else {
        newDatasets.push(datasetSchema);
      }
    });
    return newDatasets;
  }, [datasetIds, datasetSchemas, serviceCache]);

  return datasets;
};
