import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__palette-config-item', (token) => {
  const { componentCls, colorTextSecondary } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '40px',
      color: colorTextSecondary,
      borderRadius: '2px',

      [`${componentCls}__name`]: {
        minWidth: '60px',
      },

      [`${componentCls}__select`]: {
        width: '80px !important',
      },
    },
  };
});
