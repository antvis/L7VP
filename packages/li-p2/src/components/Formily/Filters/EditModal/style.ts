import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters', (token) => {
  const { componentCls, antCls, colorBorder, colorPrimaryActive, colorText } = token;

  return {
    [componentCls]: {
      width: '800px !important',
    },

    [`${componentCls}__content`]: {
      display: 'flex',
      minHeight: '400px',
      margin: '0 -24px',

      '&__left': {
        width: '200px',
        background: '#f5f5f5',
        borderTop: `1px solid #f5f5f5`,

        '&-selected': {
          background: colorPrimaryActive,
        },

        '&__add-filter': {
          borderBottom: `1px solid ${colorBorder}`,
          display: 'flex',
          height: '34px',
          lineHeight: '34px',
          justifyContent: 'space-between',
          paddingLeft: 15,
          paddingRight: 10,
          fontWeight: 700,
          color: colorText,
        },
      },

      '&__right': {
        flex: 1,
        border: `1px solid ${colorBorder}`,
      },
    },
  };
});
