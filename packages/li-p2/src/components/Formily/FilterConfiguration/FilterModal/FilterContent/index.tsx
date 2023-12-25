import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import FieldSelect from '../../../FieldSelect/Select';
import type { FilterConfigType, OptionType } from '../../type';
import { getDefaultValue } from '../helper';
import DateItem from './DateItem';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

export interface FilterContentProps {
  value: FilterConfigType;
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * 选择发生改变时
   */
  onChange: (value: FilterConfigType) => void;
}

const FilterContent: React.FC<FilterContentProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-content');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, options, onChange } = props;
  const [filter, setFilter] = useState<FilterConfigType>(defaultValue);
  const [format, setFormat] = useState<string>('YYYY');
  const [domain, setDomain] = useState<string[] | [number, number]>([]);

  const open = useMemo(() => {
    return defaultValue.field ? false : true;
  }, [defaultValue.field]);

  // 筛选字段变更
  const onFieldChange = (field: string) => {
    const _field = options.find((item) => item.value === field) as OptionType;
    setDomain(_field.domain ?? []);
    setFormat(_field.format ?? '');
    const _filter = { ...getDefaultValue(_field, filter.id) };
    setFilter(_filter);
    onChange(_filter);
  };

  // 配置项变更
  const onFilterValueChange = (value: FilterConfigType) => {
    setFilter(value);
    onChange(value);
  };

  useEffect(() => {
    setFilter(defaultValue);
    if (defaultValue.field && options) {
      const _field = options.find((item) => item.value === defaultValue.field);
      setDomain(_field?.domain ?? []);
      if (_field?.type === 'date') {
        setFormat(_field?.format || 'YYYY');
      }
    }
  }, [defaultValue, options]);

  if (!filter) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}> 选择筛选字段</div>
        <FieldSelect
          open={open}
          value={filter.field}
          style={{ width: '100%' }}
          options={options}
          onChange={onFieldChange}
        />
      </div>

      {filter.type === 'string' && (
        <StringItem value={filter} options={domain as string[]} onChange={onFilterValueChange} />
      )}

      {filter.type === 'date' && <DateItem value={filter} format={format} onChange={onFilterValueChange} />}

      {filter.type === 'number' && <NumberItem value={filter} onChange={onFilterValueChange} />}
    </div>,
  );
};

export default FilterContent;
