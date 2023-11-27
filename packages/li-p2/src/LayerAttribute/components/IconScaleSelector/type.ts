export type IconItem = {
  id: string;
  name: string;
  url: string;
};

export type IconList = { type: string; icons: IconItem[] }[];

export type IconScaleSelectorValue = {
  domain: string[];
  range: string[];
  unknown: string;
};

export type CustomMappingDataItem = {
  id: string;
  name: string;
  url: string;
  value: string;
};
