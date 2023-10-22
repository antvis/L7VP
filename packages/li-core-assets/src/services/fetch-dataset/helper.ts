import type { DatasetFilter, DatasetServiceParams } from '@antv/li-sdk';
import { parserDataWithGeo } from '@antv/li-sdk';
import { applyDatasetFilter } from '@antv/li-sdk/dist/esm/utils';

const Chache = new Map();

type QueryDataParams = {
  url: string;
  requestOptions: Omit<RequestInit, 'body'> & {
    body?: Record<string, any>;
  };
};

type Params = DatasetServiceParams<QueryDataParams>;

const datasetFilterService = async (
  params: { filter?: DatasetFilter; data: Record<string, any>[] },
  signal: AbortSignal,
) => {
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
    return Promise.reject(err);
  }

  if (signal.aborted) {
    return Promise.reject('Aborted the request');
  }

  return filterData;
};

/**
 * 通过 fetch 获取的数据
 */
export const getFetchData = (params: Params) => {
  const { properties, filter, signal } = params;
  const requestkey = properties.url + properties.requestOptions.method + JSON.stringify(properties.requestOptions.body);
  const defaultRequestInit: RequestInit = {
    mode: 'cors',
    cache: 'default',
    signal,
  };
  const requestInit: RequestInit = Object.assign(defaultRequestInit, {
    body:
      typeof properties.requestOptions.body === 'object'
        ? JSON.stringify(properties.requestOptions.body)
        : properties.requestOptions.body,
  });

  if (Chache.has(requestkey)) {
    const data = Chache.get(requestkey);
    return datasetFilterService({ data, filter }, signal);
  }

  return fetch(properties.url, requestInit)
    .then((res) => res.json())
    .then((_data) => {
      if (Array.isArray(_data) && _data.length === 0 ? true : typeof _data[0] === 'object') {
        const formatData = parserDataWithGeo(_data);

        Chache.set(requestkey, formatData);

        return datasetFilterService({ data: formatData, filter }, signal);
      }

      return Promise.reject(new Error('数据格式不是数组对象, 请检查数据格式是否正确。'));
    });
};
