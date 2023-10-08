import type { LocalDataset, RasterTileDataset, RemoteDataset, VectorTileDataset } from '@antv/li-sdk';

type FieldPair = {
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
