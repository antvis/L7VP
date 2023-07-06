import type { DatasetSchema } from '@antv/li-sdk';
import { getDatasetColumns, getUniqueId, parserDataWithGeo } from '@antv/li-sdk';
import papaparse from 'papaparse';
import * as XLSX from 'xlsx';
import { checkIsGeoJson } from './meta-data';

/* 解析 geojson 文件数据至数据集格式
 */
export const parserGeoJsonToSource = (content: string, name: string, id?: string): DatasetSchema => {
  let originData: GeoJSON.FeatureCollection;

  try {
    originData = JSON.parse(content) as GeoJSON.FeatureCollection;
  } catch (e) {
    throw e;
  }

  const formatData = parserDataWithGeo(
    originData.features.map((item) => {
      return {
        ...item.properties,
        _geometry: item.geometry,
      };
    }),
  );

  return {
    id: id || getUniqueId(id),
    metadata: { name },
    data: formatData,
    type: 'local',
    columns: getDatasetColumns(formatData[0]),
  };
};

/**
 * 解析 json 文件数据至数据集格式
 */
export const parserJsonToSource = (content: string, name: string, id?: string): DatasetSchema => {
  let data: Record<string, any>[];

  try {
    data = JSON.parse(content);
  } catch (e) {
    throw e;
  }

  // 兼容 geojson 文件
  if (checkIsGeoJson(data) === 'geojson') {
    return parserGeoJsonToSource(content, name, id);
  }
  const formatData = parserDataWithGeo(data);

  return {
    id: id || getUniqueId(id),
    metadata: { name },
    data: formatData,
    type: 'local',
    columns: getDatasetColumns(formatData[0]),
  };
};

/**
 * 解析 CSV 文件数据至数据集格式
 */
export const parserCSVToSource = (content: string, name: string, id?: string): DatasetSchema => {
  let data: Record<string, any>[];

  try {
    data =
      papaparse.parse<Record<string, any>>(content, { header: true, skipEmptyLines: true, dynamicTyping: true }).data ??
      [];
  } catch (e) {
    throw e;
  }

  const formatData = parserDataWithGeo(data);

  return {
    id: id || getUniqueId(id),
    metadata: { name },
    data: formatData,
    type: 'local',
    columns: getDatasetColumns(formatData[0]),
  };
};

/* 解析 excel 文件数据至数据集格式
 */
export const parserExcelToSource = (content: ArrayBuffer, name: string, id?: string): DatasetSchema => {
  let data: Record<string, any>[];

  try {
    const workbook = XLSX.read(content, { type: 'array', cellDates: true });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // 日期格式直接处理为字符串
    Object.keys(sheet).forEach((key) => {
      const item = sheet[key];
      if (item.t === 'd') {
        item.v = item.w;
      }
    });

    // 默认只解析第一个工作簿
    data = XLSX.utils.sheet_to_json<Record<string, any>>(sheet);
  } catch (e) {
    throw e;
  }

  const formatData = parserDataWithGeo(data);

  return {
    id: id || getUniqueId(id),
    metadata: { name },
    data: formatData,
    type: 'local',
    columns: getDatasetColumns(formatData[0]),
  };
};
