import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React from 'react';
import { FilterNumberConfig } from '../../../components';
import type { FilterNumberConfigType } from '../../../type';
import useStyle from './style';

export interface NumberItemProps {
  value: FilterNumberConfigType;
  /**
   * 选择发生改变时
   */
  onChange: (value: FilterNumberConfigType) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal-number-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: outterValue, onChange } = props;
  const { value, operator } = outterValue;

  const onValueChange = (val: number | [number, number] | undefined, operator: '>=' | '<=' | 'BETWEEN') => {
    const _value = {
      ...outterValue,
      value: val,
      operator,
    } as FilterNumberConfigType;
    onChange(_value);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}__filter`, hashId)}>
      <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
      <FilterNumberConfig value={value} operator={operator} onChange={onValueChange} />
    </div>,
  );
};

export default NumberItem;
