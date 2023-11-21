import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import InputString from './InputString';
import useStyle from './style';

type RangeItemProps = {
  selectedOption: (string | number)[];
  selectOptions: { label: string; value: string }[];
  color: string;
  value: (string | number)[];
  onDelete: () => void;
  onChange: (value: (string | number)[], color: string) => void;
};

const RangeItem = ({
  selectedOption,
  selectOptions,
  color: defaultColor,
  value: defaultValue,
  onDelete,
  onChange,
}: RangeItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-string');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const options = useMemo(() => {
    if (!selectedOption.length && !defaultValue.length) {
      return selectOptions;
    }

    const selected = selectedOption.filter((item) => item && !defaultValue.includes(item));
    return selectOptions.filter((item) => !selected.includes(item.value));
  }, [selectedOption, selectOptions, defaultValue]);

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
          <InputString size="small" value={defaultValue as string[]} onChange={onValueChange} options={options} />
        </div>

        <div className={`${prefixCls}__infor__delete-icon`} onClick={onDelete}>
          <DeleteOutlined />
        </div>
      </div>
    </div>,
  );
};

export default RangeItem;
