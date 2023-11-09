import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('rester-scale-selector__custom-content__custom-item', (token) => {
  const { componentCls, antCls, colorInfoTextHover, controlItemBgHover } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      padding: '3px 2px',
      borderRadius: '4px',

      [`${componentCls}__infor`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',

        '&__color': {
          width: '32px',
          height: '18px',
        },

        '&__content': {
          flex: 1,
          width: '100%',
          overflow: 'hidden',
        },

        '&__delete-icon': {
          width: '14px',
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
