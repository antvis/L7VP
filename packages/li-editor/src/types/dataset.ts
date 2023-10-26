import type { DatasetField, LayerSchema, WidgetSchema } from '@antv/li-sdk';

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

export type AutoCreateSchema = {
  layers: LayerSchema[];
  layerPopup: WidgetSchema;
  bounds?: LayerBounds;
};

export type LayerBounds = [number, number, number, number];
