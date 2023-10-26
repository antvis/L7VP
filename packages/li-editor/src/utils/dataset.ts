import type { DatasetField } from '@antv/li-sdk';
import { bbox, feature } from '@turf/turf';
import type { LineString, MultiLineString, MultiPoint, MultiPolygon, Point, Polygon } from 'geojson';
import { isEmpty } from 'lodash-es';
import { ALTITUDE_FIELDS, POINT_FIELDS } from '../constants';
import type { EditorDataset } from '../services/editor-dataset-manager';
import type { FieldPair, GeoField, LayerBounds } from '../types';

const SpecialCharacterSet = `[#_&@\\.\\-\\ ]`;

function foundMatchingFields(re: RegExp, suffixPair: [string, string], allNames: string[], fieldName: string) {
  const lngName = fieldName.replace(re, (match) => match.replace(suffixPair[0], suffixPair[1]));
  const lngIdx = allNames.findIndex((d) => d === lngName);

  let altIdx = -1;

  // 如果纬度找到，继续查找高度字段
  if (lngIdx !== -1) {
    ALTITUDE_FIELDS.some((alt) => {
      const altName = fieldName.replace(re, (match) => match.replace(suffixPair[0], alt));
      altIdx = allNames.findIndex((d) => d === altName);
      return altIdx > -1;
    });
  }
  return { lngIdx, altIdx };
}

/**
 * 从字段中查找经纬度点数据的字段
 * @param fields DatasetField[]
 * @returns fieldPairs
 */
export const getPointFieldPairs = (fields: DatasetField[]) => {
  const allFieldNames = fields.map((item) => item.name.toLowerCase());
  const fieldPairs: FieldPair[] = [];

  for (let idx = 0; idx < allFieldNames.length; idx++) {
    const fieldName = allFieldNames[idx];

    for (let index = 0; index < POINT_FIELDS.length; index++) {
      const suffixPair = POINT_FIELDS[index];

      // copy form https://github.com/keplergl/kepler.gl/blob/master/src/table/src/kepler-table.ts#L520
      // 先匹配第一个字段
      // (^|[#_&@\.\-\ ])lat([#_&@\.\-\ ]|$)
      const re = new RegExp(`(^|${SpecialCharacterSet})${suffixPair[0]}(${SpecialCharacterSet}|$)`);

      if (!re.test(fieldName)) continue;

      const { lngIdx, altIdx } = foundMatchingFields(re, suffixPair, allFieldNames, fieldName);

      if (lngIdx === -1) continue;

      fieldPairs.push({
        type: 'Point',
        displayName: fields[idx].displayName || fieldName,
        pair: {
          lat: fields[idx].name,
          lng: fields[lngIdx].name,
          ...(altIdx !== -1
            ? {
                alt: fields[altIdx].name,
              }
            : {}),
        },
      });
    }
  }

  return fieldPairs;
};

/**
 * 从字段中查找地理数据的字段
 * @param fields DatasetField[]
 * @returns geoFields
 */
export const getGeoFields = (fields: DatasetField[], data: Record<string, any>[]) => {
  if (data.length === 0) return [];
  const simpleRecord = data[0];

  const typeMap: Record<string, GeoField['geoType']> = {
    Point: 'Point',
    MultiPoint: 'Point',
    LineString: 'Line',
    MultiLineString: 'Line',
    Polygon: 'Polygon',
    MultiPolygon: 'Polygon',
  };

  const geoFields: GeoField[] = [];

  for (let index = 0; index < fields.length; index++) {
    const field = fields[index];

    if (field.type !== 'geo') continue;
    const geoJsonGeometryType = simpleRecord[field.name]?.type;
    if (isEmpty(geoJsonGeometryType)) continue;
    const geoType = typeMap[geoJsonGeometryType];
    if (isEmpty(geoJsonGeometryType)) continue;

    geoFields.push({ ...field, geoType: geoType });
  }

  return geoFields;
};

/**
 * 不合适做颜色字段的名称
 * - 数值的 ID 名称
 * - 数值的地理名称
 */
