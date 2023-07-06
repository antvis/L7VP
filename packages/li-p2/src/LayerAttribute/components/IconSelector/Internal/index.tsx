import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import type { IconSelectOptionType } from '../../IconList/type';
import useStyle from './style';

export type IconSelectProps = SelectProps<string, IconSelectOptionType>;

// 选择图标的自定义组件
const Internal: React.FC<IconSelectProps> = (props) => {
  const prefixCls = usePrefixCls('formily-icon-selector', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);

  return wrapSSR(
    <Select
      showArrow={false}
      open={open}
      allowClear={true}
      className={prefixCls}
      onDropdownVisibleChange={(visible) => {
        setOpen(visible);
      }}
      onChange={props?.onChange}
      value={props.value}
      popupClassName={cls(open ? `${prefixCls}__select-list` : `${prefixCls}__select-list_hidden`, hashId)}
    >
      {(props.options || []).map((item: IconSelectOptionType) => {
        return (
          <Select.Option key={item.id} value={item.id}>
            <div className={`${prefixCls}__selection-item`}>
              <img src={item.image} style={{ height: 24 }} />
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};
export default Internal;
