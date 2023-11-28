import type { FuncItem } from './index';

export const getValue = (funList: FuncItem[]) => {
  const funs: Record<string, any> = {};

  funList.forEach((item) => {
    if (item.key === 'success-func') {
      funs.onComplete = {
        value: item.value.toString(),
        type: 'JSFunction',
      };
    } else {
      funs.onError = {
        value: item.value.toString(),
        type: 'JSFunction',
      };
    }
  });

  return funs;
};
