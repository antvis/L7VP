import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { componentCls, controlItemBgActive, controlItemBgHover, colorTextDescription } = token;

  return {
    [componentCls]: {
      [`${componentCls}-dropdown`]: {
        maxHeight: 256,
        overflow: 'auto',
        position: 'relative',

        '&::-webkit-scrollbar': {
          width: 7,
          height: 7,
          appearance: 'none',
        },

        /* 滚动条的滑块按钮 */
        '&::-webkit-scrollbar-thumb': {
          background: colorTextDescription,
          borderRadius: '3px',
          cursor: 'pointer',
        },
      },

      [`${componentCls}-dropdown-container`]: {
        position: 'absolute',
        minWidth: '100%',
        paddingTop: 7,
      },

      [`${componentCls}-item`]: {
        height: '32px',
        lineHeight: '32px',
        whiteSpace: 'nowrap',
        padding: '0 12px',
        fontSize: '14px',
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
