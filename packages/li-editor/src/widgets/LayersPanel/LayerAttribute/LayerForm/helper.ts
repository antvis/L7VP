export const dataFormatProcessing = ({
  dataset,
  label,
  value,
}: {
  dataset: Record<string, any>[];
  label: string;
  value: string;
}) => {
  const result: Record<string, any> = {};

  for (let i = 0; i < dataset.length; i++) {
    const item = dataset[i];

    if (result[item[`${label}`]]) {
      result[item[`${label}`]] = [...result[item[`${label}`]], item[`${value}`]];
    } else {
      result[item[`${label}`]] = [item[`${value}`]];
    }
  }

  const _value = Object.keys(result).map((key) => ({
    [`${label}`]: key,
    [`${value}`]: result[key],
  }));

  return _value.map((_item) => {
    return {
      ..._item,
      value: _item[`${label}`],
      count: _item[`${value}`].length,
    };
  });
};
