export type XYZTilesetConfig = {
  name: string;
  url: string;
  zoom: { minZoom?: number; maxZoom?: number };
};

export type MVTTilesetConfig = {
  name: string;
  url: string;
  metadataUrl: string;
  zoom: { minZoom?: number; maxZoom?: number };
};
