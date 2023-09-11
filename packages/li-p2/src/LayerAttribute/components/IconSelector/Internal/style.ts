import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';
import type { CSSInterpolation } from '@ant-design/cssinjs';

export default genStyleHook('icon-selector', (token) => {
  const { componentCls, antCls, colorBgBase } = token;

  return {
    [componentCls]: {
      [`${componentCls}__select-list`]: {
        paddingBottom: '10px !important',
        ' &.ant-select-dropdown': {
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          maxHeight: 280,
          padding: '12px 0 0 12px',
          overflowY: 'auto',
          backgroundColor: colorBgBase,
          borderRadius: '4px',
        },
        '&_hidden': {
          display: 'none',
        },
        '.rc-virtual-list-holder-inner': {
          flexDirection: 'row !important',
          flexWrap: 'wrap',
        },
        [`${antCls}-select-selection-item`]: {
          display: 'flex',
          flexDirection: 'row',
        },
        [`${antCls}-select-item-option`]: {
          margin: 5,
          borderRadius: '4px',
        },
      },

      [`${antCls}-select-selection-item`]: {
        display: 'flex',
        flexDirection: 'row',
      },

      [`${componentCls}__selection-item`]: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      },
    },
  } as CSSInterpolation;
});
