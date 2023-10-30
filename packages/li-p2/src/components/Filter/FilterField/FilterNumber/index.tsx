import React, { useMemo } from 'react';
import type { FilterNumberOperator, FilterNumberValue } from '../../types';
import './index.less';
import NumericalInputBox from './NumericalInputBox';
import ValueRangeInputBox from './ValueRangeInputBox';

export const DEFAULT_RANGE: [number, number] = [0, 100];

interface FilterNumberProps {
  size?: 'small' | 'middle' | 'large';
  field: string;
  value: FilterNumberValue;
  operator: FilterNumberOperator;
  onChange: (val: FilterNumberValue) => void;
}

export const CLS_PREFIX = 'li-filter-item-filter-field-number';

export const FilterNumber: React.FC<FilterNumberProps> = ({ size = 'small', field, value, operator, onChange }) => {
  const range: [number, number] = useMemo(() => {
    // const min = minBy([] as Record<string, any>[], (data) => {
    //   return data[field];
    // })?.[field];
    // const max = maxBy([] as Record<string, any>[], (data) => {
    //   return data[field];
    // })?.[field];
    // return [Math.floor(min), Math.ceil(max)];
    return DEFAULT_RANGE;
  }, [field]);

  const onValueChange = (_value: number | [number, number]) => {
    onChange(_value);
  };

  return (
    <div className={`${CLS_PREFIX}`}>
      {operator !== 'BETWEEN' ? (
        <NumericalInputBox
          size={size}
          min={-Infinity}
          max={Infinity}
          defaultValue={range[0]}
          value={value as number}
          onChange={(_value) => onValueChange(_value)}
        />
      ) : (
        <ValueRangeInputBox
          size={size}
          min={Infinity}
          max={Infinity}
          defaultValue={range}
          value={value as [number, number]}
          onChange={(_value) => onValueChange(_value)}
        />
      )}
    </div>
  );
};
