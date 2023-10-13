import type { Granularity } from '../../types';

type Picker = 'year' | 'month' | 'date';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: Picker;
  other?: string;
};
