import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-content__custom-number__input', (token) => {
  const { componentCls, antCls, colorTextDescription, colorBorder, lineType } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      padding: '5px 0',
      borderRadius: '4px',

      [`${componentCls}__infor`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',

        '&__color': {
          width: '18px',
          height: '18px',
          border: `1px ${colorBorder} ${lineType}`,
          borderRadius: '4px',
        },

        '&__content': {
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          margin: '0 3px',
        },

        '&__delete-icon': {
          width: '14px',
          padding: 0,
          color: colorTextDescription,
        },
      },
    },

    [`${antCls}-select-dropdown`]: {
      zIndex: 1,
    },

    [`${antCls}-popover`]: {
      zIndex: '4 !important',
      [`${antCls}-color-picker-presets ${antCls}-collapse-item ${antCls}-collapse-header`]: {
        display: 'none',
      },
    },

    [`${antCls}-color-picker ${antCls}-color-picker-panel ${antCls}-color-picker-inner-panel-divider`]: {
      margin: '3px 8px ',
    },
  };
});
