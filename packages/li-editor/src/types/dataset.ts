import type { DatasetField, LocalDataset, RasterTileDataset, RemoteDataset, VectorTileDataset } from '@antv/li-sdk';

export type FieldPair = {
  defaultName: string;
  pair: Record<
    string,
    {
      fieldIdx: number;
      value: string;
    }
  >;
  suffix: string[];
};

export type GeoField = DatasetField & {
  geoType: 'Point' | 'Line' | 'Polygon';
};

type EditorLocalDataset = LocalDataset & {
  fieldPairs: FieldPair[];
};

type EditorRemoteDataset = RemoteDataset & {
  fieldPairs: FieldPair[];
};

type EditorVectorTileDataset = VectorTileDataset;

type EditorRasterTileDataset = RasterTileDataset;

export type EditorDataset =
  | EditorLocalDataset
  | EditorVectorTileDataset
  | EditorRasterTileDataset
  | EditorRemoteDataset;
