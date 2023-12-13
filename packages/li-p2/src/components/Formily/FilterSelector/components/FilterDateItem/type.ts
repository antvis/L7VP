export type Granularity = 'second' | 'minute' | 'hour' | 'date' | 'month' | 'year';

type PickerType = 'year' | 'month' | 'date';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: PickerType;
};
