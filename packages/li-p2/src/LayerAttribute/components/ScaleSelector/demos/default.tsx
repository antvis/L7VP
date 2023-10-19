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
        type: 'threshold', //选择的筛选字段的类型
        domain: [3, 5.666666666666666, 8.333333333333332],
        range: ['#63759a', '#e61486', '#f00', '#faa'],
      },
      'x-decorator': 'FormItem',
      'x-component': 'ScaleSelector',
      'x-component-props': {
        placeholder: '请选择',
        dataType: 'number', //选择的筛选字段的类型
        domain: [2, 10],
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