const EXCLUDED_DEFAULT_FIELDS = [
  // Serial numbers and identification numbers
  '_id',
  'id',
  'index',
  'uuid',
  'guid',
  'uid',
  'gid',
  'serial',
  // Geographic IDs are unlikely to be interesting to color
  'zip',
  'code',
  'post',
  'region',
  'fips',
  'cbgs',
  'h3',
  's2',
  // Geographic coords (but not z/elevation/altitude
  // since that might be a metric)
  'lat',
  'lon',
  'lng',
  'latitude',
  'longitude',
  '_x',
  '_y',
];

/**
 * 度量字段名称，按优先级顺序排列
 */
const METRIC_DEFAULT_FIELDS = [
  'metric',
  'value',
  'sum',
  'count',
  'unique',
  'mean',
  'mode',
  'median',
  'max',
  'min',
  'deviation',
  'variance',
  '数量',
  '价格',
  // 不太常用的缩写
  'cnt',
  'val',
];

/**
 * 从字段中通过名称找出合适的颜色字段，给图层颜色映射使用
 */
export const getDefaultColorField = (dataset: EditorDataset) => {
  const { columns, fieldPairs } = dataset;
  const ptFields = fieldPairs.map((fieldPair) => Object.values(fieldPair.pair)).flat();

  // copy form https://github.com/keplergl/kepler.gl/blob/master/src/table/src/kepler-utils.ts#L166
  const fieldsWithoutExcluded = columns.filter((field) => {
    if (field.type !== 'number') {
      // Only select numeric fields.
      return false;
    }
    if (ptFields.includes(field.name)) {
      // Do not permit lat, lon fields
      return false;
    }

    const normalizedFieldName = field.name.toLowerCase();
    if (normalizedFieldName === '') {
      // Special case excluded name when the name is blank.
      return false;
    }
    const hasExcluded = EXCLUDED_DEFAULT_FIELDS.find(
      (f) => normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f),
    );
    if (hasExcluded) {
      const hasInclusion = METRIC_DEFAULT_FIELDS.find(
        (f) => normalizedFieldName.startsWith(f) || normalizedFieldName.endsWith(f),
      );
      return hasInclusion;
    }

    return true;
  });

  const sortedFields = fieldsWithoutExcluded.sort((left, right) => {
    const normalizedLeft = left.name.toLowerCase();
    const normalizedRight = right.name.toLowerCase();
    const leftHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(
      (f) => normalizedLeft.startsWith(f) || normalizedLeft.endsWith(f),
    );
    const rightHasInclusion = METRIC_DEFAULT_FIELDS.findIndex(
      (f) => normalizedRight.startsWith(f) || normalizedRight.endsWith(f),
    );
    if (leftHasInclusion !== rightHasInclusion) {
      if (leftHasInclusion === -1) {
        // Elements that do not have the inclusion list should go after those that do.
        return 1;
      } else if (rightHasInclusion === -1) {
        // Elements that do have the inclusion list should go before those that don't.
        return -1;
      }
      // Compare based on order in the inclusion list
      return leftHasInclusion - rightHasInclusion;
    }

    // Finally, order based on the order in the datasets columns
    return 0;
  });

  if (sortedFields.length) {
    // There was a best match
    return sortedFields[0];
  }
  // No matches
  return undefined;
};

/**
 * 获取经纬度数据范围
 */
export function getLatLngBounds(points: number[][]): LayerBounds | null {
  const lngs = points
    .map((d) => Number(Array.isArray(d)) && d[0])
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  if (!lngs.length) return null;

  const lats = points
    .map((d) => Number(Array.isArray(d)) && d[1])
    .filter(Number.isFinite)
    .sort((a, b) => a - b);

  if (!lats.length) return null;

  const lngBounds = [Math.max(lngs[0], -180), Math.min(lngs[lngs.length - 1], 180)];
  const latBounds = [Math.max(lats[0], -90), Math.min(lats[lats.length - 1], 90)];

  return [lngBounds[0], latBounds[0], lngBounds[1], latBounds[1]];
}

type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;

/**
 * 获取 features 数据范围
 */
export const getGeometrysBounds = (geometrys: Geometry[]): LayerBounds | null => {
  const nonEmptyFeatures = geometrys.filter((d) => d && d.coordinates && d.coordinates.length).map((g) => feature(g));

  try {
    return bbox({
      type: 'FeatureCollection',
      features: nonEmptyFeatures,
    }) as LayerBounds;
  } catch (e) {
    return null;
  }
};
