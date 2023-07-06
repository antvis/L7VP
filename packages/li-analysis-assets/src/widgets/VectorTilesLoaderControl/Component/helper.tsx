export type VectorTileType = 'point' | 'line' | 'polygon';

export type ConfigProps = {
  url: string;
  data?: string | [];
  type: VectorTileType;
  featureId: string;
  sourceLayer: string;
  tileSize: number;
  zoom: { minZoom: number; maxZoom: number };
  zoomOffset: number;
};

export const isValidTileUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-{}]*[a-z\\d{}])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))|' + // validate OR ip (v4) address
      'localhost' + // OR localhost
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+{}]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-{}]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  const tileRegx = /(\{[xX]\}){1}/;
  const tileRegy = /(\{[yY]\}){1}/;
  const tileRegz = /(\{[zZ]\}){1}/;

  return (
    !!urlPattern.test(urlString) &&
    !!tileRegx.test(urlString) &&
    !!tileRegy.test(urlString) &&
    !!tileRegz.test(urlString)
  );
};

export const getLayerConfig = (config: ConfigProps) => {
  const _config = {
    featureId: config.featureId,
    sourceLayer: config.sourceLayer,
    source: {
      data: config.url,
      parser: {
        type: 'mvt',
        tileSize: config?.tileSize ?? 256,
        minZoom: config?.zoom.minZoom ?? 0,
        maxZoom: config?.zoom.maxZoom ?? 14,
        zoomOffset: config.zoomOffset ?? 0,
      },
    },
    opacity: 0.4,
    color: 'green',
    autoFit: true,
    shape: config.type === 'polygon' ? 'fill' : config.type === 'line' ? 'line' : 'circle',
  };

  return _config;
};
