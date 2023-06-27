import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Select } from 'antd';
import cls from 'classnames';
import { isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import { DEFAULT_VALUE } from './constants';
import { COLOR_RANGES } from './constants/color-ranges';
import DropDownContent from './DropDownContent';
import useStyle from './style';
import type { ColorRange, SelectorValue } from './types';

export interface ColorRangeSelectorProps {
  /**
   * 颜色值
   */
  value?: SelectorValue;
  /**
   * 色带组选项
   */
  options?: ColorRange[];
  /**
   * 选择发生改变时
   */
  onChange?: (val: SelectorValue) => void;
}

const Internal = (props: ColorRangeSelectorProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const colorRanges = props.options && props.options.length ? props.options : COLOR_RANGES;

  const selectedValue = useMemo(() => {
    if (isUndefined(props.value) || isUndefined(props.value.colors)) {
      return DEFAULT_VALUE;
    }

    return props.value;
  }, [props.value]);

  const [open, setOpen] = useState(false);

  return wrapSSR(
    <Select
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      value={selectedValue.colors.toString()}
      dropdownStyle={{ display: open ? 'block' : 'none' }}
      dropdownRender={() => (
        <DropDownContent
          isOpen={open}
          colorRanges={colorRanges}
          selectedValue={selectedValue}
          onChange={props.onChange}
        />
      )}
    >
      {[selectedValue].map((item) => {
        const colorList = item.colors;
        if (colorList.length === 0) return;

        return (
          <Select.Option key={colorList.toString()} value={colorList.toString()}>
            <div className={`${prefixCls}__selection-item`}>
              {colorList.map((color) => (
                <span
                  key={color}
                  className={`${prefixCls}__selection-item-color`}
                  style={{
                    backgroundColor: color,
                    height: '22px',
                    width: `${100 / colorList.length}%`,
                  }}
                />
              ))}
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default Internal;
