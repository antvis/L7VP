import { useUpdate, useUpdateEffect } from 'ahooks';
import { produce } from 'immer';
import { useEffect } from 'react';
import type { DatasetFilter, FilterNode } from '../specs';
import { DatasetsStoreEvent } from '../state/constants';
import type { Dataset } from '../types';
import { isLocalOrRemoteDataset } from '../utils';
import { useStateManager } from './internal';

function useFilter(datasetId: string) {
  const { datasetStore } = useStateManager();
  const update = useUpdate();

  useUpdateEffect(() => {
    update();
  }, [datasetStore.getDatasets()]);

  useUpdateEffect(() => {
    update();
  }, [datasetId]);

  useEffect(() => {
    const onClearFilter = (id: string) => {
      if (id === datasetId) update();
    };
    const onUpdateDataset = (data: Dataset) => {
      if (data.id === datasetId) update();
    };
    datasetStore.on(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
    datasetStore.on(DatasetsStoreEvent.CLEAR_FILTER, onClearFilter);
    datasetStore.on(DatasetsStoreEvent.UPDATE_FILTER, onUpdateDataset);
    return () => {
      datasetStore.off(DatasetsStoreEvent.ADD_DATASET, onUpdateDataset);
      datasetStore.off(DatasetsStoreEvent.CLEAR_FILTER, onClearFilter);
      datasetStore.off(DatasetsStoreEvent.UPDATE_FILTER, onUpdateDataset);
    };
  }, [datasetId, datasetStore]);

  return datasetStore.getFilter(datasetId);
}

export function useDatasetFilter(datasetId: string) {
  const { datasetStore } = useStateManager();
  const filter = useFilter(datasetId);
  const dataset = datasetStore.getDatasetById(datasetId);
  const isLocalOrRemote = dataset && isLocalOrRemoteDataset(dataset);

  const addFilterNode = (filterNode: FilterNode, filterLogicalOperator?: DatasetFilter['relation']) => {
    if (isLocalOrRemote) {
      let _filter: DatasetFilter;
      const lastFilter = datasetStore.getFilter(datasetId);
      if (lastFilter) {
        _filter = { ...lastFilter, children: lastFilter.children.concat(filterNode) };
      } else {
        _filter = { relation: filterLogicalOperator || 'AND', children: [filterNode] };
      }
      datasetStore.updateFilter(datasetId, _filter);
    }
  };

  const updateFilterNode = (filterId: string, filterNode: Partial<Omit<FilterNode, 'id'>>) => {
    const lastFilter = datasetStore.getFilter(datasetId);
    if (isLocalOrRemote && lastFilter && lastFilter.children.find((item) => item.id === filterId)) {
      const _filter = produce(lastFilter, (draftState) => {
        const index = draftState.children.findIndex((item) => item.id === filterId);
        if (index !== -1) draftState.children[index] = { ...draftState.children[index], ...filterNode } as FilterNode;
      });
      datasetStore.updateFilter(datasetId, _filter);
    }
  };

  const removeFilterNode = (filterId: string) => {
    const lastFilter = datasetStore.getFilter(datasetId);
    if (isLocalOrRemote && lastFilter && lastFilter.children.find((item) => item.id === filterId)) {
      const _filter = produce(lastFilter, (draftState) => {
        const index = draftState.children.findIndex((item) => item.id === filterId);
        if (index !== -1) draftState.children.splice(index, 1);
      });
      datasetStore.updateFilter(datasetId, _filter);
    }
  };

  return [
    filter,
    {
      addFilterNode,
      updateFilterNode,
      removeFilterNode,
      updateFilter: datasetStore.updateFilter.bind(datasetStore, datasetId),
      clearFilter: datasetStore.clearFilter.bind(datasetStore, datasetId),
    },
  ] as const;
}
