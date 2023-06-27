import { Input, Select } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import { uniq } from 'lodash-es';
import React, { useMemo } from 'react';
import type { FilterStringOperator, FilterStringValue } from '../../types';
import './index.less';

interface FilterStringProps {
  field: string;
  data: Record<string, any>[];
  operator: FilterStringOperator;
  value: FilterStringValue;
  onChange: (val: FilterStringValue) => void;
}

const CLS_PREFIX = 'li-filter-item-filter-field-string';

export const FilterString: React.FC<FilterStringProps> = ({ field, value, operator, data, onChange }) => {
  const valueOptions: DefaultOptionType[] = useMemo(() => {
    const fieldData = data.map((item) => (typeof item[field] === 'object' ? JSON.stringify(item[field]) : item[field]));
    const filterValueOptions: DefaultOptionType[] = uniq(fieldData)
      .slice(0, 3000)
      .map((item) => ({
        label: item,
        value: item,
        title: item,
      }));

    return filterValueOptions;
  }, [data, field]);

  const onValueChange = (_value: string | string[]) => {
    onChange(_value);
  };

  return (
    <div className={`${CLS_PREFIX}`}>
      {['IN', 'NOT_IN'].includes(operator) && (
        <Select
          showSearch
          className={`${CLS_PREFIX}__value`}
          mode={'multiple'}
          size="small"
          placeholder="请选择字段"
          value={value}
          options={valueOptions}
          filterOption={(input, option) => (option?.title ?? '').includes(input)}
          onChange={(_value) => onValueChange(_value)}
        />
      )}

      {['LIKE', 'NOT_LIKE'].includes(operator) && (
        <Input placeholder="请输入关键字" value={value} onChange={(e) => onValueChange(e.target.value)} />
      )}
    </div>
  );
};
