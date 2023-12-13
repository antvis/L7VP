import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-selector', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      width: '100%',
    },

    [`${componentCls}__list`]: {
      '&__btn': {
        width: '100%',
      },
    },
  };
});
