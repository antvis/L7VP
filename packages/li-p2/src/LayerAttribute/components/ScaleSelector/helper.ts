import { fill, maxBy } from 'lodash-es';
import { CUSTOM } from './constants';
import type { CustomItems, CustomItemType, SelectorValue } from './type';

// 当字段类型为string时，传递外部时 domain 结构转化
export const stringToFix = (list: CustomItems[]) => {
  const colors = list.map((item) => item.color);
  const _val: (string | number)[] = [];
  const _length = maxBy(list.map((item) => item.value.length));

  for (let i = 0; i < list.length; i++) {
    const item =
      list[i].value.length === _length
        ? list[i].value
        : fill(Array(_length), undefined).map((_, index) => {
            return list[i].value[index];
          });

    item.forEach((_item: string | number | null, index: number) => {
      // @ts-ignore
      return _val.splice(i + index * colors.length, 0, _item);
    });
  }
  return _val;
};

// 将组件内部数据结构转化为图层数据
export const transformToLayer = (val: CustomItemType) => {
  const { type, list } = val;
  const range = list.map((item) => item.color);
  if (type === 'number') {
    const _val = list.map((item) => item.value[1]).filter((item) => item);

    return {
      type: 'threshold',
      domain: _val,
      range,
    } as SelectorValue;
  }

  const _domain = stringToFix(list);
  return {
    type: 'cat',
    domain: _domain,
    range,
  } as SelectorValue;
};

// 将图层数据转化为组件内部数据结构
export const transformToScale = (dataType: 'string' | 'number', val: SelectorValue) => {
  if (!val) {
    return undefined;
  }

  const isCustom = val.type === 'threshold' || (val.type === 'cat' && val.domain?.length !== 0);
  if (!isCustom) {
    return val;
  }

  const { domain = [], range = [] } = val || {};
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
      color: range[index % range.length],
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

// 获取默认展示自定义数据
export const getDefaultValue = (
  dataType: 'number' | 'string',
  domain: [number, number] | string[],
  range: string[],
) => {
  if (dataType === 'number') {
    const [min, max] = domain as [number, number];
    // 数值类型计算均分间隔
    const _interval = (max - min) / range.length;
    // 根据 range 来确定数值长度
    const _length: number = range.length - 1 > 0 ? range.length - 1 : 0;
    const _domain = fill(Array(_length), undefined).map((_, index) => {
      return (min + _interval * index + 1).toFixed(2);
    });

    return {
      type: 'threshold',
      domain: _domain,
      range,
    } as SelectorValue;
  } else {
    // 数值类型为 string 时
    const _domain = range.map((item, index) => {
      if (index + 1 === range.length) {
        return { color: item, value: domain.slice(index).map((item) => item) };
      }
      return { color: item, value: [domain[index]] };
    });

    return {
      type: 'cat',
      domain: stringToFix(_domain),
      range,
    } as SelectorValue;
  }
};
