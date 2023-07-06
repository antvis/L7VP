import { ColorPicker, FormCollapse } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import React from 'react';

const form = createForm({
  initialValues: { fillColor: '#F7664E' },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    FormCollapse,
    ColorPicker,
  },
});

const schema = {
  type: 'object',
  properties: {
    collapseItem: {
      type: 'void',
      title: '颜色面板',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
      },
      properties: {
        fillColor: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '折叠面板',
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
            },
          },
        },
      },
    },
  },
};

export default () => {
  return (
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />
    </Form>
  );
};
