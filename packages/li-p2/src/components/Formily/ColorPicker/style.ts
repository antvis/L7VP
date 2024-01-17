import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-picker', (token) => {
  const { antCls, componentCls, lineWidth, lineType, colorBorder, borderRadius } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
      width: '100%',
      height: ' 32px',
      padding: '0 5px',
      backgroundColor: 'initial',
      borderWidth: `${lineWidth}px`,
      borderStyle: lineType,
      borderColor: colorBorder,
      borderRadius: `${borderRadius}px`,

      [`${componentCls}__color-block`]: {
        width: '35px',
        height: '20px',
        borderRadius: `${borderRadius}px`,
        cursor: 'pointer',
      },
    },

    [`${antCls}-popover`]: {
      [`${antCls}-color-picker-inner-panel-divider`]: {
        margin: '3px 8px !important',
      },

      [`${antCls}-color-picker-presets ${antCls}-collapse-item ${antCls}-collapse-header`]: {
        display: 'none',
      },
    },
  };
});
