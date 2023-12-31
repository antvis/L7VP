import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React from 'react';
import InputCat from './InputCat';
import useStyle from './style';

type CustomItemProps = {
  min?: number;
  max?: number;
  color: string;
  value: number[];
  onDelete: () => void;
  onChange: (value: number[], color: string) => void;
};

const CustomItem = ({
  color: defaultColor,
  value: defaultValue,
  min = -Infinity,
  max = Infinity,
  onDelete,
  onChange,
}: CustomItemProps) => {
  const prefixCls = usePrefixCls('formily-rester--scale-selector__custom-input');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const colorChange = (color: Color) => {
    onChange?.(defaultValue, color.toHexString());
  };

  const onValueChange = (_value: number[]) => {
    onChange?.(_value, defaultColor);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      <div className={`${prefixCls}__infor`}>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ColorPicker value={defaultColor ? defaultColor : '#5B8FF9'} onChange={colorChange}>
            <div className={`${prefixCls}__infor__color`} style={{ background: defaultColor }} />
          </ColorPicker>
        </div>

        <div className={`${prefixCls}__infor__content`}>
          <InputCat size="small" min={min} max={max} value={defaultValue as [number]} onChange={onValueChange} />
        </div>

        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>,
  );
};

export default CustomItem;
