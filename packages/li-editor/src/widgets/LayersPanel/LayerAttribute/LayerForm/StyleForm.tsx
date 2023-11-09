import {
  ColorPicker,
  ColorRangeSelector,
  FieldSelect,
  FormCollapse,
  IconList,
  IconSelector,
  Offset,
  ScaleSelector,
  ResterScaleSelector,
  Slider,
  SliderRange,
} from '@antv/li-p2';
import type { DatasetFieldWithMeta, ImplementLayer, LayerRegisterFormResultType, LayerSchema } from '@antv/li-sdk';
import { Form, FormItem, Input, NumberPicker, Radio, Select, Switch } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { useMemoizedFn } from 'ahooks';
import { debounce } from 'lodash-es';
import React, { useMemo } from 'react';

type LayerConfig = Pick<LayerSchema, 'sourceConfig' | 'visConfig'>;

type StyleFormProps = {
  implementLayer: ImplementLayer;
  datasetFields: DatasetFieldWithMeta[];
  initialValues: LayerConfig;
  onChange: (config: LayerConfig) => void;
};

const StyleForm: React.FC<StyleFormProps> = (props) => {
  const { initialValues, implementLayer, datasetFields, onChange } = props;

  const registerFormProps = useMemo(() => ({ datasetFields }), [datasetFields]);

  const registerForm = useMemo(() => {
    const _registerForm = implementLayer.registerForm;
    const result = typeof _registerForm === 'function' ? _registerForm(registerFormProps) : _registerForm;
    return result;
  }, [implementLayer?.registerForm, registerFormProps]);

  const SchemaField = useMemo(
    () =>
      createSchemaField({
        components: {
          FormItem,
          Input,
          Select,
          FormCollapse,
          Offset,
          NumberPicker,
          Switch,
          Slider,
          Radio,
          ColorRangeSelector,
          ColorPicker,
          FieldSelect,
          SliderRange,
          ScaleSelector,
          ResterScaleSelector,
          IconList,
          IconSelector,
          ...registerForm.components,
        },
      }),
    [registerForm.components],
  );

  const handleFormValuesChange = useMemoizedFn((formInstance: FormInstance<Record<string, any>>) => {
    formInstance
      .submit<Record<string, any>>()
      .then((values) => {
        const formatValues = (registerForm.fromValues ? registerForm.fromValues(values) : values) as LayerConfig;

        onChange(formatValues);
      })
      .catch((values) => {
        // console.log('submit rejected', values);
      });
  });

  // 坐标配置和样式配置表单
  // 更新可视化类型时重新生成新的表单，避免 values 重复
  const styleForm = useMemo(() => {
    const _initialValues = registerForm.toValues
      ? registerForm.toValues(initialValues as LayerRegisterFormResultType)
      : initialValues;

    const form = createForm({
      initialValues: _initialValues,
      effects() {
        // 数据实时变化
        onFormValuesChange(debounce(handleFormValuesChange, 150));
      },
    });

    return form;
  }, [initialValues, registerForm]);

  const schema = useMemo(
    () => ({
      type: 'void',
      properties: { ...registerForm.schema },
    }),
    [registerForm.schema],
  );

  return (
    <Form
      form={styleForm}
      labelCol={8}
      wrapperCol={16}
      colon={false}
      layout="horizontal"
      labelAlign="left"
      wrapperAlign="right"
      feedbackLayout="terse"
    >
      <SchemaField schema={schema} />
    </Form>
  );
};

export default StyleForm;
