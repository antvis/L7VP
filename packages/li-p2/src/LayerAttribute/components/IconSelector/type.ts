export type IconListItem = {
  icon: string;
  title: string;
  value?: string;
  id: string;
};

export type IconItem = {
  title: string;
  icon: string;
};

export type IconOptionsType = { type: string; icons: IconItem[] }[];
