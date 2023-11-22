import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-custom-selector-icon-list-content', (token) => {
  const { componentCls } = token;

  return {
    [componentCls]: {
      '&__icon-content': {
        marginBottom: '10px',

        '&__header': {
          fontWeight: 500,
        },

        '&__img': {
          display: 'flex',
          flexWrap: 'wrap',

          '&:hover': {
            cursor: 'pointer',
          },

          img: {
            width: '20px',
            height: '20px',
            margin: '5px',
          },
        },
      },
    },
  };
});
