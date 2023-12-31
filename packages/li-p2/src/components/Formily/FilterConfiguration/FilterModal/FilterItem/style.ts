import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('filter-setting-filter-item', (token) => {
  const { componentCls, colorPrimary } = token;

  return {
    [componentCls]: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 10px 5px 0',
      height: '32px',

      [`${componentCls}__drag-icon`]: {
        cursor: 'move',
        opacity: 0,
      },

      [`${componentCls}__infor`]: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        cursor: 'pointer',

        '&__field': {
          width: '100%',
        },

        '&__delete-icon': {
          fontSize: '12px',
          marginLeft: '5px',
          opacity: 0,
        },

        '&__delete-icon:hover': {
          color: colorPrimary,
        },
      },
    },

    [`${componentCls}:hover`]: {
      [`${componentCls}__drag-icon`]: {
        opacity: 1,
      },

      [`${componentCls}__infor__delete-icon`]: {
        opacity: 1,
      },
    },
  };
});
