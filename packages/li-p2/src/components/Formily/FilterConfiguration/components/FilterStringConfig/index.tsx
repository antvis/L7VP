import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { useUpdateEffect } from 'ahooks';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOptions } from './helper';
import useStyle from './style';

export interface FilterStringConfigProps {
  filterType: 'single' | 'multiple';
  domain: string[];
  value?: string[];
  onChange: (value?: string[]) => void;
  maxTagCount?: number;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
}

const FilterStringConfig: React.FC<FilterStringConfigProps> = (props) => {
  const { value: outterValue, domain, filterType, size = 'middle', bordered = true, onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<undefined | string[]>(outterValue);
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();
  const prefixCls = usePrefixCls('formily-filter-string-config');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const onValueChange = (val: string | string[]) => {
    if (filterType === 'single') {
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

  useUpdateEffect(() => {
    setSelectedOptions(outterValue);
  }, [outterValue]);

  useEffect(() => {
    if (domain && domain.length) {
      const isUsable = filterType === 'multiple' && outterValue && outterValue[0] === 'all' ? true : false;
      const _options = getOptions(domain, isUsable);
      setOptions(_options);
    }
  }, [domain, filterType]);

  return wrapSSR(
    <>
      {filterType === 'single' && (
        <Select
          showSearch
          size={size}
          bordered={bordered}
          style={{ width: '100%', textAlign: 'left' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}

      {filterType === 'multiple' && (
        <Select
          allowClear
          size={size}
          bordered={bordered}
          mode="multiple"
          maxTagCount="responsive"
          maxTagPlaceholder="..."
          tagRender={(_props) => <>{_props.label}&ensp;</>}
          style={{ width: '100%', textAlign: 'left' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}
    </>,
  );
};

export default FilterStringConfig;
