import { useThrottleEffect } from 'ahooks';
import { isArray, isEqual, isEqualWith, isUndefined } from 'lodash-es';
import type { DependencyList } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { DatasetFilter, LocalDatasetSchema } from '../../specs';
import type { LocalDataset } from '../../types';
import { applyDatasetFilter, filterFalsyDatasetFilter } from '../../utils';
import { useMemoDeep } from './useMemoDeep';

const customizerDepsEqual = (aDeps: DependencyList = [], bDeps: DependencyList = []) => {
  return isEqualWith(aDeps, bDeps, (a: ServiceParams, b: ServiceParams) => {
    if (a.data === b.data && isEqual(a.filter, b.filter)) {
      return true;
    }
    return false;
  });
};

// const Caches = new Map();

type ServiceParams = Pick<LocalDatasetSchema, 'data' | 'filter'>;

export const NOOP_LOCAL_DATASET: LocalDatasetSchema = {
  id: 'noop',
  type: 'local',
  data: [],
  columns: [],
  metadata: { name: 'noop' },
};

const NOOP_SERVICE = () => Promise.resolve([]);

const datasetFilterService = async (params: ServiceParams) => {
  const { data, filter } = params;

  if (!filter) {
    return data;
  }

  let filterData: Record<string, any>[];

  try {
    filterData = await applyDatasetFilter(data, filter);
  } catch (error) {
    const err = new Error(`applyDatasetFilter is failure, filter data: '${JSON.stringify(filter)}'.`);
    console.error(err);
    return data;
  }

  return filterData;
};

export function useLocalDataset(datasetSchema: LocalDatasetSchema, pickFilter?: DatasetFilter) {
  const filter = useMemo(() => {
    const _columns = datasetSchema.columns || [];
    const _filter = pickFilter || datasetSchema.filter;
    if (isUndefined(_filter)) return _filter;

    const filterChildren = filterFalsyDatasetFilter(_filter).children.map((child) => {
      const column = _columns.find((item) => item.name === child.field);
      return Object.assign({}, child, column && { fieldMeta: column });
    });
    const _filterFormat = { ..._filter, children: filterChildren };

    return _filterFormat;
  }, [datasetSchema.filter, pickFilter, datasetSchema.columns]);
  const params: ServiceParams = useMemoDeep(() => ({ data: datasetSchema.data, filter }), customizerDepsEqual);

  // 防抖
  const [debouncedParams, setDebouncedParams] = useState<ServiceParams>(params);
  useThrottleEffect(() => setDebouncedParams(params), [params], { wait: 1000 });

  const [data, setData] = useState<Record<string, any>[]>();

  const service = datasetSchema.id === NOOP_LOCAL_DATASET.id ? NOOP_SERVICE : datasetFilterService;

  // const cacheKey = datasetSchema.id + JSON.stringify(params);
  // const { data, run } = useRequest<Record<string, unknown>[], [ServiceParams]>(service, {
  //   defaultParams: params,
  //   cacheKey,
  //   manual: false,
  // });

  useEffect(() => {
    let didCancel = false;
    // const cacheKey = datasetSchema.id + JSON.stringify(debouncedParams);

    service(debouncedParams)
      .then((_data) => {
        if (!didCancel) {
          setData(_data);
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      didCancel = true;
    };
  }, [debouncedParams]);

  const dataset: LocalDataset = useMemo(() => {
    return {
      ...datasetSchema,
      //TODO: 参数变化时，立即返回的数据还是上一次的数据
      data: isArray(data) ? data : [],
    };
  }, [datasetSchema, data]);

  return dataset;
}
