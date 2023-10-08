import type { CustomItemType } from './type';

export const transformToLayer = (val: CustomItemType) => {
  const { type, scaleType, list } = val;
  const colors = list.map((item) => item.color);
  if (type === 'number') {
    const _val = Array.from(new Set(list.map((item) => item.value).flat())).filter((item) => item);
    return {
      scaleType,
      type,
      domain: _val,
      colors,
    };
  }

  if (type === 'string') {
    const _val: (string | number)[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i].value;
      item.forEach((_item: string | number, index: number) => {
        return _val.splice(i + index * 2, 0, _item);
      });
    }

    return {
      scaleType,
      type,
      domain: _val,
      colors,
    };
  }
};

export const transformToScale = (val: Record<string, any>) => {
  const { scaleType, type, domain, colors } = val;
  if (type === 'number') {
    const list = colors.map((item: string, index: number) => {
      return {
        value: [domain[index - 1], domain[index]],
        color: item,
      };
    });

    return {
      scaleType,
      type,
      list,
    };
  }

  if (type === 'string') {
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
      scaleType,
      type,
      list: Object.keys(result).map((key) => ({
        color: key,
        value: result[key],
      })),
    };
  }
};
