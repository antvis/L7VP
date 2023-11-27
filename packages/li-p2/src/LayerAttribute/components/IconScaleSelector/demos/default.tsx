import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';
import { IconScaleSelector } from '../../index';

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
    IconScaleSelector,
  },
});

const schema = {
  type: 'object',
  properties: {
    iconAtlas: {
      type: 'number',
      title: 'icon 图标',
      default: {
        range: ['other_aquatic-germplasm-reserve', 'other_marine-nature-reserves'],
        // 图片
        domain: ['other_aquatic-germplasm-reserve', 'other_marine-nature-reserves'],
        unknown: 'no-icon',
      },
      'x-decorator': 'FormItem',
      'x-component': 'IconScaleSelector',
      'x-component-props': {
        placeholder: '请选择',
        domain: [
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
