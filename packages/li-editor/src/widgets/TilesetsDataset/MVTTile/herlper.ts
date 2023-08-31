import { PMTiles, TileType } from 'pmtiles';

export const getPMTilesMetadata = async (pmtilesUrl: string) => {
  const pmtiles = new PMTiles(pmtilesUrl);

  const header = await pmtiles.getHeader();
  if (header.tileType !== TileType.Mvt) {
    return Promise.reject(new Error('Not a MVT vector tiles'));
  }

  const metadata = await pmtiles.getMetadata();

  return metadata;
};
