import { maxBy , fill } from 'lodash-es';
import type { CustomItemType, CustomItems, DatasetType } from './type';
import { THRESHOLD } from './constants';

export const stringToFix = (list: CustomItems[]) => {
  const colors = list.map((item) => item.color);
  const _val: (string | number)[] = [];
  const _length = maxBy(list.map((item) => item.value.length));

  for (let i = 0; i < list.length; i++) {
    // @ts-ignore
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

export const transformToLayer = (val: CustomItemType) => {
  const { type, list } = val;
  const colors = list.map((item) => item.color);
  if (type === 'number') {
    const _val = list.map((item) => item.value[1]).filter((item) => item);

    return {
      type: 'threshold',
      domain: _val,
      colors,
    };
  }

  if (type === 'string') {
    const _domain = stringToFix(list);
    return {
      type: 'cat',
      domain: _domain,
      colors,
    };
  }
};

export const transformToScale = (fieldType: 'string' | 'number', val: Record<string, any>) => {
  if (typeof val === 'string') {
    return val;
  }

  const { domain, colors } = val || {};
  if (fieldType === 'number') {
    const list = colors.map((item: string, index: number) => {
      return {
        value: [domain[index - 1] ?? null, domain[index] ?? null],
        color: item,
      };
    });

    return {
      type: THRESHOLD,
      list,
    };
  }

  if (fieldType === 'string') {
    const list = domain.map((item: string | number, index: number) => {
      return {
        value: item,
        color: colors[index % colors.length],
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
      type: THRESHOLD,
      list: Object.keys(result).map((key) => ({
        color: key,
        value: result[key].filter((item: string) => item),
      })),
    };
  }
};

// 返回默认值展示
export const getDefault = (fieldType: 'number' | 'string', dataset: DatasetType, colors: string[]) => {
  if (fieldType === 'number') {
    const { min = 0, max = 0 } = dataset;
    const _interval = (max - min) / (colors.length - 2);
    const _length: number = colors.length - 1 > 0 ? colors.length - 1 : 0;
    // @ts-ignore
    const _domain = fill(Array(_length), undefined).map((_, index) => {
      return min + _interval * index;
    });

    return {
      type: 'threshold',
      domain: _domain,
      colors: colors,
    };
  } else {
    const { list = [] } = dataset;
    const _domain = colors.map((item, index) => {
      if (index + 1 === colors.length) {
        return { color: item, value: list.slice(index).map((item) => item.value) };
      }
      return { color: item, value: [list[index].value] };
    });

    const domain = stringToFix(_domain);

    return {
      type: 'cat',
      domain,
      colors: colors,
    };
  }
};
