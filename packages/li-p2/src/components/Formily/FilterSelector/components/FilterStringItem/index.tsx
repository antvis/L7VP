import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOptions } from './helper';

export interface FilterStringItemProps {
  radioType: 'radio' | 'multiple';
  domain: string[];
  value: string[];
  onChange: (value: string[]) => void;
  maxTagCount?: number;
  size?: 'small' | 'middle' | 'large';
}

const FilterStringItem: React.FC<FilterStringItemProps> = (props) => {
  const { value: defaluValue, domain, radioType, maxTagCount = 3, size = 'middle', onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>('all');
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();

  const onValueChange = (val: string | string[]) => {
    if (radioType === 'radio') {
      if (typeof val !== 'string') return;
      if (val === 'all') {
        onChange(domain);
      } else {
        onChange([val]);
      }
      setSelectedOptions(val);
    } else {
      if (typeof val === 'string') return;
      if (val.includes('all')) {
        const _options = getOptions(domain, true);
        setOptions(_options);
        onChange(domain);
        setSelectedOptions(['all']);
      } else {
        const _options = getOptions(domain, false);
        setOptions(_options);
        onChange(val);
        setSelectedOptions(val);
      }
    }
  };

  useEffect(() => {
    if (defaluValue) {
      if (defaluValue.length === domain.length) {
        setSelectedOptions('all');
      } else {
        setSelectedOptions(defaluValue);
      }
    }
  }, [defaluValue]);

  useEffect(() => {
    if (domain && domain.length) {
      const isUsable = radioType === 'multiple' && domain.length === defaluValue.length ? true : false;
      const _options = getOptions(domain, isUsable);
      setOptions(_options);
    }
  }, [domain, radioType]);

  return (
    <>
      {radioType === 'radio' && (
        <Select
          size={size}
          style={{ width: '100%' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}

      {radioType === 'multiple' && (
        <Select
          maxTagCount={maxTagCount}
          size={size}
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}
    </>
  );
};

export default FilterStringItem;
