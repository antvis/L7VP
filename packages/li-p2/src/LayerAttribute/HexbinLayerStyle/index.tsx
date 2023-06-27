import { Form, FormItem, Select, Switch } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import { ColorPicker, ColorRangeSelector, FieldSelect, FormCollapse, Slider, SliderRange } from '../components';
import { CLS_PREFIX } from './constant';
import { hexbinLayerStyleConfigToFlat, hexbinLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { HexbinLayerStyleAttributeProps } from './types';

export const HexbinLayerStyleAttributeSchemaField: React.FC<Pick<HexbinLayerStyleAttributeProps, 'colorRanges'>> = (
  props,
) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          FieldSelect,
          ColorRangeSelector,
          ColorPicker,
          SliderRange,
          Slider,
          Switch,
          Select,
        },
      }),
    [],
  );

  const _schema = useMemo(() => schema({ colorRanges: props.colorRanges }), [props.colorRanges]);

  return <SchemaField schema={_schema} />;
};

export const HexbinLayerStyleAttribute: React.FC<HexbinLayerStyleAttributeProps> = memo(
  function HexbinLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = hexbinLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              if (props.onChange) {
                props.onChange(hexbinLayerStyleFlatToConfig(formIns.values));
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
        <HexbinLayerStyleAttributeSchemaField />
      </Form>
    );
  },
);
