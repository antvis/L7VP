import Icon from '@ant-design/icons';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import './VisTypeSelect.less';

const VisTypeSelect: React.FC<SelectProps<any, any>> = (props) => {
  const { options, onChange, ...prop } = props;
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
      className="li-vis-type-select"
      dropdownRender={() => (
        <div className="li-vis-type-select__drop-down">
          {options?.map((item: Record<string, any>, index) => {
            const isSelected = item.value === prop.value;
            return (
              <div className="li-vis-type-select__select-item" onClick={() => onTypeChange(item.value)} key={index}>
                <div
                  className={classNames('li-vis-type-select__item-icon', {
                    'li-vis-type-select__item-icon_selected': isSelected,
                  })}
                >
                  <Icon component={item.icon} />
                </div>
                <span className="li-vis-type-select__item-label">{item.label}</span>
              </div>
            );
          })}
        </div>
      )}
    >
      {options?.map((item: Record<string, any>, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            <Icon component={item.icon} className="li-vis-type-select__selected-icon" style={{ marginRight: 5 }} />
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default VisTypeSelect;
