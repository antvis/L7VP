import { Filters } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';

const form = createForm({
  initialValues: { textOffset: [0, 0] },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Filters,
  },
});

const fieldList = [
  {
    type: 'number',
    name: 'depth',
    label: 'depth',
    value: 'depth',
    typeName: '数值',
    domain: [3, 34.8],
    typeColor: 'green',
  },
  {
    type: 'number',
    name: 'mag',
    label: 'mag',
    value: 'mag',
    typeName: '数值',
    domain: [5, 7.9],
    typeColor: 'green',
  },
  {
    type: 'string',
    name: 'title',
    label: 'title',
    value: 'title',
    typeName: '文本',
    typeColor: 'gold',
    domain: ['001', '002', '003', '004', '005', '006'],
  },
];

const schema = {
  type: 'object',
  properties: {
    textOffset: {
      type: 'array',
      title: '筛选器',
      default: [0, 0],
      'x-decorator': 'FormItem',
      'x-component': 'Filters',
      'x-component-props': {
        dots: false,
        range: true,
        slider: false,
        options: [...fieldList],
      },
      'x-decorator-props': {},
    },
  },
};

export default () => {
  return (
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />

      <FormConsumer>
        {() => (
          <code>
            <pre>{JSON.stringify(form.values, null, 2)}</pre>
          </code>
        )}
      </FormConsumer>
    </Form>
  );
};
