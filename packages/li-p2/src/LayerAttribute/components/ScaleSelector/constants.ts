import type { ColorScaleSelectOptionType } from './index';

export const DEHAULT_OPTIONS: ColorScaleSelectOptionType[] = [
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
    label: '自定义',
    value: 'custom',
    type: 'custom',
  },
];
