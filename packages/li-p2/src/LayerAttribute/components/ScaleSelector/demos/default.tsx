import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { ScaleSelector } from '../../index';

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
    ScaleSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    fillColorScale: {
      type: 'number',
      title: '颜色划分',
      default: {
        type: 'threshold',
        domain: [5, 5.6, 5.7],
        colors: ['#63759a', '#e61486', '#f00', '#0f0'],
      },
      'x-decorator': 'FormItem',
      'x-component': 'ScaleSelector',
      'x-component-props': {
        placeholder: '请选择',
        type: 'number', //选择的筛选字段的类型
        dataset: {
          min: 5,
          max: 7.9,
          list: [
            { label: 5, value: 5, count: 17 },
            { label: 5.2, value: 5.2, count: 4 },
            { label: 5.8, value: 5.8, count: 3 },
            { label: 5.6, value: 5.6, count: 2 },
            { label: 5.4, value: 5.4, count: 2 },
            { label: 5.3, value: 5.3, count: 4 },
            { label: 6.1, value: 6.1, count: 1 },
            { label: 5.5, value: 5.5, count: 1 },
            { label: 5.7, value: 5.7, count: 2 },
            { label: 7.9, value: 7.9, count: 1 },
          ],
        },
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
