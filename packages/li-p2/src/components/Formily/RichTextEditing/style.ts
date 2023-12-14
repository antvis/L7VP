import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('rich-text-editing', (token) => {
  const { antCls, componentCls } = token;

  return {
    [componentCls]: {
      width: '100%',

      [`${componentCls}__btn`]: {
        width: '100%',
      },
    },
  };
});
