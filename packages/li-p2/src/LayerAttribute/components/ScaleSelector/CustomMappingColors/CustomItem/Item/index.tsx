import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import React from 'react';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  customType: 'string' | 'number';
  value: (string | number)[];
  options: { label: string; value: string }[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: (string | number)[]) => void;
};

const Item = ({ size = 'middle', customType, value, options, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {customType === 'string' && (
        <StringItem size={size} value={value as string[]} onChange={onChange} options={options} />
      )}

      {customType === 'number' && (
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
