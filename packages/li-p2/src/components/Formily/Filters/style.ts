import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters', (token) => {
  const { componentCls, antCls, borderRadius } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      width: '100%',
    },

    [`${componentCls}__filter-list`]: {
      padding: '10px',

      '&__btn': {
        width: '100%',
      },
    },
  };
});
