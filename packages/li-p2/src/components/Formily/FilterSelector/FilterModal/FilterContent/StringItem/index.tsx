import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio, Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import type { FilterString } from '../../../type';
import { getOptions } from './helper';
import useStyle from './style';
export interface StringItemProps {
  value: FilterString;
  onChange: (value: FilterString) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector-modal-string-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaluValue, onChange } = props;
  const [selectedOptions, setSelectedOptions] = useState<string | string[]>('all');
  const [options, setOptions] = useState<{ label: string; value: string; disabled?: boolean }[]>();

  // 类型变化
  const onTypeChange = (type: 'radio' | 'multiple') => {
    if (type === 'multiple') {
      const _options = getOptions(defaluValue.params.domain, true);
      setOptions(_options);
    } else {
      const _options = getOptions(defaluValue.params.domain, false);
      setOptions(_options);
    }

    onChange({
      ...defaluValue,
      params: {
        ...defaluValue.params,
        radioType: type,
      },
      value: defaluValue.params.domain,
    });
  };

  const onValueChange = (val: string | string[]) => {
    if (defaluValue.params.radioType === 'radio') {
      if (typeof val !== 'string') return;
      if (val === 'all') {
        onChange({
          ...defaluValue,
          value: defaluValue.params.domain,
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
        const _options = getOptions(defaluValue.params.domain, true);
        setOptions(_options);
        onChange({
          ...defaluValue,
          value: defaluValue.params.domain,
        });
        setSelectedOptions(['all']);
      } else {
        const _options = getOptions(defaluValue.params.domain, false);
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
      if (defaluValue.value.length === defaluValue.params.domain.length) {
        setSelectedOptions('all');
      } else {
        setSelectedOptions(defaluValue.value);
      }
    }
  }, [defaluValue.value]);

  useEffect(() => {
    if (defaluValue.params.domain && defaluValue.params.domain.length) {
      const _options = getOptions(defaluValue.params.domain, false);
      setOptions(_options);
    }
  }, [defaluValue.params.domain]);

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>筛选方式</div>
        <Radio.Group value={defaluValue.params?.radioType} onChange={(e) => onTypeChange(e.target.value)}>
          <Radio value="radio">单选</Radio>
          <Radio value="multiple">多选</Radio>
        </Radio.Group>
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
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
      </div>
    </>,
  );
};

export default StringItem;
