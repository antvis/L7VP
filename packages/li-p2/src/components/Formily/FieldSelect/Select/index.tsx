import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps } from 'antd';
import { Select, Tag } from 'antd';
import cls from 'classnames';
import { isUndefined } from 'lodash-es';
import React, { useState } from 'react';
import useStyle from './style';
import type { FieldSelectOptionType } from './types';

const InternalSelect: React.FC<SelectProps<string, FieldSelectOptionType>> = (props) => {
  const { options, ...prop } = props;
  const prefixCls = usePrefixCls('formily-field-select');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);

  const onOptionClick = (val: string) => {
    console.log(val, 'val');
    if (props.onChange) {
      props.onChange(val, options ?? []);
      setOpen(false);
    }
  };
  return wrapSSR(
    <Select
      {...prop}
      popupClassName={cls(`${prefixCls}`, hashId)}
      open={true}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => (
        <div className={`${prefixCls}-dropdown`}>
          {options?.map((item, index) => {
            return (
              <div
                className={cls(`${prefixCls}-item`, hashId, {
                  [`${prefixCls}-item_selected`]: item.value === props.value,
                })}
                key={index}
                onClick={() => onOptionClick(item.value)}
              >
                {isUndefined(item.type) ? (
                  <Tag>未知</Tag>
                ) : (
                  <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
                )}

                <span>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    >
      {options?.map((item, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            <div className={cls(`${prefixCls}-item`, hashId)}>
              {isUndefined(item.type) ? (
                <Tag>未知</Tag>
              ) : (
                <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
              )}
              <span>{item.label}</span>
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default InternalSelect;
