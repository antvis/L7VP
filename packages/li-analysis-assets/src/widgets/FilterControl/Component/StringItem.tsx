import { Select } from 'antd';
import React, { useEffect, useState } from 'react';
import type { FilterString } from '@antv/li-p2';
import { getOptions } from './helper';

export interface StringItemProps {
  value: FilterString;
  onChange: (value: FilterString) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const { value: defaluValue, onChange } = props;
  const domain = defaluValue.params.domain;
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>('all');
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();

  const onValueChange = (val: string | string[]) => {
    if (defaluValue.params.radioType === 'radio') {
      if (typeof val !== 'string') return;
      if (val === 'all') {
        onChange({
          ...defaluValue,
          value: domain,
        });
      } else {
        onChange({
          ...defaluValue,
          value: [val],
        });
      }
      setSelectedOptions(val);
    } else {
      if (typeof val === 'string') return;
      if (val.includes('all')) {
        const _options = getOptions(domain, true);
        setOptions(_options);
        onChange({
          ...defaluValue,
          value: domain,
        });
        setSelectedOptions(['all']);
      } else {
        const _options = getOptions(domain, false);
        setOptions(_options);
        onChange({
          ...defaluValue,
          value: val,
        });
        setSelectedOptions(val);
      }
    }
  };

  useEffect(() => {
    if (defaluValue.value) {
      if (defaluValue.value.length === domain.length) {
        setSelectedOptions('all');
      } else {
        setSelectedOptions(defaluValue.value);
      }
    }
  }, [defaluValue.value]);

  useEffect(() => {
    if (domain && domain.length) {
      const _options = getOptions(domain, false);
      setOptions(_options);
    }
  }, [domain]);

  return (
    <>
      {defaluValue.params?.radioType === 'radio' && (
        <Select
          style={{ width: '100%' }}
          placeholder="请选择"
          value={selectedOptions}
          options={options}
          onChange={onValueChange}
        />
      )}

      {defaluValue.params?.radioType === 'multiple' && (
        <Select
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

export default StringItem;
