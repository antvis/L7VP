import type { Granularity } from '../../../type';
type PickerType = 'year' | 'month' | 'date';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: PickerType;
};
