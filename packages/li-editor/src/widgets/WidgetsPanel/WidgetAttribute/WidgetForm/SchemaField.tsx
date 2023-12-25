import { ControlPositionSelect, RichTextEditing, FieldSelect, FormCollapse, TimeGranularitySelect } from '@antv/li-p2';
import {
  ArrayItems,
  Checkbox,
  FormGrid,
  FormItem,
  FormTab,
  Input,
  NumberPicker,
  Radio,
  Select,
  Space,
  Switch,
} from '@formily/antd-v5';
import type { ISchema } from '@formily/json-schema';
import { createSchemaField } from '@formily/react';
import React from 'react';

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Switch,
    Input,
    Select,
    FormCollapse,
    FieldSelect,
    FormTab,
    Radio,
    Checkbox,
    NumberPicker,
    ArrayItems,
    Space,
    FormGrid,
    ControlPositionSelect,
    RichTextEditing,
    TimeGranularitySelect,
  },
});

type WidgetSchemaFieldProps = {
  schema: ISchema;
  components?: Record<string, React.FC>;
};

const WidgetSchemaField: React.FC<WidgetSchemaFieldProps> = (props) => {
  return <SchemaField schema={props.schema} components={props.components} />;
};

export default WidgetSchemaField;
