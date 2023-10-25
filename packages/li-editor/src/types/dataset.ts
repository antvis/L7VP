import type { DatasetField } from '@antv/li-sdk';

export type FieldPair = {
  type: 'Point';
  displayName: string;
  pair: {
    lat: string;
    lng: string;
    alt?: string;
  };
};

export type GeoField = DatasetField & {
  geoType: 'Point' | 'Line' | 'Polygon';
};
