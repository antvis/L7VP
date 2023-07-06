import produce from 'immer';
import type { DatasetFilter, FilterNode } from '../specs';
import { isLocalOrRemoteDataset } from '../utils';
import { useStateManager } from './internal';
import { useDataset } from './useDataset';

export function useDatasetFilter(datasetId: string) {
  const { datasetStore } = useStateManager();
  const [dataset] = useDataset(datasetId);
  const filter = (dataset && isLocalOrRemoteDataset(dataset) && dataset.filter) || undefined;

  const addFilterNode = (filterNode: FilterNode, filterLogicalOperator?: DatasetFilter['relation']) => {
    if (dataset && isLocalOrRemoteDataset(dataset)) {
      let _filter: DatasetFilter;
      if (dataset.filter) {
        _filter = { ...dataset.filter, children: dataset.filter.children.concat(filterNode) };
      } else {
        _filter = { relation: filterLogicalOperator || 'AND', children: [filterNode] };
      }
      datasetStore.updateFilter(datasetId, _filter);
    }
  };

  const updateFilterNode = (filterId: string, filterNode: Partial<Omit<FilterNode, 'id'>>) => {
    if (
      dataset &&
      isLocalOrRemoteDataset(dataset) &&
      dataset.filter &&
      dataset.filter.children.find((item) => item.id === filterId)
    ) {
      const _filter = produce(dataset.filter, (draftState) => {
        const index = draftState.children.findIndex((item) => item.id === filterId);
        if (index !== -1) draftState.children[index] = { ...draftState.children[index], ...filterNode } as FilterNode;
      });
      datasetStore.updateFilter(datasetId, _filter);
    }
  };

  const removeFilterNode = (filterId: string) => {
    if (
      dataset &&
      isLocalOrRemoteDataset(dataset) &&
      dataset.filter &&
      dataset.filter.children.find((item) => item.id === filterId)
    ) {
      const _filter = produce(dataset.filter, (draftState) => {
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
