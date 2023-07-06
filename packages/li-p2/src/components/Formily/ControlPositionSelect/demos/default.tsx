import { ControlPositionSelect } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import React from 'react';
import { POSITION } from '../Select/contants';

const form = createForm({
  initialValues: { position: 'topleft' },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    ControlPositionSelect,
  },
});

const schema = {
  type: 'object',
  properties: {
    position: {
      type: 'string',
      title: '放置方位',
      default: 'topleft',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      'x-component-props': {
        options: POSITION,
      },
    },
  },
};

export default () => {
  return (
    // @ts-ignore
    <Form form={form} style={{ width: '300px' }}>
      <SchemaField schema={schema} />
    </Form>
  );
};
