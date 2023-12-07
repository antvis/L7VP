import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector__custom-string', (token) => {
  const { componentCls, antCls, colorInfoTextHover } = token;

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
        },

        '&__content': {
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          margin: '0 3px',
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
