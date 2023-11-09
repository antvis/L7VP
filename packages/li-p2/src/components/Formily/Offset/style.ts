import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('offset', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      verticalAlign: 'middle',
      width: '100%',

      [`${componentCls}__input-group`]: {
        display: 'flex ',
        justifyContent: 'space-between',

        [`${antCls}-input-number`]: {
          width: '70px !important',
        },
      },
    },
  };
});
