import type { DatasetField } from '@antv/li-sdk';
import type { FieldPair } from '../types';

const POINT_FIELDS: [string, string][] = [
  ['lat', 'lng'],
  ['lat', 'lon'],
  ['lat', 'long'],
  ['latitude', 'longitude'],
  ['纬度', '经度'],
];
const ALTITUDE_FIELDS = ['alt', 'altitude', '海拔'];

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

      const trimName = fieldName.replace(re, '').trim();

      fieldPairs.push({
        defaultName: trimName || 'point',
        pair: {
          lat: {
            fieldIdx: idx,
            value: fields[idx].name,
          },
          lng: {
            fieldIdx: lngIdx,
            value: fields[lngIdx].name,
          },
          ...(altIdx !== -1
            ? {
                alt: {
                  fieldIdx: altIdx,
                  value: fields[altIdx].name,
                },
              }
            : {}),
        },
        suffix: suffixPair,
      });
    }
  }

  return fieldPairs;
};
