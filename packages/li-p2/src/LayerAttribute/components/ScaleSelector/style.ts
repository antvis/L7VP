import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector', (token) => {
  const { componentCls, antCls, controlItemBgHover, controlItemBgActive, colorTextBase } = token;

  return {
    [componentCls]: {},

    [`${componentCls}-dropdown`]: {
      padding: '4px',
    },

    [`${componentCls}-select-option`]: {
      cursor: 'pointer',
      height: '32px',
      padding: '5px 12px',
      borderRadius: '4px',
      fontSize: '14px',
      color: colorTextBase,

      '&:hover': {
        background: controlItemBgHover,
      },
    },

    [`${componentCls}-select-option-selected`]: {
      background: controlItemBgActive,
    },
  };
});
