import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('field-select', (token) => {
  const { componentCls, colorPrimaryActive, colorPrimaryHover } = token;

  return {
    [componentCls]: {
      [`${componentCls}-dropdown`]: {
        maxHeight: 300,
        overflow: 'auto',
        position: 'relative',
      },

      [`${componentCls}-item`]: {
        lineHeight: '30px',
        whiteSpace: 'nowrap',
        padding: '5px 12px',
        borderRadius: 4,
        cursor: 'pointer',

        '&:hover': {
          color: colorPrimaryHover,
        },

        '&_selected': {
          color: colorPrimaryActive,
        },
      },
    },
  };
});
