import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-picker', (token) => {
  const { componentCls, lineWidth, lineType, colorBorder } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: '100%',
      height: ' 32px',
      padding: '0 5px',
      backgroundColor: 'initial',
      borderWidth: lineWidth,
      borderStyle: lineType,
      borderColor: colorBorder,
      borderRadius: '2px',

      [`${componentCls}__color-block`]: {
        width: '35px',
        height: '20px',
        borderRadius: '2px',
        cursor: 'pointer',
      },
    },

    '.ant-popover': {
      '.ant-color-picker-inner-panel-divider': {
        margin: '3px 8px !important',
      },
      '.ant-color-picker-presets .ant-collapse-item .ant-collapse-header': {
        display: 'none',
      },
    },
  };
});
