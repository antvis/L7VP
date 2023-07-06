import { useUpdateEffect } from 'ahooks';
import { useEffect, useState } from 'react';
import { DatasetsStoreEvent } from '../state/constants';
import { useStateManager } from './internal';

export function useDatasetList() {
  const { datasetStore } = useStateManager();
  const [datasetList, setDatasetList] = useState(() => datasetStore.getDatasetList());

  useUpdateEffect(() => {
    setDatasetList(datasetStore.getDatasetList());
  }, [datasetStore.getDatasets()]);

  useEffect(() => {
    const onUpdateDataset = () => {
      setDatasetList(datasetStore.getDatasetList());
    };

    datasetStore.on(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
    datasetStore.on(DatasetsStoreEvent.UPDATE_DATASET, onUpdateDataset);
    datasetStore.on(DatasetsStoreEvent.REMOVE_DATASET, onUpdateDataset);
    return () => {
      datasetStore.off(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
      datasetStore.off(DatasetsStoreEvent.UPDATE_DATASET, onUpdateDataset);
      datasetStore.off(DatasetsStoreEvent.REMOVE_DATASET, onUpdateDataset);
    };
  }, [datasetStore]);

  return [datasetList] as const;
}
