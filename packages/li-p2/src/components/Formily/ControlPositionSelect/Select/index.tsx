/* eslint-disable react/no-array-index-key */
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import cls from 'classnames';
import React from 'react';
import { POSITION } from './contants';
import useStyle from './style';

const PositionSelect: React.FC<SelectProps> = (props) => {
  const { options, ...prop } = props;
  const prefixCls = usePrefixCls('formily-position-select');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  return wrapSSR(
    <Select {...prop} className={cls(`${prefixCls}-select`, hashId)} popupClassName={cls(`${prefixCls}`, hashId)}>
      {(options ?? POSITION).map((item, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            <div className={cls(`${prefixCls}-item`, hashId)}>
              <span>{item.label}</span>
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default PositionSelect;
