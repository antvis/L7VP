import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { IconCustomSelector } from '../../index';

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
    IconCustomSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    fillColorScale: {
      type: 'number',
      title: 'icon 图标',
      default: {
        'Aquatic Germplasm Reserve':
          'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*sSbCRKP1RsgAAAAAAAAAAAAADmJ7AQ/original',
        'Marine Nature Reserves':
          'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*dPoYQoBq4f0AAAAAAAAAAAAADmJ7AQ/original',
        'Marine Park': 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*ojViTp4h4x8AAAAAAAAAAAAADmJ7AQ/original',
        'Special Marine Protected Areas':
          'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*DulySrR5zuwAAAAAAAAAAAAADmJ7AQ/original',
      },
      'x-decorator': 'FormItem',
      'x-component': 'IconCustomSelector',
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
