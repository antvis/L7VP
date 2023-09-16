import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('ribbon-select', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      [`${componentCls}__selection-item`]: {
        display: 'flex',
        alignItems: 'center',
        height: '100%',
      },
    },
  };
});
