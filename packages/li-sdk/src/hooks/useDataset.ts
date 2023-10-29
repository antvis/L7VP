import { useCallback } from 'react';
import type { DatasetFilter } from '../specs';
import type { Dataset } from '../types';
import { isLocalDataset, isRemoteDataset } from '../utils';
import {
  NOOP_LOCAL_DATASET,
  NOOP_REMOTE_DATASET,
  useDatasetBase,
  useLocalDataset,
  useRemoteDataset,
  useStateManager,
} from './internal';

export function useDataset<T extends Dataset = Dataset>(
  datasetId: string,
  options?: { filter: DatasetFilter },
): [T | undefined, (data: Partial<Omit<T, 'id'>>) => void] {
  const { datasetStore } = useStateManager();
  const dataset = useDatasetBase<T>(datasetId);
  const isLocal = dataset && isLocalDataset(dataset);
  const isRemote = dataset && isRemoteDataset(dataset);

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
