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
            nationalBorderColor: {
              type: 'string',
              title: '国界线',
              default: 'red',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
              'x-reactions': [
                {
                  dependencies: ['showNationalBorders'],
                  fulfill: {
                    state: {
                      visible: '{{ $deps[0] }}',
                    },
                  },
                },
              ],
            },
            coastBorderColor: {
              type: 'string',
              title: '海岸线',
              default: 'blue',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-decorator-props': {},
              'x-reactions': [
                {
                  dependencies: ['showNationalBorders'],
                  fulfill: {
                    state: {
                      visible: '{{ $deps[0] }}',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  };
};
