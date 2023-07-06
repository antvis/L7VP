import cls from 'classnames';
import { groupBy } from 'lodash-es';
import React from 'react';
import { CLS_PREFIX } from '../constant';
import { treeToArr } from '../helper';
import type { ICity, IData } from '../types';
import { SortView } from './SortView';
import useStyle from './style';

interface ICityData {
  cityData: IData;
  onClickItem: (value: ICity) => void;
}

export const CityContent = (props: ICityData) => {
  const { cityData, onClickItem } = props;
  const style = useStyle();
  if (!cityData) return null;
  const newCities = groupBy(treeToArr([cityData.cities]), 'sequence');
  const newCityData = Object.keys(newCities).sort();

  const ChildContent = (city: Record<string, any>[]) => {
    return (
      <div className={cls(`${CLS_PREFIX}__city-value`, style.cityValue)}>
        {city.map((v) => {
          return (
            <div
              key={JSON.stringify(v)}
              onClick={() => onClickItem(v as ICity)}
              className={cls(`${CLS_PREFIX}__city-item`, style.cityItem)}
            >
              {v.name.replace('市', '')}
            </div>
          );
        })}
      </div>
    );
  };
  return (
    <>
      <SortView areaData={newCities} type={'city'} />
      <div className={cls(`${CLS_PREFIX}__city`, style.city)}>
        {newCityData.map((item) => {
          return (
            <div className={cls(`${CLS_PREFIX}__city-content`)} key={JSON.stringify(item)}>
              <div id={`city${item}`} className={cls(`${CLS_PREFIX}__city-content-label`, style.cityContentLabel)}>
                {item}:
              </div>
              {ChildContent(newCities[item])}
            </div>
          );
        })}
      </div>
    </>
  );
};
