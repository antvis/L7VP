import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { ScaleSelector } from '../../index';

// 测试数据待删除
const defaultValue = {
  type: 'string', //选择的筛选字段的类型
  value: {
    type: 'string',
    list: [
      {
        value: ['M 5.2 - Sichuan-Gansu border region, China', 'M 5.0 - Sichuan-Gansu border region, China'],
        color: '#ff0',
      },
      { value: ['M 5.8 - Sichuan-Gansu border region, China', 'M 5.0 - eastern Sichuan, China'], color: '#f0f' },
      { value: ['M 5.6 - eastern Sichuan, China', 'M 5.4 - eastern Sichuan, China'], color: '#0ff' },
    ],
  },
  dataset: {
    list: [
      {
        label: 'M 5.2 - Sichuan-Gansu border region, China',
        value: 'M 5.2 - Sichuan-Gansu border region, China',
        count: 2,
      },
      {
        label: 'M 5.0 - Sichuan-Gansu border region, China',
        value: 'M 5.0 - Sichuan-Gansu border region, China',
        count: 6,
      },
      {
        label: 'M 5.8 - Sichuan-Gansu border region, China',
        value: 'M 5.8 - Sichuan-Gansu border region, China',
        count: 1,
      },
      { label: 'M 5.0 - eastern Sichuan, China', value: 'M 5.0 - eastern Sichuan, China', count: 11 },
      { label: 'M 5.6 - eastern Sichuan, China', value: 'M 5.6 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.1 - eastern Sichuan, China', value: 'M 5.1 - eastern Sichuan, China', count: 8 },
      { label: 'M 5.4 - eastern Sichuan, China', value: 'M 5.4 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.8 - eastern Sichuan, China', value: 'M 5.8 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.2 - eastern Sichuan, China', value: 'M 5.2 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.3 - eastern Sichuan, China', value: 'M 5.3 - eastern Sichuan, China', count: 3 },
      { label: 'M 6.1 - eastern Sichuan, China', value: 'M 6.1 - eastern Sichuan, China', count: 1 },
      { label: 'M 5.5 - eastern Sichuan, China', value: 'M 5.5 - eastern Sichuan, China', count: 1 },
      {
        label: 'M 5.1 - Sichuan-Gansu border region, China',
        value: 'M 5.1 - Sichuan-Gansu border region, China',
        count: 1,
      },
      {
        label: 'M 5.3 - Sichuan-Gansu border region, China',
        value: 'M 5.3 - Sichuan-Gansu border region, China',
        count: 1,
      },
      { label: 'M 5.7 - eastern Sichuan, China', value: 'M 5.7 - eastern Sichuan, China', count: 2 },
      { label: 'M 7.9 - eastern Sichuan, China', value: 'M 7.9 - eastern Sichuan, China', count: 1 },
    ],
  },
};
// 测试数据待删除
const defaultValueNumber = {
  type: 'number', //选择的筛选字段的类型
  value: {
    scaleType: 'threshold',
    type: 'number',
    list: [
      { value: [null, 5], color: '#f00' },
      { value: [5, 6], color: '#ff0' },
      { value: [6, 7], color: '#0ff' },
      { value: [7, null], color: '#00f' },
    ],
  },
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
};

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
      type: 'string',
      title: '颜色划分----',
      default: {
        type: 'cat',
        domain: [5, 5.6, undefined, 5.7, undefined, 7.9, undefined, 5.8],
        colors: ['#63759a', '#e61486'],
      },
      'x-decorator': 'FormItem',
      'x-component': 'ScaleSelector',
      'x-component-props': {
        placeholder: '请选择',
        type: 'string', //选择的筛选字段的类型
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
