import { Form, FormItem, Radio, Select, Switch } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { memo, useMemo } from 'react';
import { ColorPicker, FieldSelect, FormCollapse, Offset, Slider, SliderRange } from '../components';
import IconSelector from '../components/IconSelector';
import IconScaleSelector from '../components/IconScaleSelector';
import { CLS_PREFIX } from './constant';
import { iconImageLayerStyleConfigToFlat, iconImageLayerStyleFlatToConfig } from './helper';
import schema from './schema';
import type { IconImageLayerStyleAttributeProps, IconSelectOptionType } from './types';

export const IconImageLayerStyleAttributeSchemaField: React.FC<
  Pick<IconImageLayerStyleAttributeProps, 'fieldList'> & { iconList?: IconSelectOptionType[] }
> = (props) => {
  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          FormCollapse,
          FieldSelect,
          ColorPicker,
          SliderRange,
          Slider,
          Switch,
          Select,
          Radio,
          IconScaleSelector,
          IconSelector,
          Offset,
        },
      }),
    [],
  );

  const _schema = useMemo(() => schema({ fieldList: props.fieldList, iconList: props.iconList || [] }), [
    props.fieldList,
    props.iconList,
  ]);

  return <SchemaField schema={_schema} />;
};

export const IconImageLayerStyleAttribute: React.FC<IconImageLayerStyleAttributeProps> = memo(
  function IconImageLayerStyleAttribute(props) {
    const form = useMemo(() => {
      const initialValues = iconImageLayerStyleConfigToFlat(props.initialValues);
      const _form = createForm({
        initialValues,
        effects() {
          onFormValuesChange(
            debounce((formIns: FormInstance<any>) => {
              if (props.onChange) {
                props.onChange(iconImageLayerStyleFlatToConfig(formIns.values));
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
        <IconImageLayerStyleAttributeSchemaField fieldList={props.fieldList} />
      </Form>
    );
  },
);
