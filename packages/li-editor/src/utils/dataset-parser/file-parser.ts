import type { DatasetSchema } from '@antv/li-sdk';
import { parserCSVToSource, parserExcelToSource, parserGeoJsonToSource, parserJsonToSource } from './data-parser';
import { readFileAsArrayBuffer, readFileAsText } from './read-file';
import { shapefile2geojson } from './shapefile2geojson';

/* 解析文本文件至数据集格式
 * 文本文件有： json geojson csv
 */
export const parserTextFileToSource = async (file: File, name: string, id?: string): Promise<DatasetSchema> => {
  const fileFullName = file.name;
  const fileExtension = fileFullName.substring(fileFullName.lastIndexOf('.') + 1);
  let content: string;

  try {
    content = await readFileAsText(file);
  } catch (e) {
    throw e;
  }

  if (fileExtension === 'json') {
    return parserJsonToSource(content, name, id);
  } else if (fileExtension === 'geojson') {
    return parserGeoJsonToSource(content, name, id);
  } else {
    return parserCSVToSource(content, name, id);
  }
};

/* 解析 excel 文件至数据集格式
 */
export const parserExcelFileToSource = async (file: File, name: string, id?: string): Promise<DatasetSchema> => {
  let content: ArrayBuffer;

  try {
    content = await readFileAsArrayBuffer(file);
  } catch (e) {
    throw e;
  }

  return parserExcelToSource(content, name, id);
};

/* 解析 shapefile 文件至数据集格式
 */
export const parserShapefileToSource = async (files: File[], name: string, id?: string): Promise<DatasetSchema> => {
  const filesType = files.map((file) => {
    const type = file.name.substring(file.name.lastIndexOf('.'));
    return type;
  });

  if (files.length > 1) {
    const shpFiles = ['.shp', '.dbf', '.prj'];
    const lackshpFiles = shpFiles.filter((item) => !filesType.includes(item));
    const isLackFile = lackshpFiles.length >= 1;
    if (isLackFile) {
      const message = `请完整上传 shapefile 文件(缺少 ${lackshpFiles.join('、')} 文件)`;
      return Promise.reject(message);
    }
  } else {
    const message = '请完整上传 shapefile 文件(包括 .shp, .dbf, .prj 文件等)';
    return Promise.reject(message);
  }

  let shpFile: File, dbfFile: File, prjFile: File, cpgFile: File | undefined;
  files.forEach((file) => {
    const type = file.name.slice(-3).toLowerCase();
    if (type === 'shp') {
      shpFile = file;
    } else if (type === 'dbf') {
      dbfFile = file;
    } else if (type === 'prj') {
      prjFile = file;
    } else if (type === 'cpg') {
      cpgFile = file;
    }
  });

  let geoJson: GeoJSON.FeatureCollection;

  try {
    geoJson = (await shapefile2geojson(shpFile!, dbfFile!, prjFile!, cpgFile)).geoJson;
  } catch (e) {
    console.error(e);
    const message = 'shapefile 文件解析失败';
    return Promise.reject(message);
  }

  const result = parserGeoJsonToSource(JSON.stringify(geoJson), name, id);

  return result;
};
