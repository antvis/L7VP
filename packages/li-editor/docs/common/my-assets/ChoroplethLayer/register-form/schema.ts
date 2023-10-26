import type { FieldSelectOptionType } from '@antv/li-p2';
import getCoordinateSchema from './coordinate-schema';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    ...getCoordinateSchema(fieldList),
    collapseItem_fillColor: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: [],
      },
      properties: {
        fillColor: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '填充颜色',
          },
          properties: {
            fillColor: {
              type: 'string',
              title: '颜色',
              default: '#F7664E',
              'x-decorator': 'FormItem',
              'x-component': 'ColorPicker',
              'x-component-props': {
                placeholder: '颜色',
              },
              'x-decorator-props': {},
              'x-reactions': [
                {
                  dependencies: ['fillColor'],
                  fulfill: {
                    state: {
                      visible: '{{ typeof $deps[0] === "string" }}',
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
