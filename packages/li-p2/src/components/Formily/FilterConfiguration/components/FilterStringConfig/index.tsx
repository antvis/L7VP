import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import { getOptions } from './helper';
import useStyle from './style';

export interface FilterStringConfigProps {
  filterType: 'radio' | 'multiple';
  domain: string[];
  value?: string[];
  onChange: (value?: string[]) => void;
  maxTagCount?: number;
  size?: 'small' | 'middle' | 'large';
  bordered?: boolean;
}

const FilterStringConfig: React.FC<FilterStringConfigProps> = (props) => {
  const { value: defaluValue, domain, filterType, size = 'middle', bordered = true, onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<undefined | string[]>();
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();
  const prefixCls = usePrefixCls('formily-filter-string-config');
  const [wrapSSR, hashId] = useStyle(prefixCls);

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

  return wrapSSR(
    <>
      {filterType === 'radio' && (
        <Select
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
        <div className={cls(`${prefixCls}`, hashId)}>
          <div className={cls(`${prefixCls}__title`, hashId)}>
            {selectedOptions?.includes('all') ? '全部' : selectedOptions?.toString()}
          </div>

          <Select
            maxTagCount={1}
            size={size}
            bordered={bordered}
            mode="tags"
            style={{ width: '100%' }}
            placeholder="请选择"
            value={selectedOptions}
            options={options}
            onChange={onValueChange}
          />
        </div>
      )}
    </>,
  );
};

export default FilterStringConfig;
