import { first, isEmpty } from 'lodash-es';
import { HotCityList } from './constant';
import type { IData, IResult, ISequence, ITreeData } from './types';

export const treeToArr = (data: ITreeData, res: IResult = []) => {
  data.forEach((item) => {
    res.push({ ...item, children: [] });
    if (item?.children && item?.children.length !== 0) {
      treeToArr(item?.children, res);
    }
  });
  return res;
};

export const getSequence = (text: string): ISequence => {
  if (!text) return { sequence: '', spell: '' };

  const toUppers = text.slice(0, 1).toLocaleUpperCase();
  return {
    sequence: toUppers,
    spell: text.replace('shi', ''),
  };
};

export const parserCityData = (result: IResult): IData | ITreeData | IResult => {
  if (isEmpty(result)) {
    return result;
  }
  const findChina: any = first(result.filter((item: any) => !isEmpty(item.children)));
  const cities = findChina.children.map((item: any) => {
    if (item.childrenNum === 1 || !item.children) {
      return {
        ...item,
        children: [],
        ...getSequence(item.pinyin),
      };
    }
    return {
      ...item,
      ...getSequence(item.pinyin),
      children: item.children.map((child: any) => {
        return {
          ...child,
          ...getSequence(child.pinyin),
          children: [],
        };
      }),
    };
  });
  const newCityData = {
    cities: {
      ...findChina,
      children: cities,
      sequence: 'Q',
      spell: 'China',
    },
    hotCities: HotCityList,
  };
  return newCityData;
};
