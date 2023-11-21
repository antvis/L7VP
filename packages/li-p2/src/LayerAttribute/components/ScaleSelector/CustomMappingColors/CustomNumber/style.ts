import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__custom-number', (token) => {
  const { componentCls, colorTextSecondary } = token;

  return {
    [componentCls]: {
      [`${componentCls}__add-range-item`]: {
        cursor: 'pointer',
        color: colorTextSecondary,
        padding: '5px',
      },
    },
  };
});
