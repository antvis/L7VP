import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { IconSelector } from '../../index';

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
    IconSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    iconAtlas: {
      type: 'number',
      title: 'icon 图标',
      default: [
        {
          id: '001',
          icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sSbCRKP1RsgAAAAAAAAAAAAADmJ7AQ/original',
          value: 'Aquatic Germplasm Reserve',
        },
        {
          id: '002',
          icon: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dPoYQoBq4f0AAAAAAAAAAAAADmJ7AQ/original',
          value: 'Marine Nature Reserves',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'IconSelector',
      'x-component-props': {
        placeholder: '请选择',
        options: [
          'Aquatic Germplasm Reserve',
          'Marine Nature Reserves',
          'Marine Park',
          'Special Marine Protected Areas',
          '005',
        ],
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