export type CustomMappingColorItem = {
  color: string;
  value: (string | number)[];
  id?: string;
};

export type CustomMappingData = {
  type: 'number' | 'string' | 'custom';
  list: CustomMappingColorItem[];
  unknown?: string;
};

export type SelectType = 'custom' | 'quantize' | 'quantile' | 'cat';

export type SelectorValueType = 'cat' | 'threshold' | 'quantize' | 'quantile';

export type SelectorValue = {
  type: SelectorValueType;
  isCustom: boolean;
  domain?: string[] | number[];
  range?: string[];
  unknown?: string;
};
