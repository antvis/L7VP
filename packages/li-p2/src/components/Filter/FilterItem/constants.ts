import type { FilterDateOperator, FilterNumberOperator, FilterStringOperator } from '../types';

export const StringOperatorsOption: { value: FilterStringOperator; label: string }[] = [
  { value: 'IN', label: '等于' },
  { value: 'NOT_IN', label: '不等于' },
  { value: 'LIKE', label: '包含关键字' },
  { value: 'NOT_LIKE', label: '不包含关键字' },
];

export const NumberOperatorsOption: { value: FilterNumberOperator; label: string }[] = [
  { label: '大于', value: '>' },
  { label: '大于等于', value: '>=' },
  { label: '等于', value: '=' },
  { label: '小于', value: '<' },
  { label: '小于等于', value: '<=' },
  { label: '介于', value: 'BETWEEN' },
];

export const DateOperatorsOption: { value: FilterDateOperator; label: string }[] = [
  { label: '大于', value: '>' },
  { label: '小于', value: '<' },
  { label: '介于', value: 'BETWEEN' },
];
