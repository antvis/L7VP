import type { DefaultOptionType } from 'antd/es/select';
import { isEmpty } from 'lodash-es';
import dayjs from 'dayjs';
import type { OpUnitType } from 'dayjs';
import type { FilterDateOperator, FilterDateValue } from '../../types';
import type { GranularityItem } from './type';

const DateGranularity: Record<string, { format: string; granularity: OpUnitType }> = {
  'YYYY/MM/DD HH:mm:ss': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'second' },
  'YYYY-MM-DD HH:mm:ss': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'second' },
  'YYYY/MM/DD HH:mm': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'second' },
  'YYYY-MM-DD HH:mm': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'second' },
  'YYYY/MM/DD HH': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'hour' },
  'YYYY-MM-DD HH': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'hour' },
  'YYYY/MM/DD': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'day' },
  'YYYY-MM-DD': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'day' },
  'YYYY/MM': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'month' },
  'YYYY-MM': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'month' },
  YYYY: { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'year' },
};

export const DEFAULT_OPTIONS: GranularityItem[] = [
  { value: 'YYYY/MM/DD HH:mm:ss', other: 'YYYY-MM-DD HH:mm:ss', label: '秒', granularity: 'second' },
  { value: 'YYYY/MM/DD HH:mm', other: 'YYYY-MM-DD HH:mm', label: '分钟', granularity: 'minute' },
  { value: 'YYYY/MM/DD HH', other: 'YYYY-MM-DD HH', label: '小时', granularity: 'hour' },
  { value: 'YYYY/MM/DD', other: 'YYYY-MM-DD', label: '日', picker: 'date', granularity: 'day' },
  { value: 'YYYY/MM', other: 'YYYY-MM', label: '月', picker: 'month', granularity: 'month' },
  { value: 'YYYY', other: 'YYYY', label: '年', picker: 'year', granularity: 'year' },
];

export const getOptions = (format?: string): DefaultOptionType[] => {
  if (!format) {
    return DEFAULT_OPTIONS.map((item) => ({
      label: item.label,
      value: item.value,
      picker: item.picker,
      granularity: item.granularity,
    }));
  }

  const isDiagonalLineSplit = format.indexOf('/') !== -1;
  const options = DEFAULT_OPTIONS.map((item) => ({
    label: item.label,
    value: isDiagonalLineSplit ? item.value : item.other,
    picker: item.picker,
    granularity: item.granularity,
  }));

  const formatIndex = DEFAULT_OPTIONS.findIndex((item) => item.value === format || item.other === format);

  if (!isEmpty(formatIndex)) {
    return options;
  }

  return options.slice(formatIndex);
};

// 处理时间到最小粒度
export const getTimeFormat = (
  times: FilterDateValue,
  dateGranularity: string,
  operator: FilterDateOperator,
): FilterDateValue => {
  const _format = DateGranularity[dateGranularity];
  if (!_format) {
    return times;
  }

  if (typeof times === 'string') {
    if (operator === '<') {
      const _item: string = dayjs(times).format(_format.format);
      return _item;
    }

    const _item: string = dayjs(times).endOf(_format.granularity).format(_format.format);
    return _item;
  }

  const _item: [string, string] = [
    dayjs(times[0]).format(_format.format),
    dayjs(times[1]).endOf(_format.granularity).format(_format.format),
  ];

  return _item;
};
