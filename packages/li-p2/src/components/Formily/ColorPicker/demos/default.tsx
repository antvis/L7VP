import { ColorPicker } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
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
    ColorPicker,
  },
});

const schema = {
  type: 'object',
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
