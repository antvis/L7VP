export type HotCities = { adcode: string; name: string; level: string };

export type ICity = {
  lng: number;
  lat: number;
  childrenNum: number;
  parent: number | null;
  pinyin: string;
  title: string;
  children: ICity[];
} & HotCities;

export type IData = {
  cities: ICity;
  hotCities: HotCities[];
};
export type ISequence = { sequence: string | undefined; spell: string };
export type ITreeData = ICity[];
export type IResult = (ICity & { spell?: string })[];
