import { genStyleHook } from '@formily/antd-v5/esm/__builtins__';

export default genStyleHook('color-range-selector__custom-range', (token) => {
  const { componentCls, lineWidth, lineType, colorTextSecondary, colorBorder, colorInfoTextHover } = token;

  return {
    [componentCls]: {
      [`${componentCls}__selection-item`]: {
        display: 'flex',
        alignItems: 'center',
        height: '10px',
        margin: '5px 0',
        overflow: 'hidden',
        borderRadius: '4px',

        [`${componentCls}__selection-item-color:nth-child(1)`]: {
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        },
        [`${componentCls}__selection-item-color:last-child`]: {
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
        },
      },

      [`${componentCls}__add-range-item`]: {
        cursor: 'pointer',
        color: colorTextSecondary,
        padding: '5px',
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
    },
  };
});
