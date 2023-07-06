import { useUpdateEffect } from 'ahooks';
import { useCallback, useEffect, useState } from 'react';
import type { DatasetFilter } from '../specs';
import { DatasetsStoreEvent } from '../state/constants';
import type { Dataset } from '../types';
import { isLocalDataset, isRemoteDataset } from '../utils';
import {
  NOOP_LOCAL_DATASET,
  NOOP_REMOTE_DATASET,
  useLocalDataset,
  useRemoteDataset,
  useStateManager,
} from './internal';

export function useDataset<T extends Dataset = Dataset>(
  datasetId: string,
  options?: { filter: DatasetFilter },
): [T | undefined, (data: Partial<Omit<T, 'id'>>) => void] {
  const { datasetStore } = useStateManager();
  const [dataset, setDataset] = useState(() => datasetStore.getDatasetById(datasetId));
  const isLocal = dataset && isLocalDataset(dataset);
  const isRemote = dataset && isRemoteDataset(dataset);

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

  const updateDataset = useCallback(
    (data: Partial<Omit<T, 'id'>>) => {
      datasetStore.updateDataset(datasetId, data);
    },
    [datasetId, datasetStore],
  );

  const localDatasetSchema = isLocal ? dataset : NOOP_LOCAL_DATASET;
  const remoteDatasetSchema = isRemote ? dataset : NOOP_REMOTE_DATASET;
  const localDataset = useLocalDataset(localDatasetSchema, options?.filter);
  const remoteDataset = useRemoteDataset(remoteDatasetSchema, options?.filter);

  // @ts-ignore
  const _dataset: T | undefined = isRemote ? remoteDataset : isLocal ? localDataset : dataset;

  return [_dataset, updateDataset];
}
