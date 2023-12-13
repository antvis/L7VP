import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Select } from 'antd';
import cls from 'classnames';
import React from 'react';
import type { FilterNumber, OptionType } from '../../../type';
import useStyle from './style';

export interface NumberItemProps {
  value?: FilterNumber;
  /**
   * 筛选字段
   */
  options?: OptionType[];
  /**
   * 选择发生改变时
   */
  onChange?: (value: FilterNumber) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector-edit-modal-right-number-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value, options, onChange } = props;

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>请选择聚合函数</div>
        <Select
          size="small"
          defaultValue="no"
          style={{ width: '100%' }}
          options={[{ value: 'no', label: '无聚合' }]}
          // onChange={onFieldChange}
        />
      </div>
    </>,
  );
};

export default NumberItem;
