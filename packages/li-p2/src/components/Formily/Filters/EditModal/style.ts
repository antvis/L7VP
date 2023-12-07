import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters-edit-modal', (token) => {
  const {
    componentCls,
    colorBorder,
    colorText,
    colorBgContainer,
    colorBgTextHover,
    controlItemBgActive,
    colorPrimary,
  } = token;

  return {
    [componentCls]: {
      width: '800px !important',
    },

    [`${componentCls}__content`]: {
      display: 'flex',
      minHeight: '400px',
      margin: '0 -24px',
      border: `1px solid ${colorBorder}`,

      '&__left': {
        width: '200px',
        background: colorBgContainer,

        '&-item': {
          '&:hover': {
            background: colorBgTextHover,
          },
        },

        '&-selected': {
          background: controlItemBgActive,
          color: colorPrimary,
          '&:hover': {
            background: controlItemBgActive,
          },
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
          '&-btn': {
            cursor: 'pointer',
            '&:hover': {
              color: colorPrimary,
            },

            '&_disabled': {
              display: 'none',
            },
          },
        },
      },

      '&__right': {
        flex: 1,
        borderLeft: `1px solid ${colorBorder}`,
      },
    },
  };
});
