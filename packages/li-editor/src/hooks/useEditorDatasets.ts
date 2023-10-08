import { isLocalDatasetSchema, isRemoteDatasetSchema } from '@antv/li-sdk';
import { useMemo } from 'react';
import type { EditorDataset } from '../types';
import { useEditorState } from './useEditorState';

export const useEditorDatasets = (datasetIds?: string[]) => {
  const { state } = useEditorState();
  const { serviceCache, datasets: datasetSchemas } = state;

  const datasets = useMemo(() => {
    const newDatasets: EditorDataset[] = [];

    datasetSchemas.forEach((datasetSchema) => {
      if (Array.isArray(datasetIds) && !datasetIds.includes(datasetSchema.id)) return;

      if (isLocalDatasetSchema(datasetSchema)) {
        newDatasets.push({
          ...datasetSchema,
          fieldPairs: [],
        });
      } else if (isRemoteDatasetSchema(datasetSchema)) {
        const targetCache = serviceCache[datasetSchema.id];
        newDatasets.push({
          ...datasetSchema,
          data: targetCache?.data ?? [],
          columns: targetCache?.columns ?? [],
          fieldPairs: [],
        });
      } else {
        newDatasets.push(datasetSchema);
      }
    });
    return newDatasets;
  }, [datasetIds, datasetSchemas, serviceCache]);

  return datasets;
};
