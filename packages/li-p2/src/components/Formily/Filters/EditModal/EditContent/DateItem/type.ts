type Granularity = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

type PickerType = 'year' | 'month' | 'date';

export type GranularityItem = {
  label: string;
  value: string;
  granularity: Granularity;
  picker?: PickerType;
};
