import { fill } from 'lodash-es';
import { CUSTOM } from './constants';
import type { CustomMappingColorItem, CustomMappingData, SelectorValue } from './type';

// 通过自定义颜色映射转换为 Scale 的 domain 与 range 数据
const getScaleDataByMappingColors = (list: CustomMappingColorItem[]) => {
  const mapList: { color: string; value: string }[] = [];
  list.forEach((item) => {
    item.value.forEach((_item) => {
      if (_item) {
        mapList.push({ color: item.color, value: typeof _item === 'string' ? _item : _item.toString() });
      }
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
    const [min, max] = defaultDomain;
    // 数值类型计算均分间隔
    const _interval = (Number(max) - Number(min)) / range.length;
    // 根据 range 来确定数值长度
    const _length: number = range.length - 1 > 0 ? range.length - 1 : 0;
    const _domain = fill(Array(_length), undefined).map((_, index) => {
      const _value = Number(min) + _interval * (index + 1);
      return _value % 1 === 0 ? Number(_value) : Number(_value.toFixed(2));
    });

    const defaultValue: SelectorValue = {
      isCustom: true,
      type: 'threshold',
      domain: _domain,
      range,
    };

    return defaultValue;
  } else {
    // 数值类型为 string 时
    const _domain = range.map((item, index) => {
      if (index + 1 === range.length) {
        return { color: item, value: defaultDomain.slice(index) };
      }
      return { color: item, value: [defaultDomain[index]] };
    });

    const { domain, range: colors } = getScaleDataByMappingColors(_domain);

    const defaultValue: SelectorValue = {
      isCustom: true,
      type: 'cat',
      domain,
      range: colors,
    };

    return defaultValue;
  }
};

// 通过自定义颜色映射转换为 Scale 的数据格式
export const getScaleByCustomMappingData = (val: CustomMappingData) => {
  const { type, list } = val;

  if (type === 'number') {
    const range = list.map((item) => item.color);
    const _val = list.map((item) => Number(item.value[1])).filter((item) => item);

    const scaleValue: SelectorValue = {
      isCustom: true,
      type: 'threshold',
      domain: _val,
      range,
    };

    return scaleValue;
  }

  const { domain, range } = getScaleDataByMappingColors(list);
  const scaleValue: SelectorValue = {
    isCustom: true,
    type: 'cat',
    domain,
    range,
  };

  return scaleValue;
};

// 通过 Scale 的数据格式转换为自定义颜色映射
export const getCustomMappingData = (dataType: 'string' | 'number', val: SelectorValue) => {
  if (!val.isCustom) {
    return undefined;
  }

  const { domain = [], range = [] } = val;
  if (dataType === 'number') {
    const list = range.map((item: string, index: number) => {
      return {
        value: [domain[index - 1] ?? null, domain[index] ?? null],
        color: item,
      };
    });

    const customMappingData: CustomMappingData = {
      type: CUSTOM,
      list,
    };

    return customMappingData;
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

  const customMappingData: CustomMappingData = {
    type: CUSTOM,
    list: Object.keys(result).map((key) => ({
      color: key,
      value: result[key],
    })),
  };

  return customMappingData;
};
