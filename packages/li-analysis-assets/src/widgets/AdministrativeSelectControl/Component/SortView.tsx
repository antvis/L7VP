import cls from 'classnames';
import React, { useState } from 'react';
import { CLS_PREFIX } from '../constant';
import useStyle from './style';

type IScrtView = {
  areaData: Record<string, any>;
  type: string;
};

export const SortView = ({ areaData, type }: IScrtView) => {
  const style = useStyle();
  const [sequence, setSequence] = useState('');
  const needSortData = Object.keys(areaData).sort();

  const onScrollClick = (e: any, which: string, item: string) => {
    e.stopPropagation();
    const element = document.getElementById(`${which}${item}`) as HTMLElement;
    element.scrollIntoView({ block: 'start' });
    setSequence(item);
  };

  return (
    <div className={cls(`${CLS_PREFIX}__location`, style.location)}>
      {needSortData.map((item) => {
        return (
          <div
            key={JSON.stringify(item)}
            id={JSON.stringify(item)}
            className={cls(`${CLS_PREFIX}__location-item`, style.locationItem, {
              [style.locationItemActive]: item === sequence,
            })}
            onClick={(e) => onScrollClick(e, type, item)}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};
