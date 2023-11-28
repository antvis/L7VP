import { InputNumber } from 'antd';
import { isNumber } from 'lodash-es';
import React, { useEffect, useState } from 'react';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  value: [number];
  min: number;
  max: number;
  onChange: (val: [number]) => void;
};

const InputCat = ({ size = 'middle', value, min, max, onChange }: ItemProps) => {
  const [itemVal, setItemVal] = useState(value);

  const onInputChange = (e: number) => {
    onChange([e]);
    setItemVal([e]);
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return (
    <InputNumber
      size={size}
      min={min}
      max={max}
      value={itemVal?.[0]}
      style={{ width: '100%' }}
      onChange={(e) => isNumber(e) && onInputChange(e)}
    />
  );
};

export default InputCat;
