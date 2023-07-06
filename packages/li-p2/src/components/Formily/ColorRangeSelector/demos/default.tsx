import { ColorRangeSelector } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';

const form = createForm({
  initialValues: {
    colorRange: {
      colors: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
      isReversed: false,
    },
  },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values.colorRange);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    ColorRangeSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    colorRange: {
      type: 'object',
      title: '颜色',
      'x-decorator': 'FormItem',
      'x-component': 'ColorRangeSelector',
      'x-component-props': {},
      'x-decorator-props': {},
    },
  },
};

export default () => {
  return (
    <Form form={form}>
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
