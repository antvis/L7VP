import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import React, { useEffect, useMemo } from 'react';
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

  // 判断是否存在于筛选出来的色带中，如果是自定义则不存在于色带，单独加一条展示自定义
  const isExist = useMemo(() => {
    const _colors = isReversed ? selectedValue.slice().reverse().toString() : selectedValue.toString();
    return colorRange.find((item) => item.colors.toString() === _colors && item.colors.length === selectedValue.length);
  }, [selectedValue, colorRange]);

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
      {!isExist && (
        <ColorPaletteGroupItem
          key={selectedValue.toString()}
          color={selectedValue}
          onClick={() => onChange(selectedValue)}
        />
      )}
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
