import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';

export interface FilterNumberItemProps {
  operator: '>=' | '<=' | 'BETWEEN';
  size?: 'small' | 'middle' | 'large';
  min: number;
  max: number;
  value: number | [number, number];
  onChange: (value: number | [number, number], operator: '>=' | '<=' | 'BETWEEN') => void;
}

const FilterNumberItem: React.FC<FilterNumberItemProps> = (props) => {
  const { value: defaluValue, operator, min, max, size = 'middle', onChange } = props;
  const [ranges, setRanges] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (typeof defaluValue === 'number') {
      if (operator === '>=') {
        setRanges([defaluValue, null]);
      } else if (operator === '<=') {
        setRanges([null, defaluValue]);
      }
    } else {
      setRanges(defaluValue);
    }
  }, [defaluValue]);

  const onValueChange = (val: [number | null, number | null]) => {
    const [minVal, maxVal] = val;
    setRanges(val);
    // 处理数据结构
    if (minVal) {
      if (maxVal) {
        if (minVal < maxVal) {
          onChange([minVal, maxVal], 'BETWEEN');
        } else {
          onChange([maxVal, minVal], 'BETWEEN');
        }
      } else {
        onChange(minVal, '>=');
      }
    } else {
      if (maxVal) {
        onChange(maxVal, '<=');
      } else {
        onChange(min, '>=');
      }
    }
  };

  return (
    <div>
      <InputNumber
        placeholder="最小值"
        size={size}
        min={min}
        max={max}
        value={ranges[0]}
        onChange={(value) => onValueChange([value, ranges[1]])}
      />
      -
      <InputNumber
        placeholder="最大值"
        size={size}
        min={min}
        max={max}
        value={ranges[1]}
        onChange={(value) => onValueChange([ranges[0], value])}
      />
    </div>
  );
};

export default FilterNumberItem;
