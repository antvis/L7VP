export type CustomItemValueType = (string | number | null)[];

export type CustomItems = {
  color: string;
  value: CustomItemValueType;
  id?: string;
};

export type CustomType = 'string' | 'number';

export type CustomItemType = {
  type: string;
  list: CustomItems[];
};

export type SelectType = 'custom' | 'quantize' | 'quantile' | 'cat';

export type SelectorValueType = 'cat' | 'threshold' | 'quantize' | 'quantile';
export type SelectorValue = {
  type: SelectorValueType;
  domain?: (string | number)[];
  ranges?: string[];
};
