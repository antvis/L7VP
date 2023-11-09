import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import React from 'react';
import NumberItem from '../../../../ScaleSelector/CustomMappingColors/CustomItem/Item/NumberItem';
import CatItem from './CatItem';
import useStyle from './style';

type ItemProps = {
  type: 'cat' | 'custom';
  size: 'small' | 'middle' | 'large';
  value: (string | number)[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: [number] | [number, number]) => void;
};

const Item = ({ size = 'middle', type, value, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-rester--scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {type === 'cat' && <CatItem size={size} min={min} max={max} value={value as [number]} onChange={onChange} />}

      {type === 'custom' && (
        <NumberItem
          size={size}
          value={value as [number, number]}
          min={min}
          max={max}
          position={position}
          onChange={onChange}
        />
      )}
    </div>,
  );
};

export default Item;
