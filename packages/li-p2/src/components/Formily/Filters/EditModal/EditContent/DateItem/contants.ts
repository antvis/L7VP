import type { OpUnitType } from 'dayjs';
import dayjs from 'dayjs';
import type { GranularityItem } from './type';

export const DEFAULT_OPTIONS: (GranularityItem & { other: string; otherLabel: string })[] = [
  {
    label: `秒（${dayjs().format('YYYY-MM-DD HH:mm:ss')}）`,
    value: 'YYYY-MM-DD HH:mm:ss',
    other: 'YYYY/MM/DD HH:mm:ss',
    otherLabel: `秒（${dayjs().format('YYYY/MM/DD HH:mm:ss')}）`,
    granularity: 'second',
  },
  {
    label: `分钟（${dayjs().format('YYYY-MM-DD HH:mm')}）`,
    value: 'YYYY-MM-DD HH:mm',
    other: 'YYYY/MM/DD HH:mm',
    otherLabel: `分钟（${dayjs().format('YYYY/MM/DD HH:mm')}）`,
    granularity: 'second',
  },
  {
    label: `小时（${dayjs().format('YYYY-MM-DD HH')}）`,
    value: 'YYYY-MM-DD HH',
    other: 'YYYY/MM/DD HH',
    otherLabel: `小时（${dayjs().format('YYYY/MM/DD HH')}）`,
    granularity: 'hour',
  },
  {
    label: `日（${dayjs().format('YYYY-MM-DD')}）`,
    value: 'YYYY-MM-DD',
    other: 'YYYY/MM/DD',
    otherLabel: `日（${dayjs().format('YYYY/MM/DD')}）`,
    granularity: 'day',
    picker: 'date',
  },
  {
    label: `月（${dayjs().format('YYYY-MM')}）`,
    value: 'YYYY-MM',
    other: 'YYYY/MM',
    otherLabel: `月（${dayjs().format('YYYY/MM')}）`,
    granularity: 'month',
    picker: 'month',
  },
  {
    label: `年（${dayjs().format('YYYY')}）`,
    value: 'YYYY',
    other: 'YYYY',
    otherLabel: `年（${dayjs().format('YYYY')}）`,
    granularity: 'year',
    picker: 'year',
  },
];

export const DateGranularity: Record<string, { format: string; granularity: OpUnitType }> = {
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
