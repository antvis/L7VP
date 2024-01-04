export type CustomMappingColorItem = {
  color: string;
  value: number[];
  id?: string;
};

export type CustomMappingData = {
  type: 'cat' | 'custom' | 'linear';
  list: CustomMappingColorItem[];
};

export type SelectorValueType = 'cat' | 'quantize' | 'linear' | 'custom';

export type SelectorValue = {
  type: SelectorValueType;
  positions?: number[];
  colors?: string[];
};
