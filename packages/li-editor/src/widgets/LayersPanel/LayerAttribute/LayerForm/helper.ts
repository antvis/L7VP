import { isNumber, isString } from 'lodash-es';

export const dataFormatProcessing = ({
  dataset,
  xField,
  yField,
}: {
  dataset: Record<string, any>[];
  xField: string;
  yField: string;
}) => {
  const result: Record<string, any> = {};

  for (let i = 0; i < dataset.length; i++) {
    const item = dataset[i];

    if (result[item[`${xField}`]]) {
      result[item[`${xField}`]] = [...result[item[`${xField}`]], item[`${yField}`]];
    } else {
      result[item[`${xField}`]] = [item[`${yField}`]];
    }
  }

  const _value = Object.keys(result).map((key) => ({
    [`${xField}`]: key,
    [`${yField}`]: result[key],
  }));

  return _value.map((_item) => {
    return {
      ..._item,
      value: _item[`${xField}`],
      count: _item[`${yField}`].length,
    };
  });
};
