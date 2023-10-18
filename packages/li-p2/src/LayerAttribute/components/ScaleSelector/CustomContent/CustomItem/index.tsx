import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import type { CustomItemValueType, CustomType } from '../../type';
import Item from './Item';
import useStyle from './style';

type RangeItemProps = {
  customType: CustomType;
  position: string | null;
  selectedOption: (string | number | null)[];
  selectOptions: { label: string; value: string }[];
  min?: number;
  max?: number;
  color: string;
  value: CustomItemValueType;
  onDelete: () => void;
  onChange: (value: CustomItemValueType, color: string) => void;
};

const RangeItem = ({
  customType,
  position,
  selectedOption,
  selectOptions,
  color: defaultColor,
  value: defaultValue,
  min = 0,
  max = 100,
  onDelete,
  onChange,
}: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const options = useMemo(() => {
    if (!selectedOption.length && !defaultValue.length) {
      return selectOptions;
    }

    const selected = selectedOption.filter((item) => !defaultValue.includes(item));
    return selectOptions.filter((item) => !selected.includes(item.value));
  }, [selectedOption, selectOptions, defaultValue]);

  const colorChange = (color: Color) => {
    onChange?.(defaultValue, color.toHexString());
  };

  const onValueChange = (_value: (string | number | null)[]) => {
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
          <Item
            customType={customType}
            value={defaultValue}
            options={options}
            onChange={(e) => onValueChange(e)}
            min={min}
            max={max}
            position={position}
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
