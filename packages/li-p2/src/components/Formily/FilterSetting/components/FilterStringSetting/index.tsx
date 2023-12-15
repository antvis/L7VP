import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOptions } from './helper';

export interface FilterStringSettingProps {
  filterType: 'radio' | 'multiple';
  domain: string[];
  value?: string[];
  onChange: (value?: string[]) => void;
  maxTagCount?: number;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
}

const FilterStringSetting: React.FC<FilterStringSettingProps> = (props) => {
  const { value: defaluValue, domain, filterType, maxTagCount = 3, size = 'middle', bordered = true, onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<undefined | string[]>();
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();

  const onValueChange = (val: string | string[]) => {
    if (filterType === 'radio') {
      const _val = typeof val === 'string' ? [val] : undefined;
      onChange(_val);
      setSelectedOptions(_val);
    } else {
      if (typeof val === 'string') return;
      if (val.includes('all')) {
        const _options = getOptions(domain, true);
        setOptions(_options);
        onChange(['all']);
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
    setSelectedOptions(defaluValue);
  }, [defaluValue]);

  useEffect(() => {
    if (domain && domain.length) {
      const isUsable = filterType === 'multiple' && defaluValue && defaluValue[0] === 'all' ? true : false;
      const _options = getOptions(domain, isUsable);
      setOptions(_options);
    }
  }, [domain, filterType]);

  return (
    <>
      {filterType === 'radio' && (
        <Select
          size={size}
          bordered={bordered}
          style={{ width: '100%' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}

      {filterType === 'multiple' && (
        <Select
          maxTagCount={maxTagCount}
          size={size}
          bordered={bordered}
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

export default FilterStringSetting;
