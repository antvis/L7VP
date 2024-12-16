import type { DatasetSchema } from '../specs';
import { useStateManager } from './internal';

export function useDatasetUpdate() {
  const { datasetStore } = useStateManager();

  const updateDataset = (dataSetLists: DatasetSchema[]) => {
    dataSetLists.forEach((dataSet) => {
      if (!datasetStore.getDatasetById(dataSet.id)) {
        datasetStore.addDataset(dataSet);
      } else {
        datasetStore.updateDataset(dataSet.id, dataSet);
      }
    });
  };

  return [datasetStore, updateDataset] as const;
}
