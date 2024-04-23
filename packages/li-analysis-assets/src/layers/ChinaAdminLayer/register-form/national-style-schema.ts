export default () => {
  return {
    collapseItem_nationalstyle: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: [],
      },
      properties: {
        nationalStyle: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '国界线',
          },

          properties: {
            showNationalBorders: {
              title: '显示国界线',
              type: 'boolean',
              'x-decorator': 'FormItem',
              'x-component': 'Switch',
              default: true,
            },
            nationalColor: {
              type: 'string',
              title: '国界线',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
            },
            coastColor: {
              type: 'string',
              title: '海岸线',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
            },
          },
        },
      },
    },
  };
};
