import Icon from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { usePrefixCls } from '../../../../../hooks';
import useStyle from './style';

const VisTypeSelect: React.FC<SelectProps<any, any>> = (props) => {
  const { options, onChange, ...prop } = props;
  const { className } = props;
  const prefixCls = usePrefixCls('vis-type-select');
  const styles = useStyle();
  const [open, setOpen] = useState(false);

  const onTypeChange = (val: string) => {
    props.onChange?.(val, options);
    setOpen(false);
  };

  return (
    <Select
      {...prop}
      open={open}
      virtual={false}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      className={classNames(prefixCls, className)}
      dropdownRender={() => (
        <div className={classNames(`${prefixCls}__drop-down`, styles.dropDown)}>
          {options?.map((item: Record<string, any>, index) => {
            const isSelected = item.value === prop.value;
            return (
              <div
                className={classNames(`${prefixCls}__select-item`, styles.selectItem)}
                onClick={() => onTypeChange(item.value)}
                key={index}
              >
                <div
                  className={classNames(`${prefixCls}__item-icon`, styles.itemIcon, {
                    [`${prefixCls}__item-icon_selected`]: isSelected,
                    [styles.itemIconSelected]: isSelected,
                  })}
                >
                  <Icon component={item.icon} />
                </div>
                <span className={classNames(`${prefixCls}__item-label`, styles.itemLabel)}>{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    >
      {options?.map((item: Record<string, any>, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            <div className={classNames(`${prefixCls}__selected-option`, styles.selectedOption)}>
              <div className={classNames(`${prefixCls}__selected-icon`, styles.selectedIcon)}>
                <Icon component={item.icon} />
              </div>
              <span className={classNames(`${prefixCls}__selected-label`, styles.selectedLabel)}>{item.label}</span>
            </div>
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default VisTypeSelect;
