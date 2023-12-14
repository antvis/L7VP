import type { FilterString } from '@antv/li-p2';
import React from 'react';
import { FilterStringItem } from '@antv/li-p2';

export interface StringItemProps {
  value: FilterString;
  onChange: (value: FilterString) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const { value: defaluValue, onChange } = props;
  const domain = defaluValue.params.domain;

  const onValueChange = (val: string[]) => {
    onChange({
      ...defaluValue,
      value: val,
    });
  };

  return (
    <FilterStringItem
      value={defaluValue.value}
      domain={domain}
      onChange={onValueChange}
      radioType={defaluValue.params.radioType}
      maxTagCount={2}
    />
  );
};

export default StringItem;
