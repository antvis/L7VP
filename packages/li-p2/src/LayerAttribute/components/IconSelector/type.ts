export type IconListItem = {
  id: string;
  value?: string;
  imageId: string;
  image: string;
};

export type IconItem = {
  id: string;
  name: string;
  image: string;
};

export type IconOptionsType = { type: string; icons: IconItem[] }[];
