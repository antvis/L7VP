import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('scale-selector', (token) => {
  const { componentCls, controlItemBgHover, controlItemBgActive, colorTextBase } = token;

  return {
    [`${componentCls}-dropdown`]: {
      padding: '4px',

      [`${componentCls}-custom`]: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },

    [`${componentCls}-select-option`]: {
      cursor: 'pointer',
      height: '32px',
      padding: '5px',
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
