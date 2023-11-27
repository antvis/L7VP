import { isEmpty } from 'lodash-es';

export const arrayConversionObject = (initialVal: { field: string; value: string | boolean }[]) => {
  if (isEmpty(initialVal)) {
    return {};
  }

  const new_val: Record<string, string | boolean> = {};

  for (let i = 0; i < initialVal.length; i++) {
    if (initialVal[i]?.field) {
      new_val[initialVal[i].field] = initialVal[i].value;
    }
  }

  return new_val;
};
