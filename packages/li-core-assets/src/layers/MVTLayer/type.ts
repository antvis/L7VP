export type MVTLayerSource = {
  data: string;
  parser: {
    type: 'mvt';
    metadataUrl: string;
    minZoom?: number;
    maxZoom?: number;
  };
};

export type Tilestats = {
  layerCount: number;
  layers: TilestatsLayer[];
};

type TilestatsLayer = {
  layer: string;
  count: number;
  geometry: 'Polygon' | 'LineString' | 'Point';
  attributeCount: number;
  attributes: Attribute[];
};

type Attribute = {
  attribute: string;
  count: number;
  type: 'string' | 'number';
  values: (number | string)[];
  min?: number;
  max?: number;
};

export type VectorLayer = {
  id: string;
  description?: string;
  minzoom?: number;
  maxzoom?: number;
  fields: Record<string, 'Number' | 'String'>;
};

export type MVTMetadata = {
  name: string;
  description: string;
  version: number;
  minzoom: number;
  maxzoom: number;
  center: string;
  bounds: string;
  type: string;
  format: string;
  json: string;
  tilestats: Tilestats;
  vector_layers: VectorLayer[];
};
