import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { DatasetsStoreEvent } from '../../state/constants';
import type { Dataset } from '../../types';
import { useStateManager } from './useStateManager';

export function useDatasetBase<T extends Dataset = Dataset>(datasetId: string): T | undefined {
  const { datasetStore } = useStateManager();
  const [dataset, setDataset] = useState(() => datasetStore.getDatasetById(datasetId));

  useUpdateEffect(() => {
    setDataset(datasetStore.getDatasetById(datasetId));
  }, [datasetStore.getDatasets()]);

  useUpdateEffect(() => {
    if (dataset?.id !== datasetId) {
      setDataset(datasetStore.getDatasetById(datasetId));
    }
  }, [datasetId]);

  useEffect(() => {
    const onUpdateDataset = (data: Dataset) => {
      if (data.id === datasetId) {
        setDataset(data);
      }
    };
    datasetStore.on(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
    datasetStore.on(DatasetsStoreEvent.UPDATE_DATASET, onUpdateDataset);
    return () => {
      datasetStore.off(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
      datasetStore.off(DatasetsStoreEvent.UPDATE_DATASET, onUpdateDataset);
    };
  }, [datasetId, datasetStore]);

  return dataset as T;
}
