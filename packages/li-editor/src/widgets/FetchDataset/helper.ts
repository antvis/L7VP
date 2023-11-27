import { isEmpty } from 'lodash-es';
import type { DatasetProperties, FetchDatasetConfig } from './types';

type valueType = string | boolean | number;

type DatasetConfig = Omit<FetchDatasetConfig, 'body' | 'headers'> & {
  body?: { field: string; value: valueType }[];
  headers?: { field: string; value: valueType }[];
};

export const arrayConversionObject = (initialVal?: { field: string; value: valueType }[]): Record<string, any> => {
  if (!initialVal || isEmpty(initialVal)) {
    return {};
  }

  const new_val: Record<string, valueType> = {};

  for (let i = 0; i < initialVal.length; i++) {
    if (initialVal[i]?.field) {
      new_val[initialVal[i].field] = initialVal[i].value;
    }
  }

  return new_val;
};

export const getProperties = (datasetConfig: DatasetConfig): DatasetProperties => {
  const { url, method, body, headers, onComplete, onError } = datasetConfig;
  const new_headers = arrayConversionObject(headers);
  const new_body = arrayConversionObject(body);

  if (method === 'GET') {
    if (!isEmpty(new_body)) {
      let requestParameter = '';
      for (const [key, value] of Object.entries(new_body)) {
        requestParameter += `&${key}=${value}`;
      }

      const urls = url + requestParameter.replace('&', '?');

      return { url: urls, requestOptions: { method, headers: new_headers }, onComplete, onError };
    }
    return { url, requestOptions: { method, headers: new_headers }, onComplete, onError };
  }

  return { url, requestOptions: { method, body: new_body, headers: new_headers }, onComplete, onError };
};
