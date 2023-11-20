import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('icon-selector', (token) => {
  const {
    antCls,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    colorTextSecondary,
    colorInfoTextHover,
    colorTextDescription,
  } = token;

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

    [`${componentCls}__header`]: {
      display: 'flex',

      '&-icon,&-field': {
        width: '25px',
        fontSize: '12px',
        color: colorTextDescription,
      },
    },

    [`${componentCls}__customItem`]: {
      margin: '10px 0',
    },

    [`${componentCls}__add-item`]: {
      fontSize: '12px !important',
      paddingLeft: '0 !important',
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
