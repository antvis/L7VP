import * as shapefile from 'shapefile';
import { readFileAsArrayBuffer, readFileAsText } from './read-file';

export const shapefile2geojson = async (shp: File, dbf: File, prj: File, cpg?: File) => {
  let wkt: string;
  try {
    const [_shp, _dbf, _prj, _cpg] = await Promise.all([
      readFileAsArrayBuffer(shp),
      readFileAsArrayBuffer(dbf),
      readFileAsText(prj),
      cpg && readFileAsText(cpg),
    ]);
    wkt = _prj;
    const geoJson = await shapefile.read(_shp, _dbf, { encoding: _cpg || 'UTF-8' });
    return { geoJson, wkt };
  } catch (error) {
    return Promise.reject(error);
  }
};
