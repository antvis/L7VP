export type CustomItemValueType = (string | number)[];

export type CustomItemType = {
  color: string;
  value: CustomItemValueType;
  id?: string;
};

export type CustomType = 'customCat' | 'customArray';
