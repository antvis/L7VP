import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      width: '100%',
    },

    [`${componentCls}__filter-list`]: {
      '&__btn': {
        width: '100%',
      },
    },
  };
});
