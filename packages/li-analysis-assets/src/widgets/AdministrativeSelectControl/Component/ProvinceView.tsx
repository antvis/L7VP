import cls from 'classnames';
import { groupBy, isEmpty } from 'lodash-es';
import React from 'react';
import { CLS_PREFIX } from '../constant';
import type { ICity, IData } from '../types';
import { SortView } from './SortView';
import useStyle from './style';

interface IProvince {
  cityData: IData;
  onClickItem: (value: ICity) => void;
}

export const ProvinceContent = (props: IProvince) => {
  const { onClickItem, cityData } = props;
  const style = useStyle();
  if (!cityData) return null;
  const provinceData = groupBy(cityData.cities.children, 'sequence');
  const newData = Object.keys(provinceData).sort();

  const Label = (v: ICity) => {
    if (isEmpty(v.children)) return null;
    return (
      <div onClick={() => onClickItem(v)} className={cls(`${CLS_PREFIX}__province-content-label`, style.provinceLabel)}>
        {v.name.replace('省', '')}:
      </div>
    );
  };

  const ChildContent = (v: ICity) => {
    if (isEmpty(v.children)) return null;
    return (
      <div className={cls(`${CLS_PREFIX}__province-content-value`, style.provinceValue)}>
        {v.children.map((s: ICity) => {
          return (
            <div
              key={s.name}
              onClick={() => onClickItem(s)}
              className={cls(`${CLS_PREFIX}__province-content-value-item`, style.provinceItem)}
            >
              {s.name.replace('市', '')}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <SortView areaData={provinceData} type={'province'} />
      <div className={cls(`${CLS_PREFIX}__province`, style.province)}>
        {newData.map((item) => {
          return provinceData[item].map((v: ICity, index: number) => {
            return (
              <div
                key={JSON.stringify(v)}
                id={index === 0 ? `province${item}` : 'province'}
                className={cls(`${CLS_PREFIX}__province-content`)}
              >
                {Label(v)}
                {ChildContent(v)}
              </div>
            );
          });
        })}
      </div>
    </>
  );
};
