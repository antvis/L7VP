import type { CustomItemType } from './type';

export const transformToLayer = (val: CustomItemType) => {
  const { type, thresholdType, list } = val;
  const colors = list.map((item) => item.color);
  if (thresholdType === 'number') {
    const _val = list.map((item) => item.value[1]).filter((item) => item);

    return {
      thresholdType,
      type,
      domain: _val,
      colors,
    };
  }

  if (thresholdType === 'string') {
    const _val: (string | number)[] = [];
    for (let i = 0; i < list.length; i++) {
      const item = list[i].value;
      item.forEach((_item: string | number | null, index: number) => {
        if (_item) {
          return _val.splice(i + index * colors.length, 0, _item);
        }
      });
    }

    return {
      thresholdType,
      type,
      domain: _val,
      colors,
    };
  }
};

export const transformToScale = (val: Record<string, any>) => {
  if (typeof val === 'string') {
    return val;
  }

  const { thresholdType, type, domain, colors } = val || {};
  if (thresholdType === 'number') {
    const list = colors.map((item: string, index: number) => {
      return {
        value: [domain[index - 1] ?? null, domain[index] ?? null],
        color: item,
      };
    });

    return {
      thresholdType,
      type,
      list,
    };
  }

  if (thresholdType === 'string') {
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
      thresholdType,
      type,
      list: Object.keys(result).map((key) => ({
        color: key,
        value: result[key],
      })),
    };
  }
};
