import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps } from 'antd';
import { Empty, Select, Tag } from 'antd';
import cls from 'classnames';
import { isUndefined } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import useStyle from './style';
import type { FieldSelectOptionType } from './types';

const InternalSelect: React.FC<SelectProps<string, FieldSelectOptionType>> = (props) => {
  const { options, open: defaultOpen = true, ...prop } = props;
  const prefixCls = usePrefixCls('formily-field-select');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(defaultOpen);
  }, [defaultOpen]);

  const onOptionClick = (val: string) => {
    if (props.onChange) {
      props.onChange(val, options ?? []);
      setOpen(false);
    }
  };

  return wrapSSR(
    <Select
      {...prop}
      popupClassName={cls(`${prefixCls}`, hashId)}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        if (!options?.length) {
          return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }

        const dropdownHeight = 32 * options.length < 256 ? 32 * options.length + 14 : 256;
        return (
          <div className={`${prefixCls}-dropdown`} style={{ height: dropdownHeight }}>
            <div className={`${prefixCls}-dropdown-container`}>
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
          </div>
        );
      }}
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
              <span title={item.label}>{item.label}</span>
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default InternalSelect;
