export type CustomItemValueType = (string | number)[];

export type CustomItems = {
  color: string;
  value: CustomItemValueType;
  id?: string;
};

export type CustomType = 'string' | 'number';

export type CustomItemType = {
  type: string;
  thresholdType: CustomType;
  list: CustomItems[];
};

export type DatasetType = {
  min?: number;
  max?: number;
  list: { label: string | number; value: (string | number)[]; count: number }[];
};
