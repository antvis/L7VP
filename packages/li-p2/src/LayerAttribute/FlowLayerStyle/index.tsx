import { Form, FormItem, NumberPicker, Switch } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import { ColorPicker, FieldSelect, FormCollapse, Slider, SliderRange, ColorRangeSelector } from '../components';
import { CLS_PREFIX } from './constant';
import { flowLayerStyleConfigToFlat, flowLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { FlowLayerStyleAttributeProps } from './types';

export const FlowLayerStyleAttributeSchemaField: React.FC<Pick<FlowLayerStyleAttributeProps, 'fieldList'>> = (
  props,
) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          NumberPicker,
          Switch,
          Slider,
          ColorPicker,
          ColorRangeSelector,
          SliderRange,
          FieldSelect,
        },
      }),
    [],
  );
  const _schema = useMemo(() => schema({ fieldList: props.fieldList, colorRanges: props.colorRanges }), [
    props.colorRanges,
    props.fieldList,
  ]);

  return <SchemaField schema={_schema} />;
};

export const FlowLayerStyleAttribute: React.FC<FlowLayerStyleAttributeProps> = memo(function FlowLayerStyleAttribute(
  props,
) {
  const form = useMemo(() => {
    const initialValues = flowLayerStyleConfigToFlat(props.initialValues);
    const _form = createForm({
      initialValues,
      effects() {
        onFormValuesChange(
          debounce((formIns: FormInstance<any>) => {
            if (props.onChange) {
              props.onChange(flowLayerStyleFlatToConfig(formIns.values));
            }
          }, 150),
        );
      },
    });

    return _form;
  }, []);

  return (
    <Form
      className={classNames(`${CLS_PREFIX}`, props.className)}
      style={props.style}
      form={form}
      labelCol={8}
      wrapperCol={16}
      colon={false}
      layout="horizontal"
      labelAlign="left"
      wrapperAlign="right"
      feedbackLayout="terse"
    >
      <FlowLayerStyleAttributeSchemaField fieldList={props.fieldList} />
    </Form>
  );
});
