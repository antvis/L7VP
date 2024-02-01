import type { FieldSelectOptionType } from '@antv/li-p2';

export default (fieldList: FieldSelectOptionType[]) => {
  return {
    collapseItem_coordinate: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: ['country'],
      },
      properties: {
        country: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '区域',
          },
          properties: {
            countryGranularity: {
              type: 'string',
              title: '粒度',
              default: 'province',
              'x-decorator': 'FormItem',
              'x-component': 'Radio.Group',
              enum: [
                { label: '省份', value: 'province' },
                { label: '城市', value: 'city' },
              ],
            },

            countryAdType: {
              type: 'string',
              title: '类型',
              default: 'adcode',
              'x-decorator': 'FormItem',
              'x-component': 'Radio.Group',
              enum: [
                { label: '行政编码', value: 'adcode' },
                { label: '行政名称', value: 'adname' },
              ],
            },

            countryAdField: {
              type: 'string',
              title: '行政字段',
              required: true,
              'x-decorator': 'FormItem',
              'x-component': 'FieldSelect',
              'x-component-props': {
                allowClear: false,
                placeholder: '请选择行政字段',
              },
              enum: [...fieldList],
            },
          },
        },
      },
    },
  };
};
