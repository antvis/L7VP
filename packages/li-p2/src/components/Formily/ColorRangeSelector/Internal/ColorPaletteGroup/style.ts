import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('formily-color-range-selector__color-palette-group', (token) => {
  const { componentCls, controlItemBgHover, controlItemBgActive, borderRadiusOuter } = token;

  return {
    [componentCls]: {
      '&__item': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '20px',
        padding: '10px 4px',
        cursor: 'pointer',
        margin: '5px 0',

        span: {
          height: '10px',
          border: 0,
        },

        'span:first-child': {
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        },

        'span:last-child': {
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      },

      '&__item:hover': {
        background: controlItemBgHover,
        borderRadius: borderRadiusOuter,
      },

      '&__item--selected': {
        background: controlItemBgActive,
        borderRadius: borderRadiusOuter,
      },
    },
  };
});
