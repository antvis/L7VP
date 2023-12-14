import { RichTextEditing } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';

const form = createForm({
  initialValues: { slider: [0, 19] },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    RichTextEditing,
  },
});

const schema = {
  type: 'object',
  properties: {
    slider: {
      type: 'any',
      title: '编辑器',
      'x-decorator': 'FormItem',
      'x-component': 'RichTextEditing',
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
