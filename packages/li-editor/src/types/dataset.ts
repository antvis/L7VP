import type { DatasetField } from '@antv/li-sdk';

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
