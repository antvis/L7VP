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
          animateInterval: {
            type: 'number',
            title: '轨迹间隔',
            default: 0.8,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 1,
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
          animateDuration: {
            type: 'number',
            title: '动画时间',
            default: 4,
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
          animateTrailLength: {
            type: 'number',
            title: '轨迹长度',
            default: 1,
            'x-decorator': 'FormItem',
            'x-component': 'Slider',
            'x-component-props': {
              min: 0,
              max: 1,
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
        },
      },
    },
  };
};
