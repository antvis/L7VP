import type { DatasetField } from '../specs';

export const DATASET_FIELD_TYPE_MAP: Record<DatasetField['type'], { type: string; value: string; color: string }> = {
  string: { type: 'string', value: '文本', color: 'green' },
  number: { type: 'number', value: '数值', color: 'gold' },
  boolean: { type: 'boolean', value: '布尔', color: 'blue' },
  geo: { type: 'geo', value: '地理', color: 'cyan' },
  h3: { type: 'h3', value: 'h3', color: 'magenta' },
  date: { type: 'date', value: '日期', color: 'geekblue' },
};
