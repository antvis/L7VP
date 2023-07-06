import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('offset', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '5px',

      [`${antCls}-input-number`]: {
        width: '70px !important',
      },
    },
  };
});
