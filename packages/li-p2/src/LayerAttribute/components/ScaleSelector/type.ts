export type CustomMappingColorItem = {
  color: string;
  value: (string | number)[];
  id?: string;
};

export type CustomMappingData = {
  type: 'number' | 'string';
  list: CustomMappingColorItem[];
};

export type SelectType = 'custom' | 'quantize' | 'quantile' | 'cat';

export type SelectorValueType = 'cat' | 'threshold' | 'quantize' | 'quantile';

export type SelectorValue = {
  type: SelectorValueType;
  domain?: string[] | number[];
  range?: string[];
  isCustom?: boolean;
};
