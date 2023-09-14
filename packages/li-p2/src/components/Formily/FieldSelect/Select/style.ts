import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { componentCls, controlItemBgActive, controlItemBgHover } = token;

  return {
    [componentCls]: {
      [`${componentCls}-dropdown`]: {
        maxHeight: 200,
        overflow: 'auto',
        position: 'relative',
      },

      [`${componentCls}-dropdown-container`]: {
        maxHeight: 200,
        position: 'absolute',
        minWidth: '100%',
      },

      [`${componentCls}-item`]: {
        lineHeight: '30px',
        whiteSpace: 'nowrap',
        padding: '5px 12px',
        borderRadius: 4,
        cursor: 'pointer',

        '&:hover': {
          background: controlItemBgHover,
        },

        '&_selected': {
          background: controlItemBgActive,
        },
      },
    },
  };
});
