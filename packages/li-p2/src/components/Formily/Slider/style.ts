import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('slider', (token) => {
  const { antCls, componentCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      justifyItems: 'center',

      [`${antCls}-slider`]: {
        flex: 1,
      },

      [`${antCls}-input-number`]: {
        width: '60px !important',
        marginLeft: '5px',
        marginTop: '5px',
        height: '100% !important',
      },
    },
  };
});
