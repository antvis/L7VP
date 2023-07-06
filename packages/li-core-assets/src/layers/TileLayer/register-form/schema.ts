import otherAttributesCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/other-attributes-collapse';

export default () => {
  return {
    collapseItem_style: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: [],
      },
      properties: {
        style: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '样式',
          },
          properties: {
            opacity: {
              type: 'number',
              title: '透明度',
              default: 1,
              'x-decorator-props': {},
              'x-decorator': 'FormItem',
              'x-component': 'Slider',
              'x-component-props': {
                min: 0,
                max: 1,
                step: 0.1,
              },
            },
          },
        },
      },
    },
    collapseItem_other: otherAttributesCollapse(),
  };
};
