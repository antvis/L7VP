import { InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';

export interface FilterNumberConfigProps {
  operator: '>=' | '<=' | 'BETWEEN';
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
  value?: number | [number, number];
  onChange: (value: number | [number, number] | undefined, operator: '>=' | '<=' | 'BETWEEN') => void;
}

const FilterNumberConfig: React.FC<FilterNumberConfigProps> = (props) => {
  const { value: outterValue, operator, size = 'middle', bordered = true, onChange } = props;
  const [ranges, setRanges] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (!outterValue) {
      return;
    }

    if (typeof outterValue === 'number') {
      if (operator === '>=') {
        setRanges([outterValue, null]);
      } else if (operator === '<=') {
        setRanges([null, outterValue]);
      }
    } else {
      setRanges(outterValue);
    }
  }, [outterValue]);

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
        onChange(undefined, '<=');
      }
    }
  };

  return (
    <div>
      <InputNumber
        placeholder="最小值"
        bordered={bordered}
        size={size}
        value={ranges[0]}
        onChange={(value) => onValueChange([value, ranges[1]])}
      />
      <span style={{ margin: '0 10px' }}>-</span>
      <InputNumber
        placeholder="最大值"
        bordered={bordered}
        size={size}
        value={ranges[1]}
        onChange={(value) => onValueChange([ranges[0], value])}
      />
    </div>
  );
};

export default FilterNumberConfig;
