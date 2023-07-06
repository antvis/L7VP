import type { OpUnitType } from 'dayjs';
import dayjs from 'dayjs';
import { isEmpty, maxBy, minBy } from 'lodash-es';
import type { Selection } from './types';

export const formatXAxis = (data: string | number, isTimeField: boolean, format: string) => {
  if (isTimeField) {
    if (dayjs(data, format).isValid()) {
      return dayjs(data).format(format);
    }
    return dayjs(data).format('YYYY');
  }

  return data;
};

export const getFormatData = (data: Record<string, any>[], field: string, isTimeField: boolean, format: string) => {
  const newData = data
    .filter((item) => !isEmpty(item[field]))
    .map((item) => {
      return {
        ...item,
        [field]: formatXAxis(item[field], isTimeField, format),
      };
    })
    .sort(function (a, b) {
      return new Date(a[field]).getTime() - new Date(b[field]).getTime();
    });

  return newData;
};

export const getInitTimeRange = (times: string[]) => {
  const dataIndex = Math.ceil(times.length * 0.2);
  const timeRange: Selection = [times[0], times[dataIndex]];

  return timeRange;
};

export const getTimeInterval = (times: string[]): [string, string] | [number, number] => {
  const max = maxBy(times, function (item) {
    return new Date(item).getTime();
  })!;

  const min = minBy(times, function (item) {
    return new Date(item).getTime();
  })!;

  return [min, max];
};

export const getFormatDefaultSelection = (defaultSelection: Selection, isTimeField: boolean, format: string) => {
  const formatedDefaultSelection = defaultSelection.map((item) => formatXAxis(item, isTimeField, format)) as Selection;

  return formatedDefaultSelection;
};

const DateGranularity: Record<string, { format: string; granularity: OpUnitType }> = {
  'YYYY/MM/DD HH:mm:ss': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'second' },
  'YYYY-MM-DD HH:mm:ss': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'second' },
  'YYYY/MM/DD HH': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'hour' },
  'YYYY-MM-DD HH': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'hour' },
  'YYYY/MM/DD': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'day' },
  'YYYY-MM-DD': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'day' },
  'YYYY/MM': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'month' },
  'YYYY-MM': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'month' },
  YYYY: { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'year' },
};

export const getTimeFormat = (
  times: [string, string] | [number, number],
  dateGranularity: string,
): [string, string] | [number, number] => {
  const _format = DateGranularity[dateGranularity];
  if (!_format) {
    return times;
  }
  const _item: [string, string] = [
    dayjs(times[0]).format(_format.format),
    dayjs(times[1]).endOf(_format.granularity).format(_format.format),
  ];

  return _item;
};
