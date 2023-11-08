import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('slider', (token) => {
  const { antCls, componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      justifyItems: 'center',
      alignItems: 'center',

      [`${antCls}-slider`]: {
        flex: 1,
      },

      [`${antCls}-input-number`]: {
        width: '60px !important',
        height: '100% !important',
        marginLeft: '5px',
      },
    },
  };
});
