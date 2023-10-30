import { InputNumber } from 'antd';
import { isArray } from 'lodash-es';
import React from 'react';
import { CLS_PREFIX } from './index';
import './index.less';

type ValueRangeInputBoxProp = {
  size: 'small' | 'middle' | 'large';
  min: number;
  max: number;
  value: [number, number];
  defaultValue: [number, number];
  onChange: (value: [number, number]) => void;
};

const ValueRangeInputBox: React.FC<ValueRangeInputBoxProp> = (props) => {
  const config = { ...props };
  const range = isArray(props.value) ? props.value : props.defaultValue;

  const onInputChange = (val: [number, number]) => {
    props.onChange(val);
  };

  return (
    <div className={`${CLS_PREFIX}__input-number`}>
      <InputNumber
        min={config.min}
        max={range[1] ?? config.max}
        style={{ marginRight: 10 }}
        size={config.size}
        value={range[0]}
        onChange={(first) => onInputChange([first ? first : 0, range[1]])}
      />
      <InputNumber
        min={range[0] ?? config.min}
        max={config.max}
        size={config.size}
        value={range[1]}
        onChange={(last) => onInputChange([range[0], last ?? range[0]])}
      />
    </div>
  );
};

export default ValueRangeInputBox;
