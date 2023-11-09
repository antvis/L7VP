import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { InputNumber } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import { isNumber } from 'lodash-es';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  value: [number];
  min: number;
  max: number;
  onChange: (val: [number]) => void;
};

const CatItem = ({ size = 'middle', value, min, max, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-rester--scale-selector__custom-content__custom-item__item-cat');
  const [itemVal, setItemVal] = useState(value);

  const onInputChange = (e: number) => {
    onChange([e]);
    setItemVal([e]);
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return (
    <div className={classnames(`${prefixCls}`)}>
      <InputNumber
        size={size}
        min={min}
        max={max}
        value={itemVal?.[0]}
        style={{ width: '100%' }}
        onChange={(e) => isNumber(e) && onInputChange(e)}
      />
    </div>
  );
};

export default CatItem;
