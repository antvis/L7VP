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
      animateStyle: {
        type: 'void',
        'x-component': 'FormCollapse.CollapsePanel',
        'x-component-props': {
          header: '动画',
        },

        properties: {
          animateEnable: {
            type: 'boolean',
            title: '开启动画',
            default: false,
            'x-decorator': 'FormItem',
            'x-component': 'Switch',
          },
          animateSpeed: {
            type: 'number',
            title: '水波速度',
            default: 0.2,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 60,
              step: 0.1,
            },
            'x-reactions': [
              {
                dependencies: ['animateEnable'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0]}}',
                  },
                },
              },
            ],
          },
          animateRings: {
            type: 'number',
            title: '水波环数',
            default: 3,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 60,
              step: 1,
            },
            'x-decorator-props': {
              tooltip: '动画时间单位秒',
            },
            'x-reactions': [
              {
                dependencies: ['animateEnable'],
                fulfill: {
                  state: {
                    visible: '{{ $deps[0]}}',
                  },
                },
              },
            ],
          },
        },
      },
    },
  };
};
