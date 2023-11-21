import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React from 'react';
import InputNumber from './InputNumber';
import useStyle from './style';

type RangeItemProps = {
  position: string | null;
  min?: number;
  max?: number;
  color: string;
  value: (string | number)[];
  onDelete: () => void;
  onChange: (value: (string | number)[], color: string) => void;
};

const RangeItem = ({
  position,
  color: defaultColor,
  value: defaultValue,
  min = 0,
  max = 100,
  onDelete,
  onChange,
}: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-number__input');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const colorChange = (color: Color) => {
    onChange?.(defaultValue, color.toHexString());
  };

  const onValueChange = (_value: (string | number)[]) => {
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
          <InputNumber
            size="small"
            value={defaultValue as [number, number]}
            min={min}
            max={max}
            position={position}
            onChange={onValueChange}
          />
        </div>

        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>,
  );
};

export default RangeItem;
