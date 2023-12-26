import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-setting-date', (token) => {
  const { componentCls, antCls, colorPrimary, colorPrimaryHover, colorTextDescription } = token;

  return {
    [componentCls]: {
      display: 'flex',
    },

    [`${componentCls}__item`]: {
      marginRight: '10px',

      '&__info': {
        color: colorPrimary,

        '&:hover': {
          color: colorPrimaryHover,
        },
      },
    },
  };
});
