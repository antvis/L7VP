import type { FieldSelectOptionType } from '@antv/li-p2';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    collapseItem_coordinate: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: ['coordinateField'],
      },
      properties: {
        coordinateField: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '坐标',
          },
          properties: {
            longitude: {
              type: 'string',
              title: '起点经度',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-component-props': {
                allowClear: false,
                placeholder: '请选择字段',
              },
              enum: [...fieldList],
            },
            latitude: {
              type: 'string',
              title: '起点纬度',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-component-props': {
                allowClear: false,
                placeholder: '请选择字段',
              },
              enum: [...fieldList],
            },

            targetLongitude: {
              type: 'string',
              title: '终点经度',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-component-props': {
                allowClear: false,
                placeholder: '请选择字段',
              },
              enum: [...fieldList],
            },
            targetLatitude: {
              type: 'string',
              title: '终点纬度',
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
