import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import DynamicFormItemValue from './DynamicFormItemValue';
import './index.less';

type DynamicFormItemProps = {
  fieldName: string;
};

const DynamicFormItem = (props: DynamicFormItemProps) => {
  const { fieldName } = props;

  return (
    <Form.List name={fieldName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} align="baseline" className="li-dynamic-form-item__item">
              <Form.Item {...restField} name={[name, 'field']} className="li-dynamic-form-item__item__field">
                <Input placeholder="name" />
              </Form.Item>

              <div className="li-dynamic-form-item__item__icon">:</div>
              <Form.Item {...restField} name={[name, 'value']} className="li-dynamic-form-item__item__value">
                <DynamicFormItemValue />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item className="li-dynamic-form-item__add-btn">
            <Button onClick={() => add()} block icon={<PlusOutlined />}>
              添加
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default DynamicFormItem;
