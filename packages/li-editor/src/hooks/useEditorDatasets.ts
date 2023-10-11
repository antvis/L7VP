import { isLocalDatasetSchema, isRemoteDatasetSchema } from '@antv/li-sdk';
import { useUpdateEffect } from 'ahooks';
import { useMemo, useRef, useState } from 'react';
import type { EditorDataset } from '../types';
import { useEditorService } from './useEditor';
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

export const _useEditorDatasets_ = (datasetIds?: string[]) => {
  const { editorService } = useEditorService();
  const { editorDatasetManager } = editorService;
  const { state } = useEditorState();
  const { serviceCache, datasets: datasetSchemas } = state;
  const isFirst = useRef(false);

  if (!isFirst.current) {
    editorDatasetManager.update(datasetSchemas);
    isFirst.current = true;
  }

  useUpdateEffect(() => {
    editorDatasetManager.update(datasetSchemas);
  }, [datasetSchemas]);

  const [editorDatasets, setEditorDatasets] = useState(() => {});

  return editorDatasetManager.getDatasetList();
};
