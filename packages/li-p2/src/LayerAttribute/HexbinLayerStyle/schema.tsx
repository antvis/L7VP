import fillColorCollapse from '../common-schema/grid-hexbin-color-collapse';
import otherAttributesCollapse from '../common-schema/other-attributes-collapse';
import type { AttributeSchemaOptions } from '../types';

export default (options: AttributeSchemaOptions = {}) => {
  return {
    type: 'object',
    properties: {
      collapseItem_fillColor: fillColorCollapse(options),
      collapseItem_fillSize: {
        type: 'void',
        'x-component': 'FormCollapse',
        'x-component-props': {
          ghost: true,
          destroyInactivePanel: true,
          defaultActiveKey: [],
        },
        properties: {
          fillSize: {
            type: 'void',
            'x-component': 'FormCollapse.CollapsePanel',
            'x-component-props': {
              header: '半径',
            },

            properties: {
              aggregateSize: {
                type: 'number',
                title: '蜂窝半径',
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  dots: false,
                  range: false,
                  max: 500,
                  step: 1,
                  min: 0,
                },
                'x-decorator-props': {
                  tooltip: '蜂窝半径单位公里',
                },
              },
              coverage: {
                type: 'number',
                title: '覆盖度',
                'x-decorator': 'FormItem',
                'x-component': 'Slider',
                'x-component-props': {
                  dots: false,
                  range: false,
                  max: 1,
                  step: 0.1,
                  min: 0,
                },
                'x-decorator-props': {},
              },
            },
          },
        },
      },
      collapseItem_other: otherAttributesCollapse(options),
    },
  };
};
