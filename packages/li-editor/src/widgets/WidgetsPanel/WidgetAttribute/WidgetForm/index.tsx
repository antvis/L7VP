import type { ImplementWidget, WidgetRegisterFormProps } from '@antv/li-sdk';
import { Form } from '@formily/antd-v5';
import type { Form as FormInstance } from '@formily/core';
import { createForm, onFormValuesChange } from '@formily/core';
import { useMemoizedFn } from 'ahooks';
import classNames from 'classnames';
import { debounce } from 'lodash-es';
import React, { useMemo } from 'react';
import './index.less';
import WidgetSchemaField from './SchemaField';

type WidgetFormProps = {
  className?: string;
  initialValues: Record<string, any>;
  registerForm: ImplementWidget['registerForm'];
  registerFormProps: WidgetRegisterFormProps;
  onChange: (values: Record<string, any>) => void;
};

const WidgetForm: React.FC<WidgetFormProps> = (props) => {
  const { className, initialValues, registerForm, registerFormProps, onChange } = props;

  const registerFormData = useMemo(() => {
    const result = typeof registerForm === 'function' ? registerForm(registerFormProps) : registerForm;
    return result;
  }, [registerForm, registerFormProps]);

  const handleFormValuesChange = useMemoizedFn((formInstance: FormInstance<any>) => {
    formInstance
      .submit<Record<string, any>>()
      .then((values) => {
        const result = registerFormData.fromValues ? registerFormData.fromValues(values) : values;
        onChange(result);
      })
      .catch((values) => {
        // console.log('submit rejected', values);
      });
  });

  const schema = useMemo(() => {
    const properties = registerFormData.schema;
    return {
      type: 'object',
      properties: { ...properties },
    };
  }, [registerFormData.schema]);

  const formInstance = useMemo(() => {
    const _initialValues = registerFormData.toValues ? registerFormData.toValues(initialValues) : initialValues;
    const form = createForm({
      initialValues: _initialValues,
      effects() {
        // 数据实时变化
        onFormValuesChange(debounce(handleFormValuesChange, 150));
      },
    });

    return form;
  }, [schema]);

  return (
    <Form
      className={classNames('li-widget-form', className)}
      form={formInstance}
      labelCol={8}
      wrapperCol={16}
      colon={false}
      layout="horizontal"
      labelAlign="left"
      wrapperAlign="right"
    >
      <WidgetSchemaField schema={schema} components={registerFormData.components} />
    </Form>
  );
};

export default WidgetForm;
