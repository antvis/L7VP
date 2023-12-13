import { FilterSelector } from '@antv/li-p2';
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
    FilterSelector,
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
    value: '名称',
    typeName: '文本',
    typeColor: 'gold',
    domain: ['001', '002', '003', '004', '005', '006'],
  },
  {
    domain: [
      '2022-01-01',
      '2020-10-16',
      '2019-05-01',
      '2022-09-16',
      '2021-03-06',
      '2023-03-08',
      '2020-07-15',
      '2020-06-28',
      '2020-04-26',
      '2021-08-30',
      '2022-10-01',
      '2021-10-24',
      '2020-07-01',
      '2020-04-01',
    ],
    format: 'YYYY-MM-DD',
    label: '开盘日期',
    name: '开盘日期',
    type: 'date',
    typeColor: 'geekblue',
    typeName: '日期',
    value: '开盘日期',
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
      'x-component': 'FilterSelector',
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
