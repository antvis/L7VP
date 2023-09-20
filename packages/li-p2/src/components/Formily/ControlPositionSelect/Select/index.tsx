import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React from 'react';
import { POSITION } from './contants';
const PositionSelect: React.FC<SelectProps> = (props) => {
  const { options, ...prop } = props;

  return <Select {...prop} options={options ?? POSITION} />;
};

export default PositionSelect;
