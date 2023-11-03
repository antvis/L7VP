export default () => {
  return {
    collapseItem_adminLabel: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: [],
      },
      properties: {
        labelstyle: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '行政标签',
          },

          properties: {
            showAdminLabel: {
              title: '显示行政标签',
              type: 'boolean',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
              default: true,
            },

            adminLabelColor: {
              type: 'string',
              title: '字体颜色',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
            },

            adminLabelFontSize: {
              type: 'number',
              title: '字号',
              'x-decorator': 'FormItem',
              'x-component': 'Slider',
              default: 12,
              'x-component-props': {
                placeholder: '字号',
              },
              'x-decorator-props': {},
            },

            adminLabelStroke: {
              type: 'string',
              title: '描边颜色',
              default: '#fff',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
            },

            adminLabelStrokeWidth: {
              type: 'number',
              title: '描边宽度',
              default: 1,
              'x-decorator': 'FormItem',
              'x-component': 'Slider',
              'x-component-props': {
                placeholder: '描边宽度',
                min: 0,
                max: 5,
              },
              'x-decorator-props': {},
            },
          },
        },
      },
    },
  };
};
