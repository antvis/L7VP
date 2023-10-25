import type { SelectType } from './type';

export const CUSTOM = 'custom';

export const DEHAULT_OPTIONS: {
  label: string;
  type: 'number' | 'string';
  value: SelectType;
}[] = [
  {
    label: '等间距',
    value: 'quantize',
    type: 'number',
  },
  {
    label: '等分位',
    value: 'quantile',
    type: 'number',
  },
  {
    label: '枚举',
    value: 'cat',
    type: 'string',
  },
  {
    label: '自定义分类',
    value: 'custom',
    type: 'string',
  },
  {
    label: '自定义分段',
    value: 'custom',
    type: 'number',
  },
];
