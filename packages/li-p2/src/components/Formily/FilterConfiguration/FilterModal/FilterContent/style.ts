import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-setting-content', (token) => {
  const { componentCls, colorText } = token;

  return {
    [componentCls]: {
      width: '100%',
      padding: '12px 12px 0',

      '&__filter': {
        marginBottom: '8px',
      },

      '&__field': {
        fontSize: '12px',
        fontWeight: 700,
        color: colorText,
        height: '20px',
        lineHeight: '20px',
        marginBottom: '8px',
      },
    },
  };
});
