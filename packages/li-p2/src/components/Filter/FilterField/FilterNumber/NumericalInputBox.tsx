import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import React from 'react';
import { CLS_PREFIX } from './index';
import './index.less';

type NumericalInputBoxProps = {
  min: number;
  max: number;
  value: number;
  defaultValue: number;
  onChange: (value: number) => void;
};

const NumericalInputBox: React.FC<NumericalInputBoxProps> = (props) => {
  const config = { ...props };

  const onValueChange = (val: number) => {
    props.onChange(val);
  };

  return (
    <div className={`${CLS_PREFIX}__one-way`}>
      <InputNumber
        {...(config as InputNumberProps)}
        size="small"
        value={props.value}
        onChange={(e) => onValueChange(Number(e))}
      />
    </div>
  );
};

export default NumericalInputBox;
