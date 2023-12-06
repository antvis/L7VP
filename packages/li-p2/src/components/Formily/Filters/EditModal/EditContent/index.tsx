import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldSelect from '../../../FieldSelect/Select';
import type { FilterNodeItem, OptionType } from '../../type';
import { getDefaultValue } from '../helper';
import DateItem from './DateItem';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

export interface FiltersProps {
  value: FilterNodeItem;
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * 选择发生改变时
   */
  onChange: (value: FilterNodeItem) => void;
}

const EditContent: React.FC<FiltersProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-edit-');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, options, onChange } = props;
  const [filter, setFilter] = useState<FilterNodeItem>(defaultValue);
  const [domain, setDomain] = useState<(string | number)[]>();
  const [format, setFormat] = useState<string>('YYYY');

  // 字段变更
  const onFieldChange = (field: string) => {
    const _field = options.find((item) => item.value === field) as OptionType;
    setDomain(_field.domain);
    if (_field.type === 'date') {
      setFormat(_field?.format || 'YYYY');
    }

    const _filter = { ...getDefaultValue(_field), id: filter.id };
    setFilter(_filter);
    onChange(_filter);
  };

  // 字段配置变更
  const onFilterValueChange = (value: FilterNodeItem) => {
    setFilter(value);
    onChange(value);
  };

  useEffect(() => {
    setFilter(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (defaultValue.field && options) {
      const _field = options.find((item) => item.value === defaultValue.field);
      const _domain = _field?.domain;
      setDomain(_domain);
      if (_field?.type === 'date') {
        setFormat(_field?.format || 'YYYY');
      }
    }
  }, [defaultValue.field, options]);

  if (!filter) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}> 选择筛选字段</div>
        <FieldSelect value={filter.field} style={{ width: '100%' }} options={options} onChange={onFieldChange} />
      </div>

      {filter.type === 'string' && (
        <StringItem value={filter} domain={domain as string[]} onChange={onFilterValueChange} />
      )}

      {filter.type === 'date' && <DateItem value={filter} format={format} onChange={onFilterValueChange} />}

      {filter.type === 'number' && <NumberItem />}
    </div>,
  );
};

export default EditContent;
