import type { FilterStringConfigType } from '@antv/li-p2';
import { FilterStringConfig } from '@antv/li-p2';
import { uniq } from 'lodash-es';
import React, { useMemo } from 'react';

export interface StringItemProps {
  defaultValue: FilterStringConfigType;
  field: string;
  data: Record<string, any>[];
  onChange: (value: FilterStringConfigType) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const { defaultValue, field, data, onChange } = props;

  const domain = useMemo(() => {
    const fieldData = data.map((item) => (typeof item[field] === 'object' ? JSON.stringify(item[field]) : item[field]));
    const _domain: string[] = uniq(fieldData).slice(0, 3000);

    return _domain;
  }, [data, field]);

  const onValueChange = (val?: string[]) => {
    onChange({
      ...defaultValue,
      value: val,
    });
  };

  return (
    <FilterStringConfig
      bordered={false}
      value={defaultValue.value}
      domain={domain}
      onChange={onValueChange}
      filterType={defaultValue.params.filterType}
      maxTagCount={2}
    />
  );
};

export default StringItem;
