import { RibbonSelect } from '@antv/li-p2';
import { Form, FormItem } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField, FormConsumer } from '@formily/react';
import React from 'react';

const RIBBON_LIST: string[][] = [
  [
    'rgb(247, 251, 255)',
    'rgb(222, 235, 247)',
    'rgb(198, 219, 239)',
    'rgb(158, 202, 225)',
    'rgb(107, 174, 214)',
    'rgb(66, 146, 198)',
    'rgb(33, 113, 181)',
    'rgb(8, 81, 156)',
    'rgb(8, 48, 107)',
  ],
  [
    'rgb(247, 252, 253)',
    'rgb(229, 245, 249)',
    'rgb(204, 236, 230)',
    'rgb(153, 216, 201)',
    'rgb(102, 194, 164)',
    'rgb(65, 174, 118)',
    'rgb(35, 139, 69)',
    'rgb(0, 109, 44)',
    'rgb(0, 68, 27)',
  ],
  [
    'rgb(247, 252, 253)',
    'rgb(224, 236, 244)',
    'rgb(191, 211, 230)',
    'rgb(158, 188, 218)',
    'rgb(140, 150, 198)',
    'rgb(140, 107, 177)',
    'rgb(136, 65, 157)',
    'rgb(129, 15, 124)',
    'rgb(77, 0, 75)',
  ],
  [
    'rgb(247, 252, 240)',
    'rgb(224, 243, 219)',
    'rgb(204, 235, 197)',
    'rgb(168, 221, 181)',
    'rgb(123, 204, 196)',
    'rgb(78, 179, 211)',
    'rgb(43, 140, 190)',
    'rgb(8, 104, 172)',
    'rgb(8, 64, 129)',
  ],
  [
    'rgb(255, 247, 236)',
    'rgb(254, 232, 200)',
    'rgb(253, 212, 158)',
    'rgb(253, 187, 132)',
    'rgb(252, 141, 89)',
    'rgb(239, 101, 72)',
    'rgb(215, 48, 31)',
    'rgb(179, 0, 0)',
    'rgb(127, 0, 0)',
  ],
  [
    'rgb(255, 247, 251)',
    'rgb(236, 231, 242)',
    'rgb(208, 209, 230)',
    'rgb(166, 189, 219)',
    'rgb(116, 169, 207)',
    'rgb(54, 144, 192)',
    'rgb(5, 112, 176)',
    'rgb(4, 90, 141)',
    'rgb(2, 56, 88)',
  ],
  [
    'rgb(255, 247, 251)',
    'rgb(236, 226, 240)',
    'rgb(208, 209, 230)',
    'rgb(166, 189, 219)',
    'rgb(103, 169, 207)',
    'rgb(54, 144, 192)',
    'rgb(2, 129, 138)',
    'rgb(1, 108, 89)',
    'rgb(1, 70, 54)',
  ],
  [
    'rgb(247, 244, 249)',
    'rgb(231, 225, 239)',
    'rgb(212, 185, 218)',
    'rgb(201, 148, 199)',
    'rgb(223, 101, 176)',
    'rgb(231, 41, 138)',
    'rgb(206, 18, 86)',
    'rgb(152, 0, 67)',
    'rgb(103, 0, 31)',
  ],
  [
    'rgb(255, 247, 243)',
    'rgb(253, 224, 221)',
    'rgb(252, 197, 192)',
    'rgb(250, 159, 181)',
    'rgb(247, 104, 161)',
    'rgb(221, 52, 151)',
    'rgb(174, 1, 126)',
    'rgb(122, 1, 119)',
    'rgb(73, 0, 106)',
  ],
  [
    'rgb(255, 255, 229)',
    'rgb(247, 252, 185)',
    'rgb(217, 240, 163)',
    'rgb(173, 221, 142)',
    'rgb(120, 198, 121)',
    'rgb(65, 171, 93)',
    'rgb(35, 132, 67)',
    'rgb(0, 104, 55)',
    'rgb(0, 69, 41)',
  ],
  [
    'rgb(255, 255, 217)',
    'rgb(237, 248, 177)',
    'rgb(199, 233, 180)',
    'rgb(127, 205, 187)',
    'rgb(65, 182, 196)',
    'rgb(29, 145, 192)',
    'rgb(34, 94, 168)',
    'rgb(37, 52, 148)',
    'rgb(8, 29, 88)',
  ],
  [
    'rgb(255, 255, 229)',
    'rgb(255, 247, 188)',
    'rgb(254, 227, 145)',
    'rgb(254, 196, 79)',
    'rgb(254, 153, 41)',
    'rgb(236, 112, 20)',
    'rgb(204, 76, 2)',
    'rgb(153, 52, 4)',
    'rgb(102, 37, 6)',
  ],
  [
    'rgb(255, 255, 204)',
    'rgb(255, 237, 160)',
    'rgb(254, 217, 118)',
    'rgb(254, 178, 76)',
    'rgb(253, 141, 60)',
    'rgb(252, 78, 42)',
    'rgb(227, 26, 28)',
    'rgb(189, 0, 38)',
    'rgb(128, 0, 38)',
  ],
];

const form = createForm({
  initialValues: {
    colorRibbon: [
      'rgb(247, 251, 255)',
      'rgb(222, 235, 247)',
      'rgb(198, 219, 239)',
      'rgb(158, 202, 225)',
      'rgb(107, 174, 214)',
      'rgb(66, 146, 198)',
      'rgb(33, 113, 181)',
      'rgb(8, 81, 156)',
      'rgb(8, 48, 107)',
    ],
  },
  effects() {
    onFormValuesChange((formIns: FormInstance<any>) => {
      console.log('formIns.values: ', formIns.values);
    });
  },
});

const SchemaField = createSchemaField({
  components: {
    FormItem,
    RibbonSelect,
  },
});

const schema = {
  type: 'object',
  properties: {
    colorRibbon: {
      type: 'string',
      title: '颜色',
      'x-decorator': 'FormItem',
      'x-component': 'RibbonSelect',
      'x-component-props': {},
      'x-decorator-props': {},
      enum: [...RIBBON_LIST],
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
