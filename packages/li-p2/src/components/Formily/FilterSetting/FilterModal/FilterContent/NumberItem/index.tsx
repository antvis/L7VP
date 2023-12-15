import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React from 'react';
import type { FilterNumber } from '../../../type';
import { FilterNumberSetting } from '../../../components';
import useStyle from './style';

export interface NumberItemProps {
  value: FilterNumber;
  range: [number, number];
  /**
   * 选择发生改变时
   */
  onChange: (value: FilterNumber) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal-number-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, range, onChange } = props;
  const { value, operator } = defaultValue;

  const onValueChange = (val: number | [number, number], operator: '>=' | '<=' | 'BETWEEN') => {
    const _value = {
      ...defaultValue,
      value: val,
      operator,
    } as FilterNumber;
    onChange(_value);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}__filter`, hashId)}>
      <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
      <FilterNumberSetting value={value} min={range[0]} max={range[1]} operator={operator} onChange={onValueChange} />
    </div>,
  );
};

export default NumberItem;
