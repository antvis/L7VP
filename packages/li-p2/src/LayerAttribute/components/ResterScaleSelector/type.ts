export type CustomMappingColorItem = {
  color: string;
  value: number[];
  id?: string;
};

export type CustomMappingData = {
  type: 'cat' | 'custom';
  list: CustomMappingColorItem[];
};

export type SelectorValueType = 'cat' | 'quantize' | 'custom';

export type SelectorValue = {
  type: SelectorValueType;
  positions?: number[];
  colors?: string[];
};
