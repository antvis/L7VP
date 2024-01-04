import type { SelectorValueType } from './type';

export const DEHAULT_OPTIONS: {
  label: string;
  value: SelectorValueType;
}[] = [
  {
    label: '等间距',
    value: 'quantize',
  },
  {
    label: '枚举',
    value: 'cat',
  },
  {
    label: '线性连续',
    value: 'linear',
  },
  {
    label: '自定义分类',
    value: 'custom',
  },
];
