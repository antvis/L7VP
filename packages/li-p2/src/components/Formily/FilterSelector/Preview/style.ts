import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-selector-preview', (token) => {
  const { componentCls, antCls } = token;

  return {
    [componentCls]: {
      width: '100%',

      [`${antCls}-descriptions-item-content`]: {
        maxHeight: '100px',
        overflowY: 'auto',
      },
    },
  };
});
