import dayjs from 'dayjs';

export const GranularityOptions = [
  { label: `秒（${dayjs().format('YYYY-MM-DD HH:mm:ss')}）`, value: 'YYYY-MM-DD HH:mm:ss' },
  { label: `分钟（${dayjs().format('YYYY-MM-DD HH:mm')}）`, value: 'YYYY-MM-DD HH:mm' },
  { label: `小时（${dayjs().format('YYYY-MM-DD HH')}）`, value: 'YYYY-MM-DD HH' },
  { label: `日（${dayjs().format('YYYY-MM-DD')}）`, value: 'YYYY-MM-DD' },
  { label: `月（${dayjs().format('YYYY-MM')}）`, value: 'YYYY-MM' },
  { label: `年（${dayjs().format('YYYY')}）`, value: 'YYYY' },
];
