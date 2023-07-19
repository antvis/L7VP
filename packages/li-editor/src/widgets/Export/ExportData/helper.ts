import type { DatasetField, LocalDatasetSchema } from '@antv/li-sdk';
import type { GeometryTypes } from '@turf/turf';
import { omit } from 'lodash-es';
import papaparse from 'papaparse';
import type { WritingOptions } from 'xlsx';
import { utils as XLSX_utils, write as XLSX_write } from 'xlsx';

// 数据转文本格式处理
const getTextFormatData = (list: Record<string, any>[]) => {
  return list.map((item) => {
    const newItem: Record<string, any> = { ...item };
    for (const key in item) {
      newItem[key] = typeof item[key] === 'object' ? JSON.stringify(item[key]) : item[key];
    }
    return newItem;
  });
};

/**
 * json 转 csv
 *  */
export const json2CSV = (jsondata: LocalDatasetSchema) => {
  return papaparse.unparse(getTextFormatData(jsondata.data), {
    newline: '\n',
  });
};
/**
 * json 转 xlsx
 *  */
export const json2xlsx = (jsondata: LocalDatasetSchema) => {
  const changeData = (s: any) => {
    //如果存在ArrayBuffer对象(es6) 最好采用该对象
    if (typeof ArrayBuffer !== 'undefined') {
      //1、创建一个字节长度为s.length的内存区域
      const buf = new ArrayBuffer(s.length);
      //2、创建一个指向buf的Unit8视图，开始于字节0，直到缓冲区的末尾
      const view = new Uint8Array(buf);
      //3、返回指定位置的字符的Unicode编码
      for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    } else {
      const buf = new Array(s.length);
      for (let i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }
  };
  const wopts: WritingOptions = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary',
  };
  const workBook = {
    SheetNames: ['Sheet1'],
    Sheets: {},
    Props: {},
  };

  //@ts-ignore
  workBook.Sheets.Sheet1 = XLSX_utils.json_to_sheet(getTextFormatData(jsondata.data));

  try {
    const blob = new Blob([changeData(XLSX_write(workBook, wopts)) as BlobPart], {
      type: 'application/octet-stream',
    });

    return blob;
  } catch (err) {
    return;
  }
};

/**
 * json 转 geojson
 *  */
export const json2geo = (jsondata: LocalDatasetSchema, type: GeometryTypes, geometry: DatasetField) => {
  const geojson = {
    type: 'FeatureCollection',
    features: jsondata.data.map((item) => ({
      type: 'Feature',
      geometry: item[geometry.name],
      properties: omit(item, geometry.name),
    })),
  };

  return geojson;
};
