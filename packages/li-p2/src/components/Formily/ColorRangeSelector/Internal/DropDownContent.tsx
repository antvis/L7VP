import { useMemoizedFn } from 'ahooks';
import React, { useEffect, useMemo, useState } from 'react';
import ColorPaletteGroup from './ColorPaletteGroup';
import { getColorGroupByName } from './constants';
import CustomRange from './CustomRange';
import type { PaletteConfigProps } from './PaletteConfig';
import PaletteConfig from './PaletteConfig';
import type { ColorRange, SelectorValue } from './types';

export interface DropDownContentProps {
  /**
   * 是否开启
   */
  isOpen: boolean;
  /**
   * 颜色值
   */
  selectedValue: SelectorValue;
  /**
   * 色带数组
   */
  colorRanges: ColorRange[];
  /**
   * 选择发生改变时
   */
  onChange?: (val: SelectorValue) => void;
}

const DropDownContent = (props: DropDownContentProps) => {
  const { isOpen, colorRanges, selectedValue } = props;

  const [paletteConfig, setPaletteConfig] = useState<{
    type: string;
    steps: number;
  }>({
    type: 'all',
    steps: selectedValue.colors.length || 6,
  });

  // 自定义调色板是否开启
  const [customPaletteOpen, setCustomPaletteOpen] = useState(false);

  // 颜色列表
  const colorRangeList = useMemo(() => {
    let list = [];

    list = colorRanges.filter((item) => item.colors?.length === paletteConfig.steps);

    if (paletteConfig.type !== 'all') {
      list = list.filter((item) => item.type === paletteConfig.type);
    }

    return list;
  }, [colorRanges, paletteConfig]);

  // 数量
  const colorRangeStepOptions = useMemo(() => {
    const rangeSteps: { value: number; label: number }[] = [];
    const list =
      paletteConfig.type === 'all' ? colorRanges : colorRanges.filter((item) => item.type === paletteConfig.type);

    list.forEach((item) => {
      if (rangeSteps.findIndex((_item) => _item.value === item.colors?.length) !== -1) {
        return;
      }

      rangeSteps.push({ value: item.colors?.length, label: item.colors?.length });
    });

    return rangeSteps;
  }, [paletteConfig.type, colorRanges]);

  const onPaletteConfigChange = (config: Record<string | number, any>) => {
    setPaletteConfig((pre) => ({ ...pre, ...config }));
  };

  const onIsReversedChange = useMemoizedFn(({ isReversed }: { isReversed: boolean }) => {
    props.onChange?.({
      isReversed,
      colors: selectedValue.colors.slice().reverse(),
    });
  });

  const onSelectValueChange = (color: string[]) => {
    props.onChange?.({
      isReversed: selectedValue.isReversed,
      colors: selectedValue.isReversed ? color.slice().reverse() : color,
    });
  };

  const onCustomPaletteChange = ({ customPalette }: { customPalette: boolean }) => {
    setCustomPaletteOpen(customPalette);
  };

  const onRangesChange = (value: string[]) => {
    props.onChange?.({
      isReversed: selectedValue.isReversed,
      colors: value,
    });
  };

  // steps 更新 => colorRangeList 更新，需自动更新选中相同类型的色带
  useEffect(() => {
    if (selectedValue.colors.length !== paletteConfig.steps) {
      const selectColors = selectedValue.isReversed ? selectedValue.colors.slice().reverse() : selectedValue.colors;
      const selectRange = colorRanges.find((item) => item.colors.toString() === selectColors.toString());
      const rangeSelectedName = selectRange && getColorGroupByName(selectRange);
      if (!rangeSelectedName) return;

      const ranges = colorRangeList.find((item) => getColorGroupByName(item) === rangeSelectedName);
      if (ranges) {
        props.onChange?.({
          isReversed: selectedValue.isReversed,
          colors: selectedValue.isReversed ? ranges.colors.slice().reverse() : ranges.colors,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorRangeList]);

  // 配置项 list
  const paletteConfigList: PaletteConfigProps[] = useMemo(() => {
    const list: PaletteConfigProps[] = [
      {
        id: 'type',
        label: '类型',
        type: 'select',
        value: paletteConfig.type,
        config: {
          options: [
            { value: 'all', label: '全部' },
            { value: 'sequential', label: '连续' },
            { value: 'singlehue', label: '单色' },
            { value: 'qualitative', label: '分类' },
            { value: 'diverging', label: '发散' },
          ],
        },
        onChange: onPaletteConfigChange,
      },
      {
        id: 'steps',
        label: '数量',
        type: 'select',
        value: paletteConfig.steps,
        config: {
          options: colorRangeStepOptions,
        },
        onChange: onPaletteConfigChange,
      },
      {
        id: 'isReversed',
        label: '反转',
        type: 'switch',
        value: selectedValue.isReversed!,
        config: {},
        onChange: onIsReversedChange,
      },
      {
        id: 'customPalette',
        label: '自定义',
        type: 'switch',
        value: customPaletteOpen,
        config: {},
        onChange: onCustomPaletteChange,
      },
    ];
    if (customPaletteOpen) {
      return list.filter((item) => item.id === 'customPalette');
    }
    return list;
  }, [colorRangeStepOptions, paletteConfig, selectedValue, customPaletteOpen, onIsReversedChange]);

  const ContentRender = useMemo(() => {
    return customPaletteOpen ? (
      <CustomRange
        ranges={selectedValue.colors}
        onChange={onRangesChange}
        onCancel={() => {
          onCustomPaletteChange({ customPalette: false });
        }}
      />
    ) : (
      <ColorPaletteGroup
        colorRange={colorRangeList}
        selectedValue={selectedValue.colors}
        isReversed={selectedValue.isReversed ?? false}
        onChange={(color) => {
          onSelectValueChange(color);
        }}
      />
    );
  }, [colorRangeList, customPaletteOpen, selectedValue]);

  if (!isOpen) {
    return null;
  }

  return (
    <div style={{ padding: '0 10px' }}>
      {paletteConfigList.map((item) => (
        <PaletteConfig key={item.id} {...item} />
      ))}

      {ContentRender}
    </div>
  );
};

export default DropDownContent;
