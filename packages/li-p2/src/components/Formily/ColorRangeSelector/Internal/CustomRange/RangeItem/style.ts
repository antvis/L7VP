import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__custom-range__range-item', (token) => {
  const { componentCls, antCls, colorTextSecondary, colorBorder, colorInfoTextHover, controlItemBgHover } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      padding: '3px 0',

      [`${componentCls}__drag-icon`]: {
        margin: '3px',
        cursor: 'move',
        opacity: 0,
      },

      [`${componentCls}__infor`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '24px',
        cursor: 'pointer',

        '&__color': {
          width: '32px',
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
          marginRight: '3px',
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
      borderRadius: 4,
      background: controlItemBgHover,
      [`${componentCls}__drag-icon`]: {
        opacity: 1,
      },
    },

    '.ant-popover': {
      zIndex: '4 !important',
      '.ant-color-picker-presets .ant-collapse-item .ant-collapse-header': {
        display: 'none',
      },
    },

    '.ant-color-picker .ant-color-picker-panel .ant-color-picker-inner-panel-divider': {
      margin: '3px 8px ',
    },
  };
});
