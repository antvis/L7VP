import type { DatasetSchema, LocalDatasetSchema, RemoteDatasetSchema } from '../specs';
import type { Dataset, LocalDataset, RemoteDataset } from '../types';

/**
 * 判断 dataset 是否为 local 类型
 */
export function isLocalDataset(dataset: Dataset): dataset is LocalDataset {
  return ['json', 'local'].includes(dataset.type);
}

/**
 * 判断 dataset 是否为 remote 类型
 */
export function isRemoteDataset(dataset: Dataset): dataset is RemoteDataset {
  return dataset.type === 'remote';
}

/**
 * 判断当前数据源是否是常规数据源，或者说是否包含常规数据
 */
export function isLocalOrRemoteDataset(dataset: Dataset): dataset is LocalDataset | RemoteDataset {
  return isLocalDataset(dataset) || isRemoteDataset(dataset);
}

/**
 * 判断 dataset 是否为 local 类型
 */
export function isLocalDatasetSchema(dataset: DatasetSchema): dataset is LocalDatasetSchema {
  return ['json', 'local'].includes(dataset.type);
}

/**
 * 判断 dataset 是否为 remote 类型
 */
export function isRemoteDatasetSchema(dataset: DatasetSchema): dataset is RemoteDatasetSchema {
  return dataset.type === 'remote';
}

/**
 * 判断当前数据源是否是常规数据源，或者说是否包含常规数据
 */
export function isLocalOrRemoteDatasetSchema(
  datasetSchema: DatasetSchema,
): datasetSchema is LocalDatasetSchema | RemoteDatasetSchema {
  return isLocalDatasetSchema(datasetSchema) || isRemoteDatasetSchema(datasetSchema);
}
