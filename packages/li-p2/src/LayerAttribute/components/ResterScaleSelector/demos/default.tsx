import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { ResterScaleSelector } from '../../index';

const form = createForm({
  initialValues: {},
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    ScaleSelector: ResterScaleSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    fillColorScale: {
      type: 'number',
      title: '颜色划分',
      default: {
        type: 'custom',
        colors: ['#f0f9e8', '#bae4bc', '#7bccc4', '#43a2ca', '#0868ac'],
        positions: [0, 200, 1000, 4000, 8000, 10000],
      },
      'x-decorator': 'FormItem',
      'x-component': 'ScaleSelector',
      'x-component-props': {
        placeholder: '请选择',
        domain: [0, 10000],
        defaultColors: ['#f00', '#ff0', '#00f', '#faa'],
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
