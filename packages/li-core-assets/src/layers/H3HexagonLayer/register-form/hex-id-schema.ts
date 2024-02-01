import type { FieldSelectOptionType } from '@antv/li-p2';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    collapseItem_hexId: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: ['hexId'],
      },
      properties: {
        hexId: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: 'Hex Id',
          },
          properties: {
            hexagonId: {
              type: 'string',
              title: 'Hex Id',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-component-props': {
                allowClear: false,
                placeholder: '请选择字段',
              },
              enum: [...fieldList],
            },
          },
        },
      },
    },
  };
};
