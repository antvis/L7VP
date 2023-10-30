import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { isValidCell } from 'h3-js';
import type { DatasetField } from '../../specs';

dayjs.extend(customParseFormat);

const SupportGeometryType = ['Point', 'MultiPoint', 'LineString', 'MultiLineString', 'Polygon', 'MultiPolygon'];

const isDateField = (value: string) => {
  // '1970-01-01 00:00:00'
  if (dayjs(value, 'YYYY-MM-DD HH:mm:ss', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY-MM-DD HH:mm:ss',
    };
  }
  // '1970/01/01 00:00:00'
  if (dayjs(value, 'YYYY/MM/DD HH:mm:ss', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY/MM/DD HH:mm:ss',
    };
  }
  // '1970-01-01'
  if (dayjs(value, 'YYYY-MM-DD', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY-MM-DD',
    };
  }
  // '1970/01/01'
  if (dayjs(value, 'YYYY/MM/DD', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY/MM/DD',
    };
  }
  // '1970-01'
  if (dayjs(value, 'YYYY-MM', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY-MM',
    };
  }
  // '1970/01'
  if (dayjs(value, 'YYYY/MM', true).isValid()) {
    return {
      type: 'date',
      format: 'YYYY/MM',
    };
  }

  return false;
};

const isNumberField = (value: string | number) => {
  return typeof value === 'number' || (/^(-?\d+)(\.\d+)?$/.test(String(value)) && !Number.isNaN(+value));
};

const isBooleanField = (value: string) => {
  return /^(true|false)$/.test(value);
};

const isGeoJsonGeometryObject = (value: Record<string, any>) => {
  return (
    value.hasOwnProperty('type') &&
    value.hasOwnProperty('coordinates') &&
    Array.isArray(value.coordinates) &&
    SupportGeometryType.includes(value.type)
  );
};

const isGeoField = (value: Record<string, any>) => {
  return isGeoJsonGeometryObject(value);
};

const findFirstNonNullOrUndefinedValue = (data: Record<string, any>[], key: string, sampleCount = 50) => {
  const numberOfRows = data.length;
  const sampleStep = Math.max(Math.floor(numberOfRows / sampleCount), 1);

  for (let i = 0; i < numberOfRows; i += sampleStep) {
    if (data[i][key] !== null && data[i][key] !== undefined) {
      return data[i][key];
    }
  }

  return null;
};

/**
 *  获取数据集表头元数据信息
 */
export const getDatasetColumns = (data: Record<string, any>[]) => {
  if (data.length === 0) return [];

  const fields = Object.keys(data[0]);
  const columns: DatasetField[] = [];

  fields.forEach((key) => {
    const value = findFirstNonNullOrUndefinedValue(data, key);
    if (value === null) {
      // 值不存在的情况，忽略掉列头
    } else if (typeof value === 'number') {
      columns.push({
        type: 'number',
        name: key,
      });
    } else if (typeof value === 'boolean') {
      columns.push({
        type: 'boolean',
        name: key,
      });
    } else if (typeof value === 'string') {
      const dateField = isDateField(value);
      if (dateField) {
        columns.push({
          type: 'date',
          name: key,
          format: dateField.format,
        });
      } else if (isValidCell(value)) {
        columns.push({
          type: 'h3',
          name: key,
        });
      } else {
        columns.push({
          type: 'string',
          name: key,
        });
      }
    } else if (typeof value === 'object') {
      if (value && isGeoField(value)) {
        columns.push({
          type: 'geo',
          name: key,
        });
      } else {
        columns.push({
          type: 'string',
          name: key,
        });
      }
    }
  });

  return columns;
};
