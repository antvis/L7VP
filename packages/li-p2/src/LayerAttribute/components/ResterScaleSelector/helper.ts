import { fill } from 'lodash-es';
import type { CustomMappingData, SelectorValue } from './type';

// 获取默认展示自定义数据
export const getDefaultValue = (type: 'custom' | 'cat', defaultDomain: number[], defaultColors: string[]) => {
  const [min, max] = defaultDomain;
  // 数值类型计算均分间隔
  const _interval = (Number(max) - Number(min)) / defaultColors.length;
  // 根据 range 来确定数值长度
  const _length: number = defaultColors.length - 1 > 0 ? defaultColors.length : 0;

  if (type === 'custom') {
    // 数值类型为 custom 时 ，计算默认positions  positions.length-1 等于 colors.length
    const positions = fill(Array(_length - 1), undefined).map((_, index) => {
      const _value = Number(min) + _interval * (index + 1);
      return _value % 1 === 0 ? Number(_value) : Number(_value.toFixed(2));
    });

    return {
      type,
      positions,
      colors: defaultColors,
    };
  } else {
    // 数值类型为 cat 时 ，计算默认positions  positions.length 等于 colors.length
    const positions = fill(Array(_length), undefined).map((_, index) => {
      const _value = _interval > index ? Number(min) + index : +Number(min) + _interval * index;
      return _value % 1 === 0 ? Number(_value) : Number(_value.toFixed(2));
    });

    const defaultValue: SelectorValue = {
      type: 'cat',
      positions,
      colors: defaultColors,
    };

    return defaultValue;
  }
};

// 通过自定义颜色映射转换为 Scale 的数据格式
export const getScaleByCustomMappingData = (val: CustomMappingData) => {
  const { type, list } = val;
  const colors = list.map((item) => item.color);

  if (type === 'custom') {
    const positions = list.map((item) => Number(item.value[1])).slice(0, -1);

    const scaleValue: SelectorValue = {
      type,
      positions,
      colors,
    };

    return scaleValue;
  }

  const positions = list.map((item) => Number(item.value[0]));
  const scaleValue: SelectorValue = {
    type,
    positions,
    colors,
  };

  return scaleValue;
};

// 通过 Scale 的数据格式转换为自定义颜色映射
export const getCustomMappingData = (val: SelectorValue) => {
  const { type, positions = [], colors = [] } = val;
  if (type === 'custom') {
    const list = colors.map((item: string, index: number) => {
      return {
        value: [positions[index - 1] ?? -Infinity, positions[index] ?? Infinity],
        color: item,
      };
    });

    const customMappingData: CustomMappingData = {
      type,
      list,
    };

    return customMappingData;
  }

  const list = colors.map((item: string, index: number) => {
    return {
      color: item,
      value: [positions[index]],
    };
  });

  const customMappingData: CustomMappingData = {
    type: 'cat',
    list,
  };

  return customMappingData;
};
