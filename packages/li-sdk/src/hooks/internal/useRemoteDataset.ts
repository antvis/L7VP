import { useThrottleEffect } from 'ahooks';
import { isArray, isObject, isUndefined } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import type { DatasetField, DatasetFilter, RemoteDatasetSchema } from '../../specs';
import type { ImplementService, RemoteDataset, ServiceParams } from '../../types';
import { filterFalsyDatasetFilter, getDatasetColumns } from '../../utils';
import { useMemoDeep } from './useMemoDeep';
import { useRegistryManager } from './index';

const mergeColumns = (columns: DatasetField[], originColumns?: DatasetField[]) => {
  if (!originColumns) {
    return columns;
  }

  const originColumnsMap = new Map<string, DatasetField>();
  originColumns.forEach((column) => {
    originColumnsMap.set(column.name, column);
  });

  const mergedColumns = columns.map((column) => {
    const originColumn = originColumnsMap.get(column.name);
    if (originColumn) {
      return {
        ...originColumn,
        type: column.type,
      };
    }
    return column;
  });

  return mergedColumns;
};

export const NOOP_REMOTE_DATASET: RemoteDatasetSchema = {
  id: 'noop',
  type: 'remote',
  serviceType: 'noop',
  properties: {},
  metadata: { name: 'noop' },
};

const NOOP_SERVICE: ImplementService = {
  version: 'noop',
  metadata: { name: 'noop', displayName: 'noop', type: 'Dataset' },
  service: () => Promise.resolve([]),
};

// TODO: 优化缓存
const Caches = new Map();

export function useRemoteDataset(datasetSchema: RemoteDatasetSchema, pickFilter?: DatasetFilter) {
  const registryManager = useRegistryManager();
  const serviceType = datasetSchema.serviceType;
  const implementService: ImplementService<[ServiceParams], Record<string, any>[]> =
    serviceType === NOOP_REMOTE_DATASET.serviceType ? NOOP_SERVICE : registryManager.getService(serviceType);
  const service = implementService.service;

  const proxyService = (params: ServiceParams) => {
    const cacheKey = implementService.metadata.name + JSON.stringify(params);
    if (Caches.has(cacheKey)) {
      return Promise.resolve(Caches.get(cacheKey));
    }

    return service(params).then((data) => {
      Caches.set(cacheKey, data);
      return data;
    });
  };

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
  const datasetProperties = datasetSchema.properties;

  const params: ServiceParams = useMemoDeep(() => ({ properties: datasetProperties, filter }));
  // 防抖
  const [debouncedParams, setDebouncedParams] = useState<ServiceParams>(params);
  useThrottleEffect(() => setDebouncedParams(params), [params], { wait: 100 });

  const [data, setData] = useState<Record<string, any>[]>();

  // const cacheKey = implementService.metadata.name + JSON.stringify(params);
  // const { data, run, loading } = useRequest<Record<string, unknown>[], [ServiceParams]>(proxyService, {
  //   cacheKey,
  //   manual: true,
  // });

  useEffect(() => {
    let didCancel = false;
    // TODO: 处理竞态优化，取消上一次
    proxyService(debouncedParams)
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

  const dataset: RemoteDataset = useMemo(() => {
    const columns =
      isArray(data) && isObject(data[0]) ? mergeColumns(getDatasetColumns(data[0]), datasetSchema.columns) : [];
    return {
      ...datasetSchema,
      data: isArray(data) ? data : [],
      columns,
    };
  }, [datasetSchema, data]);

  return dataset;
}
