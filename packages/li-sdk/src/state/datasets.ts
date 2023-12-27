import { mergeWith } from 'lodash-es';
import type { DatasetFilter, DatasetSchema } from '../specs';
import type { Dataset } from '../types';
import { mergeWithCustomizer } from '../utils';
import { isLocalOrRemoteDataset } from '../utils/dataset';
import BaseStore from './base-store';
import { DatasetsStoreEvent } from './constants';

export type DatasetsState = {
  datasets: Map<string, Dataset>;
};

/**
 * 数据集状态管理
 */
class DatasetStore extends BaseStore<DatasetsState> {
  public state: DatasetsState;

  constructor() {
    super();
    this.state = {
      datasets: new Map(),
    };
  }

  protected initDatasetFromSchema(datasetSchema: DatasetSchema): Dataset {
    if (datasetSchema.type === 'remote') {
      return {
        ...datasetSchema,
        columns: datasetSchema.columns || [],
        data: [],
      };
    }
    return datasetSchema;
  }

  public initState(initialState: { datasets: DatasetSchema[] }) {
    this.state = {
      datasets: new Map(
        initialState.datasets.map((item) => {
          return [item.id, this.initDatasetFromSchema(item)];
        }),
      ),
    };
  }

  public addDataset(datasetSchema: DatasetSchema) {
    if (!this.state.datasets.has(datasetSchema.id)) {
      const dataset = this.initDatasetFromSchema(datasetSchema);
      this.state.datasets.set(datasetSchema.id, dataset);
      this.emit(DatasetsStoreEvent.ADD_DATASET, dataset);
    }
  }

  public removeDataset(id: string) {
    this.state.datasets.delete(id);
    this.emit(DatasetsStoreEvent.REMOVE_DATASET, id);
  }

  public updateDataset(id: string, dataSource: Partial<Omit<Dataset, 'id'>>) {
    const source = this.getDatasetById(id);
    if (source) {
      this.state.datasets.set(id, mergeWith({}, source, dataSource, mergeWithCustomizer));
      this.emit(DatasetsStoreEvent.UPDATE_DATASET, this.getDatasetById(id));
    }
  }

  public getDatasetById(id: string) {
    return this.state.datasets.get(id);
  }

  public getDatasets() {
    return this.state.datasets;
  }

  public getDatasetList() {
    const dataSources = Array.from(this.state.datasets.values());

    return dataSources;
  }

  public getFilter(datasetId: string) {
    const dataset = this.getDatasetById(datasetId);
    if (dataset && isLocalOrRemoteDataset(dataset)) {
      return dataset.filter;
    }
  }

  public updateFilter(datasetId: string, filter: DatasetFilter) {
    const dataset = this.getDatasetById(datasetId);
    if (dataset && isLocalOrRemoteDataset(dataset)) {
      this.state.datasets.set(datasetId, { ...dataset, filter: filter });
      this.emit(DatasetsStoreEvent.UPDATE_FILTER, this.getDatasetById(datasetId));
      this.emit(DatasetsStoreEvent.UPDATE_DATASET, this.getDatasetById(datasetId));
    }
  }

  public clearFilter(datasetId: string) {
    const dataset = this.getDatasetById(datasetId);
    if (dataset && isLocalOrRemoteDataset(dataset) && dataset.filter) {
      dataset.filter = undefined;
      this.state.datasets.set(datasetId, { ...dataset });
      this.emit(DatasetsStoreEvent.CLEAR_FILTER, datasetId);
      this.emit(DatasetsStoreEvent.UPDATE_DATASET, this.getDatasetById(datasetId));
    }
  }
}

export default DatasetStore;
