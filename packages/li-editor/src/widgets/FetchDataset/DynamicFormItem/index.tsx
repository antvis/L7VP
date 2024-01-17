import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import React from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '../../../hooks';
import DynamicFormItemValue from './DynamicFormItemValue';
import useStyle from './style';

type DynamicFormItemProps = {
  fieldName: string;
};

const DynamicFormItem = (props: DynamicFormItemProps) => {
  const { fieldName } = props;
  const prefixCls = usePrefixCls('dynamic-form-item');
  const styles = useStyle();

  return (
    <Form.List name={fieldName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} align="baseline" className={classNames(`${prefixCls}__item`, styles.dynamicFormItem)}>
              <Form.Item
                {...restField}
                name={[name, 'field']}
                className={classNames(`${prefixCls}__item__field`, styles.itemField)}
              >
                <Input placeholder="name" />
              </Form.Item>

              <div className={classNames(`${prefixCls}__item__icon`, styles.itemIcon)}>:</div>
              <Form.Item
                {...restField}
                name={[name, 'value']}
                className={classNames(`${prefixCls}__item__value`, styles.itemValue)}
              >
                <DynamicFormItemValue />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item className={classNames(`${prefixCls}__add-btn`, styles.dynamicFormAddBtn)}>
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
