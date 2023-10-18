import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector', (token) => {
  const { componentCls, controlItemBgHover, controlItemBgActive, colorTextBase } = token;

  return {
    [componentCls]: {},

    [`${componentCls}-dropdown`]: {
      padding: '4px',

      [`${componentCls}-custom`]: {
        padding: '5px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      [`${componentCls}-customcontent`]: {
        padding: '5px 12px',
      },
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
