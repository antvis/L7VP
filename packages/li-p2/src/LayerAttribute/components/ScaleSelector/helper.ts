import { fill } from 'lodash-es';
import { CUSTOM } from './constants';
import type { CustomItems, CustomMappingData, SelectorValue } from './type';

// 字符映射转化
const arrayToMap = (list: CustomItems[]) => {
  const mapList: { color: string; value: string }[] = [];
  list.forEach((item) => {
    item.value.forEach((_item) => {
      mapList.push({ color: item.color, value: _item as string });
    });
  });

  return {
    domain: mapList.map((item) => item.value),
    range: mapList.map((item) => item.color),
  };
};

// 获取默认展示自定义数据
export const getDefaultValue = (
  dataType: 'number' | 'string',
  defaultDomain: [number, number] | string[],
  range: string[],
) => {
  if (dataType === 'number') {
    const [min, max] = defaultDomain as [number, number];
    // 数值类型计算均分间隔
    const _interval = (max - min) / range.length;
    // 根据 range 来确定数值长度
    const _length: number = range.length - 1 > 0 ? range.length - 1 : 0;
    const _domain = fill(Array(_length), undefined).map((_, index) => {
      const _value = min + _interval * index + 1;
      return _value % 1 === 0 ? _value : _value.toFixed(2);
    });

    return {
      isCustom: true,
      type: 'threshold',
      domain: _domain,
      range,
    } as SelectorValue;
  } else {
    // 数值类型为 string 时
    const _domain = range.map((item, index) => {
      if (index + 1 === range.length) {
        return { color: item, value: defaultDomain.slice(index) };
      }
      return { color: item, value: [defaultDomain[index]] };
    });

    const { domain, range: colors } = arrayToMap(_domain);

    return {
      isCustom: true,
      type: 'cat',
      domain,
      range: colors,
    } as SelectorValue;
  }
};

// 将组件内部数据结构转化为图层数据
export const transformToLayer = (val: CustomMappingData) => {
  const { type, list } = val;

  if (type === 'number') {
    const range = list.map((item) => item.color);
    const _val = list.map((item) => item.value[1]).filter((item) => item);

    const layerValue = {
      isCustom: true,
      type: 'threshold',
      domain: _val,
      range,
    } as SelectorValue;

    return layerValue;
  }

  const { domain, range } = arrayToMap(list);
  const layerValue = {
    isCustom: true,
    type: 'cat',
    domain,
    range,
  } as SelectorValue;

  return layerValue;
};

// 将图层数据转化为组件内部数据结构
export const transformToScale = (dataType: 'string' | 'number', val: SelectorValue) => {
  const isCustom = val.type === 'threshold' || (val.type === 'cat' && val.domain && val.domain.length !== 0);

  if (!isCustom) {
    return val;
  }

  const { domain = [], range = [] } = val;
  if (dataType === 'number') {
    const list = range.map((item: string, index: number) => {
      return {
        value: [domain[index - 1] ?? null, domain[index] ?? null],
        color: item,
      };
    });

    return {
      type: CUSTOM,
      list,
    };
  }

  const list = domain.map((item: string | number, index: number) => {
    return {
      value: item,
      color: range[index],
    };
  });

  const result: Record<string, any> = {};
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (result[item.color]) {
      result[item.color] = [...result[item.color], item.value];
    } else {
      result[item.color] = [item.value];
    }
  }

  return {
    type: CUSTOM,
    list: Object.keys(result).map((key) => ({
      color: key,
      value: result[key].filter((item: string) => item),
    })),
  };
};
