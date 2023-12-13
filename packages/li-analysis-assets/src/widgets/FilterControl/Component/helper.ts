import type { OpUnitType } from 'dayjs';
import dayjs from 'dayjs';

export type Granularity = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

type PickerType = 'year' | 'month' | 'date';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: PickerType;
};

export const DEFAULT_OPTIONS: (GranularityItem & { other: string; otherLabel: string })[] = [
  {
    label: '秒',
    value: 'YYYY-MM-DD HH:mm:ss',
    other: 'YYYY/MM/DD HH:mm:ss',
    otherLabel: '秒',
    granularity: 'second',
  },
  {
    label: '分钟',
    value: 'YYYY-MM-DD HH:mm',
    other: 'YYYY/MM/DD HH:mm',
    otherLabel: '分钟',
    granularity: 'second',
  },
  {
    label: '小时',
    value: 'YYYY-MM-DD HH',
    other: 'YYYY/MM/DD HH',
    otherLabel: '小时',
    granularity: 'hour',
  },
  {
    label: '日',
    value: 'YYYY-MM-DD',
    other: 'YYYY/MM/DD',
    otherLabel: '日',
    granularity: 'date',
    picker: 'date',
  },
  {
    label: '月',
    value: 'YYYY-MM',
    other: 'YYYY/MM',
    otherLabel: '月',
    granularity: 'month',
    picker: 'month',
  },
  {
    label: '年',
    value: 'YYYY',
    other: 'YYYY',
    otherLabel: '年',
    granularity: 'year',
    picker: 'year',
  },
];

export const DateGranularity: Record<string, { format: string; granularity: OpUnitType }> = {
  'YYYY/MM/DD HH:mm:ss': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'second' },
  'YYYY-MM-DD HH:mm:ss': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'second' },
  'YYYY/MM/DD HH:mm': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'minute' },
  'YYYY-MM-DD HH:mm': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'minute' },
  'YYYY/MM/DD HH': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'hour' },
  'YYYY-MM-DD HH': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'hour' },
  'YYYY/MM/DD': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'day' },
  'YYYY-MM-DD': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'day' },
  'YYYY/MM': { format: 'YYYY/MM/DD HH:mm:ss', granularity: 'month' },
  'YYYY-MM': { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'month' },
  YYYY: { format: 'YYYY-MM-DD HH:mm:ss', granularity: 'year' },
};

export const getOptions = (domain: string[], disabled: boolean) => {
  const _options = domain.map((item) => ({ label: item, value: item, disabled }));

  return [{ label: '全部', value: 'all' }, ..._options];
};

export const getTimeFormat = (
  times: [string, string] | string,
  dateGranularity: string,
): [string, string] | undefined => {
  const _format = DateGranularity[dateGranularity];
  const _times =
    typeof times === 'string'
      ? dayjs(times).format(dateGranularity)
      : [dayjs(times[0]).format(dateGranularity), dayjs(times[1]).format(dateGranularity)];

  if (!_format) {
    return undefined;
  }

  if (typeof _times === 'string') {
    const _timer: [string, string] = [
      dayjs(_times).format(_format.format),
      dayjs(_times).endOf(_format.granularity).format(_format.format),
    ];

    return _timer;
  }

  const _item: [string, string] = [
    dayjs(_times[0]).format(_format.format),
    dayjs(_times[1]).endOf(_format.granularity).format(_format.format),
  ];

  return _item;
};

export const getGranularityOptions = (format: string) => {
  const isDiagonalLineSplit = format.indexOf('/') === -1;
  const options = DEFAULT_OPTIONS.map((item) => ({
    picker: item.picker,
    granularity: item.granularity,
    label: isDiagonalLineSplit ? item.label : item.otherLabel,
    value: isDiagonalLineSplit ? item.value : item.other,
    key: isDiagonalLineSplit ? item.value : item.other,
  }));

  return options;
};
