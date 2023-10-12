type Picker = 'year' | 'month' | 'date';
export type Granularity = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

export type GranularityItem = {
  label: string;
  value: string;
  picker?: Picker;
  other?: string;
  granularity?: Granularity;
};
