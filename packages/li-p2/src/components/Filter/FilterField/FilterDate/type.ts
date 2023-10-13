type Picker = 'year' | 'month' | 'date';
export type Granularity = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: Picker;
  other?: string;
};
