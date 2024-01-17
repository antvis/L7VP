import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__custom-range__range-item', (token) => {
  const {
    componentCls,
    antCls,
    colorTextSecondary,
    colorBorder,
    colorInfoTextHover,
    controlItemBgHover,
    borderRadius,
  } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0',
      height: '32px',

      [`${componentCls}__drag-icon`]: {
        cursor: 'move',
        opacity: 0,
      },

      [`${componentCls}__infor`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',

        '&__color-content': {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '32px',
          paddingLeft: '3px',

          '&:hover': {
            borderRadius: `${borderRadius}px`,
            background: controlItemBgHover,
          },
        },

        '&__color': {
          width: '18px',
          height: '18px',
        },

        '&__input': {
          flex: 1,
          margin: '0 5px',
          cursor: 'pointer',
          border: '1px solid rgba(0,0,0,0)',
          borderRadius: '4px',
          input: {
            color: colorTextSecondary,
          },
        },

        '&__input:hover': {
          borderColor: colorBorder,
        },

        '&__delete-icon': {
          fontSize: '12px',
        },

        '&__delete-icon:hover': {
          color: colorInfoTextHover,
        },
      },
    },

    [`${antCls}-select-dropdown`]: {
      zIndex: 1,
    },

    [`${componentCls}:hover`]: {
      [`${componentCls}__drag-icon`]: {
        opacity: 1,
      },
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
