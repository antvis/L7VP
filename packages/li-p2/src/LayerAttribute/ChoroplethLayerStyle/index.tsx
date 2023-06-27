import { Form, FormItem, Input, NumberPicker, Select, Switch } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import {
  ColorPicker,
  ColorRangeSelector,
  FieldSelect,
  FormCollapse,
  Offset,
  ScaleSelector,
  Slider,
  SliderRange,
} from '../components';
import { CLS_PREFIX } from './constant';
import { choroplethLayerStyleConfigToFlat, choroplethLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { ChoroplethLayerStyleAttributeProps } from './types';

export const ChoroplethLayerStyleAttributeSchemaField: React.FC<
  Pick<ChoroplethLayerStyleAttributeProps, 'fieldList' | 'colorRanges'>
> = (props) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          Input,
          Select,
          FormCollapse,
          NumberPicker,
          Switch,
          Slider,
          ColorRangeSelector,
          ColorPicker,
          FieldSelect,
          SliderRange,
          Offset,
          ScaleSelector,
        },
      }),
    [],
  );
  const _schema = useMemo(() => schema({ fieldList: props.fieldList, colorRanges: props.colorRanges }), [
    props.fieldList,
    props.colorRanges,
  ]);

  return <SchemaField schema={_schema} />;
};

export const ChoroplethLayerStyleAttribute: React.FC<ChoroplethLayerStyleAttributeProps> = memo(
  function ChoroplethLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = choroplethLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              if (props.onChange) {
                props.onChange(choroplethLayerStyleFlatToConfig(formIns.values));
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
        <ChoroplethLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
