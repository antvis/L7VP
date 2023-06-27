import type {
  DatasetField,
  LocalDatasetSchema,
  RasterTileDatasetSchema,
  RemoteDatasetSchema,
  VectorTileDatasetSchema,
} from '../specs';

export type LocalDataset<T extends Record<string, any> = Record<string, any>> = LocalDatasetSchema<T>;
export type VectorTileDataset = VectorTileDatasetSchema;
export type RasterTileDataset = RasterTileDatasetSchema;
export type RemoteDataset<T extends Record<string, any> = Record<string, any>> = RemoteDatasetSchema & {
  /** 数据 */
  data: T[];
  /** 列字段 */
  columns: DatasetField[];
};

export type LocalOrRemoteDataset = LocalDataset | RemoteDataset;
export type Dataset = LocalDataset | VectorTileDataset | RasterTileDataset | RemoteDataset;
