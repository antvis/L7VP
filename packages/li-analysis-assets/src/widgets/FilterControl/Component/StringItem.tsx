import type { FilterString } from '@antv/li-p2';
import React from 'react';
import { FilterStringSetting } from '@antv/li-p2';

export interface StringItemProps {
  value: FilterString;
  domain: string[];
  onChange: (value: FilterString) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const { value: defaluValue, domain, onChange } = props;

  const onValueChange = (val?: string[]) => {
    onChange({
      ...defaluValue,
      value: val,
    });
  };

  return (
    <FilterStringSetting
      bordered={false}
      value={defaluValue.value}
      domain={domain}
      onChange={onValueChange}
      filterType={defaluValue.params.filterType}
      maxTagCount={2}
    />
  );
};

export default StringItem;
