import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';

export interface FilterNumberSettingProps {
  operator: '>=' | '<=' | 'BETWEEN';
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  min: number;
  max: number;
  value?: number | [number, number];
  onChange: (value: number | [number, number], operator: '>=' | '<=' | 'BETWEEN') => void;
}

const FilterNumberSetting: React.FC<FilterNumberSettingProps> = (props) => {
  const { value: defaluValue, operator, min, max, size = 'middle', bordered = true, onChange } = props;
  const [ranges, setRanges] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (!defaluValue) {
      return;
    }

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
        bordered={bordered}
        size={size}
        min={min}
        max={max}
        value={ranges[0]}
        onChange={(value) => onValueChange([value, ranges[1]])}
      />
      -
      <InputNumber
        placeholder="最大值"
        bordered={bordered}
        size={size}
        min={min}
        max={max}
        value={ranges[1]}
        onChange={(value) => onValueChange([ranges[0], value])}
      />
    </div>
  );
};

export default FilterNumberSetting;
