import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import React from 'react';
import type { ColorRange } from '../types';
import useStyle from './style';

export type ColorPaletteGroupProps = {
  colorRange: ColorRange[];
  selectedValue: string[];
  isReversed: boolean;
  onChange: (color: string[]) => void;
};

type ColorPaletteGroupItemProps = {
  key: string;
  color: string[];
  onClick: () => void;
};

const ColorPaletteGroup = (props: ColorPaletteGroupProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector__color-palette-group');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { colorRange, selectedValue, isReversed, onChange } = props;

  const ColorPaletteGroupItem = (item: ColorPaletteGroupItemProps) => {
    const { color, ...prop } = item;

    return (
      <div
        {...prop}
        className={classnames(`${prefixCls}__item`, hashId, {
          [`${prefixCls}__item--selected`]: color.toString() === selectedValue.toString(),
        })}
      >
        {color.map((colorItem: string, index: number) => (
          <span key={`${colorItem}-${index}`} style={{ backgroundColor: colorItem, width: `${100 / color.length}%` }} />
        ))}
      </div>
    );
  };

  return wrapSSR(
    <div className={classnames(prefixCls, hashId)}>
      {colorRange.map((colorArr: ColorRange, index: number) => {
        return (
          <ColorPaletteGroupItem
            key={index.toString()}
            color={isReversed ? colorArr.colors.slice().reverse() : colorArr.colors}
            onClick={() => onChange(colorArr.colors)}
          />
        );
      })}
    </div>,
  );
};

export default ColorPaletteGroup;
