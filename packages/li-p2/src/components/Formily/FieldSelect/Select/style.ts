import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { antCls, componentCls, controlItemBgActive, controlItemBgHover, controlHeight, lineWidth } = token;
  const selectHeightWithoutBorder = controlHeight - lineWidth * 2;

  return {
    [`${componentCls}-select`]: {
      [`${antCls}-select-selection-item`]: {
        height: selectHeightWithoutBorder,
      },
    },

    [componentCls]: {
      [`${componentCls}-dropdown`]: {
        maxHeight: 256,
        overflow: 'auto',
        position: 'relative',
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
