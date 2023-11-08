import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('slider-range', (token) => {
  const { antCls, componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      width: '100%',

      [`${componentCls}__input-number`]: {
        display: 'flex',
        justifyContent: 'space-between',
      },

      [`${antCls}-slider`]: {
        flex: 1,
      },

      [`${antCls}-input-number`]: {
        width: '60px !important',
        margin: 0,
      },
    },
  };
});
