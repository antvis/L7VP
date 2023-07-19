import type GeoJSON from 'geojson';
import { isArray } from 'lodash-es';
//@ts-ignore
import * as wkt from 'wkt';

/**
 * 是否是点坐标字符串
 * @data string "[123,29]"
 * @return boolean
 */
export const isPonitCoordinatesString = (data: string) => {
  // accepts: string start with [ and end with ]
  const isStringArray = /^\[([\s\S]*)\]$/.test(data);
  const isPonitCoordinates = isStringArray && /^\[[0-9\.]{1,},[0-9\.]{1,}\]$/.test(data);
  return isPonitCoordinates;
};

/**
 * 点坐标 转 Geometry
 * @data string "[123,29]"
 * @return GeoJSON.Point { type: 'Point', coordinates: [123,29] }
 */
export const ponitCoordinates2Geometry = (data: string | GeoJSON.Position): GeoJSON.Point => {
  const geometry: GeoJSON.Point = { type: 'Point', coordinates: [] };
  if (typeof data == 'string') {
    try {
      geometry.coordinates = JSON.parse(data);
    } catch (e) {
      // 解析失败
      // 默认忽略掉，设置为空数据
      geometry.coordinates = [];
    }
  } else {
    geometry.coordinates = data;
  }
  return geometry;
};

/**
 * 是否是 wkt
 * @data string "POINT(6 10)","POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))","MULTIPOINT(3.5 5.6, 4.8 10.5)","MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2)),((6 3,9 2,9 4,6 3)))"
 * @return boolean
 */
export const isWkt = (data: string) => {
  // Detecting WKT in text reference: https://en.wikipedia.org/wiki/Well-known_text
  // string start with POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON [Z] ( and end with )
  const regExp = /^(POINT|LINESTRING|POLYGON|MULTIPOINT|MULTILINESTRING|MULTIPOLYGON)(\sz)?\s?\(.*\)$/i;
  let iswktField = false;
  if (typeof data === 'string' && regExp.test(data)) {
    iswktField = true;
  }

  return iswktField;
};

/**
 * wkt 转 geometry
 * @data string "POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))"
 * @return geometry ep:{ type: 'Point', coordinates: [123,29] }
 */
export const wkt2Geometry = (data: string) => {
  let geometry;
  if (typeof data == 'string') {
    try {
      geometry = wkt.parse(data);
    } catch (e) {
      // 解析失败
      // 默认忽略掉，设置为空数据
      geometry = { type: 'Point', coordinates: [] };
    }
  }
  return geometry;
};

/**
 * 是否是字符串 geometry
 * @data string '{ "type": "Point", "coordinates": [123,29] }'
 * @return boolean
 */
export const isGeometryString = (data: string) => {
  // string start with { and end with }
  const isStringObject = /^{([\s\S]*)}$/.test(data);
  const isgeometryField = isStringObject && /type/.test(data) && /coordinates/.test(data);
  return isgeometryField;
};

/**
 * geometry 字符串转 json
 * @data string '{ "type": "Point", "coordinates": [123,29] }'
 * @return GeoJSON { type: 'Point', coordinates: [123,29] }
 */
export const geometryString2Geometry = (data: string) => {
  let geometry;
  if (typeof data == 'string') {
    try {
      geometry = JSON.parse(data);
    } catch (e) {
      // 解析失败
      // 默认忽略掉，设置为空数据
      geometry = { type: 'Point', coordinates: [] };
    }
  }
  return geometry;
};

/**
 * 是否是点坐标(数组或字符串)
 * @data "[123,29]" or [123,29]
 * @return boolean
 */
export const isPonitCoordinates = (data: any): any => {
  let result = false;
  if (typeof data === 'string' && isPonitCoordinatesString(data)) {
    result = true;
  } else if (isArray(data) && data.length === 2) {
    result = true;
  }
  return result;
};

/**
 * 解析带有地理类型的行数据
 */
export const parserDataWithGeo = (data: Record<string, any>[]): Record<string, any>[] => {
  if (!data || data.length === 0) return data;

  const result: Record<string, any>[] = [];
  const fristRow = data[0];
  const convertColumnsMap = new Map<string, (...args: any) => any>();
  for (const key of Object.keys(fristRow)) {
    const value = fristRow[key];
    // 如果是点坐标(数组或字符串)列
    if (isPonitCoordinates(value)) {
      convertColumnsMap.set(key, ponitCoordinates2Geometry);
      // 如果是 wkt 列
    } else if (isWkt(value)) {
      convertColumnsMap.set(key, wkt2Geometry);
      // 如果是字符串 geometry 列
    } else if (isGeometryString(value)) {
      convertColumnsMap.set(key, geometryString2Geometry);
    }
  }

  for (let index = 0; index < data.length; index++) {
    const row = data[index];
    const convertRow: Record<string, any> = {};
    // 变量需要转换的列
    convertColumnsMap.forEach((convert, key) => {
      // 执行数据格式转换
      convertRow[key] = convert(row[key]);
    });
    const resultRow = { ...row, ...convertRow };
    result.push(resultRow);
  }
  return result;
};
