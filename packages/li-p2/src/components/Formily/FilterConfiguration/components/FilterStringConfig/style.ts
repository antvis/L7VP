import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-string-config', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      position: 'relative',

      [`${antCls}-select-selection-overflow`]: {
        display: 'none',
      },
    },

    [`${componentCls}__title`]: {
      textAlign: 'left',
      paddingRight: '15px',
      paddingLeft: '5px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      height: '32px',
      lineHeight: '32px',
      position: 'absolute',
      width: '100%',
      zIndex: 0,
    },
  };
});
