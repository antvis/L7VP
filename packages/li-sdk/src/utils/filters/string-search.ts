// 模糊匹配
export function stringSearch(filterValues: string[], value: string, params: Record<string, unknown> = {}) {
  const normalizedFeatureValue = normalize(value, params);
  const stringRegExp = params.useRegExp
    ? filterValues
    : filterValues.map((filterValue) => {
        let _stringRegExp = escapeRegExp(normalize(filterValue, params));

        if (params.mustStart) _stringRegExp = `^${_stringRegExp}`;
        if (params.mustEnd) _stringRegExp = `${_stringRegExp}$`;

        return _stringRegExp;
      });

  const regex = new RegExp(stringRegExp.join('|'), params.caseSensitive ? 'g' : 'gi');
  return !!normalizedFeatureValue.match(regex);
}

const specialCharRegExp = /[.*+?^${}()|[\]\\]/g;
const normalizeRegExp = /\p{Diacritic}/gu;

function escapeRegExp(value: string) {
  return value.replace(specialCharRegExp, '\\$&');
}

function normalize(data: string, params: Record<string, unknown>) {
  let normalizedData = String(data);
  if (!params.keepSpecialCharacters) normalizedData = normalizedData.normalize('NFD').replace(normalizeRegExp, '');

  return normalizedData;
}
