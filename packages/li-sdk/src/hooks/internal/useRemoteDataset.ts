import type { QueryFunctionContext } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import { isArray, isObject, isUndefined } from 'lodash-es';
import { useMemo } from 'react';
import type { DatasetField, DatasetFilter, RemoteDatasetSchema } from '../../specs';
import type { DatasetServiceParams, ImplementService, RemoteDataset } from '../../types';
import { filterFalsyDatasetFilter, getDatasetColumns, queryServiceClient } from '../../utils';
import { useRegistryManager } from './useRegistryManager';

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

export function useRemoteDataset(datasetSchema: RemoteDatasetSchema, pickFilter?: DatasetFilter) {
  const registryManager = useRegistryManager();
  const serviceType = datasetSchema.serviceType;
  const implementService: ImplementService<[DatasetServiceParams], Record<string, any>[]> =
    serviceType === NOOP_REMOTE_DATASET.serviceType ? NOOP_SERVICE : registryManager.getService(serviceType);
  const service = implementService.service;

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

  // const params: Omit<DatasetServiceParams, 'signal'> = useMemoDeep(() => ({
  //   properties: datasetProperties,
  //   filter,
  // }));
  // 防抖
  // const [debouncedParams, setDebouncedParams] = useState<Omit<DatasetServiceParams, 'signal'>>(params);
  // useThrottleEffect(() => setDebouncedParams(params), [params], { wait: 100 });

  const queryFn = (context: QueryFunctionContext) => {
    const serviceParams: DatasetServiceParams = { filter, properties: datasetProperties, signal: context.signal };
    return service(serviceParams);
  };

  const { data } = useQuery(
    {
      queryKey: [implementService.metadata.name, filter, datasetProperties],
      queryFn,
      placeholderData: [],
    },
    queryServiceClient,
  );

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
