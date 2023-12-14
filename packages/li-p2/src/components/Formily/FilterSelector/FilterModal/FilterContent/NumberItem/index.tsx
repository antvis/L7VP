import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React from 'react';
import type { FilterNumber } from '../../../type';
import { FilterNumberItem } from '../../../components';
import useStyle from './style';

export interface NumberItemProps {
  value: FilterNumber;
  /**
   * 选择发生改变时
   */
  onChange: (value: FilterNumber) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector-modal-number-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, onChange } = props;
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
      <FilterNumberItem
        value={value}
        min={defaultValue.params?.domain[0]}
        max={defaultValue.params?.domain[1]}
        operator={operator}
        onChange={onValueChange}
      />
    </div>,
  );
};

export default NumberItem;
