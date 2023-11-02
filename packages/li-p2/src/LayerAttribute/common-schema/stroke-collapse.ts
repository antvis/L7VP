export default () => {
  return {
    type: 'void',
    'x-component': 'FormCollapse',
    'x-component-props': {
      ghost: true,
      destroyInactivePanel: true,
      defaultActiveKey: [],
    },
    properties: {
      stroke: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: '描边',
        },
        properties: {
          strokeColor: {
            type: 'string',
            title: '颜色',
            'x-decorator': 'FormItem',
            'x-component': 'ColorPicker',
            'x-decorator-props': {},
          },

          lineWidth: {
            type: 'number',
            title: '描边宽度',
            default: 0,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 10,
              step: 0.5,
            },
            'x-decorator-props': {},
          },
          lineOpacity: {
            type: 'string',
            title: '透明度',
            default: 1,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-decorator-props': {},
            'x-component-props': {
              min: 0,
              max: 1,
              step: 0.1,
            },
          },
        },
      },
    },
  };
};
