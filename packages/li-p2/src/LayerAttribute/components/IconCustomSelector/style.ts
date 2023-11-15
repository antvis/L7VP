import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-custom-selector', (token) => {
  const { componentCls, controlItemBgHover, controlItemBgActive, colorTextBase, colorPrimaryActive } = token;

  return {
    [componentCls]: {},

    [`${componentCls}-icon-item`]: {
      display: 'flex',
      alignItems: 'center',

      '&-icon': {
        border: '1px solid #0f0',
        width: '40px',
      },

      '&-value': {
        border: '1px solid #0f0',
        flex: 1,
      },
      '&-delete': {
        width: '14px',

        '&:hover': {
          cursor: 'pointer',
          color: colorPrimaryActive,
        },
      },
    },
  };
});
