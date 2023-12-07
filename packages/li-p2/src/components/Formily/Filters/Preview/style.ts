import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters-preview', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      display: 'inline-block',
      width: '100%',
      marginBottom: '10px',
    },
  };
});
