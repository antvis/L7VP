import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-selector', (token) => {
  const { antCls, componentCls, lineWidth, lineType, colorBorder, colorTextSecondary, colorInfoTextHover } = token;

  return {
    [componentCls]: {
      [`${antCls}-select-selection-item`]: {
        display: 'flex',
        justifyContent: 'left',
        img: {
          width: '20px',
          marginRight: '10px',
        },
      },
    },

    [`${componentCls}__customItem`]: {
      margin: '10px 0',
    },

    [`${componentCls}__add-item`]: {
      paddingLeft: '0 !important',
      cursor: 'pointer',
      color: colorTextSecondary,
      marginTop: '10px',

      '&:hover': {
        color: `${colorInfoTextHover} !important`,
      },
    },

    [`${componentCls}__btn`]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'right',
      marginTop: '10px',
      paddingTop: '10px',
      textAlign: 'right',
      borderTop: `${lineWidth}px ${lineType} ${colorBorder}`,

      span: {
        marginLeft: '20px',
        color: colorTextSecondary,
        cursor: 'pointer',
      },

      'span:hover': {
        color: colorInfoTextHover,
      },
    },
  };
});
