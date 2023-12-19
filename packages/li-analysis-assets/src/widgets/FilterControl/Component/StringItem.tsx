import type { StringConfig } from '@antv/li-p2';
import React from 'react';
import { FilterStringConfig } from '@antv/li-p2';

export interface StringItemProps {
  value: StringConfig;
  domain: string[];
  onChange: (value: StringConfig) => void;
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
    <FilterStringConfig
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
