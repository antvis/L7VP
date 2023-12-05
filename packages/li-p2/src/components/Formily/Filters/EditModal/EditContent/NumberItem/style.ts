import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filters-edit-modal-right-number-item', (token) => {
  const { componentCls, colorText } = token;

  return {
    [componentCls]: {
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
