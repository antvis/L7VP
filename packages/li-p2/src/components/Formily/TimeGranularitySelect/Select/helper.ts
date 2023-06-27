import type { DefaultOptionType } from 'antd/es/select';
import { isEmpty } from 'lodash-es';

export const DEFAULT_OPTIONS = [
  { lavel: 'YYYY/MM/DD HH:mm:ss', value: 'YYYY/MM/DD HH:mm:ss', other: 'YYYY-MM-DD HH:mm:ss' },
  { lavel: 'YYYY/MM/DD HH', value: 'YYYY/MM/DD HH', other: 'YYYY-MM-DD HH' },
  { lavel: 'YYYY/MM/DD', value: 'YYYY/MM/DD', other: 'YYYY-MM-DD' },
  { lavel: 'YYYY/MM', value: 'YYYY/MM', other: 'YYYY-MM' },
  { lavel: 'YYYY', value: 'YYYY', other: 'YYYY' },
];

export const getOptions = (format?: string): DefaultOptionType[] => {
  if (!format) {
    return DEFAULT_OPTIONS.map((item) => ({ label: item.lavel, value: item.value }));
  }

  const isDiagonalLineSplit = format.indexOf('/') !== -1;
  const options = DEFAULT_OPTIONS.map((item) => ({
    label: isDiagonalLineSplit ? item.value : item.other,
    value: isDiagonalLineSplit ? item.value : item.other,
  }));

  const formatIndex = DEFAULT_OPTIONS.findIndex((item) => item.value === format || item.other === format);

  if (!isEmpty(formatIndex)) {
    return options;
  }

  return options.slice(formatIndex);
};
