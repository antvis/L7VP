import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import FieldSelect from '../../../FieldSelect/Select';
import type { FilterNodeItem, OptionType } from '../../type';
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
  const prefixCls = usePrefixCls('formily-filters-edit-modal-right');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value, options, onChange } = props;
  const [filter, setFilter] = useState<FilterNodeItem>(value);

  const onFieldChange = (field: string) => {
    const _field = options.find((item) => item.value === field) as OptionType;
    let _filter = {};
    if (_field.type === 'string') {
      _filter = {
        field: _field.value,
        type: 'string',
        operator: 'IN',
        value: '',
        otherParams: {
          radioType: 'radio',
        },
      };
    }

    if (_field.type === 'number') {
      _filter = { field: _field.value, type: 'number', operator: '>=', value: 0 };
    }

    if (_field.type === 'date') {
      _filter = {
        field: _field.value,
        type: 'date',
        operator: '>',
        granularity: _field.format,
        value: undefined,
      };
    }
    setFilter(_filter as FilterNodeItem);
    onChange(_filter as FilterNodeItem);
  };

  const onFilterValueChange = (value: FilterNodeItem) => {
    setFilter(value);
    onChange(value);
  };

  useEffect(() => {
    if (!filter) {
      const _field = options[0];
      setFilter({ field: _field?.value, type: _field?.type });
    }
  }, []);

  useEffect(() => {
    setFilter(value);
  }, [value]);

  if (!filter) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}> 选择筛选字段</div>
        <FieldSelect value={filter.field} style={{ width: '100%' }} options={options} onChange={onFieldChange} />
      </div>

      {filter.type === 'string' && <StringItem value={filter} options={options} onChange={onFilterValueChange} />}

      {filter.type === 'number' && <NumberItem />}

      {filter.type === 'date' && <DateItem value={filter} options={options} onChange={onFilterValueChange} />}
    </div>,
  );
};

export default EditContent;
