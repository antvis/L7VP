import { Slider } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';

const form = createForm({
  initialValues: { slider: 3 },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Slider,
  },
});

const schema = {
  type: 'object',
  properties: {
    slider: {
      type: 'number',
      title: '滑动条',
      default: 1,
      'x-decorator-props': {},
      'x-decorator': 'FormItem',
      'x-component': 'Slider',
      'x-component-props': {
        min: 0,
        max: 100,
        step: 1,
      },
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
