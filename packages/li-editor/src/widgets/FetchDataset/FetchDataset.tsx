import { getUniqueId } from '@antv/li-sdk';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useEditorService } from '../../hooks';
import type { ImplementEditorAddDatasetWidgetProps } from '../../types';
import DynamicFormItem from './DynamicFormItem';
import './FetchDataset.less';
import { getProperties } from './helper';
import type { FetchDatasetConfig } from './types';

type FetchDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function FetchDataset(props: FetchDatasetProps) {
  const { onSubmit, onCancel } = props;
  const { appService } = useEditorService();
  const [datasetConfig, setDatasetConfig] = useState<FetchDatasetConfig>();
  const [form] = Form.useForm();
  const implementDatasetService = appService.getImplementService('GET_FETCH_DATA_LIST');
  const canAddDataset = datasetConfig && datasetConfig.name && datasetConfig.url && datasetConfig.method;

  const onFormChange = (_: any, allValues: FetchDatasetConfig) => {
    setDatasetConfig(allValues);
  };

  const onAddTileset = async () => {
    if (!implementDatasetService || !datasetConfig) return;
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    const { name, ...otherDatasetConfig } = form.getFieldsValue();

    const datasetId = getUniqueId();
    const properties = getProperties(otherDatasetConfig);

    const dataset = {
      id: datasetId,
      type: 'remote' as const,
      metadata: { name },
      serviceType: implementDatasetService.metadata.name,
      properties,
    };

    onSubmit([dataset]);
  };

  useEffect(() => {
    form.setFieldsValue({ method: 'GET' });
  }, []);

  return (
    <>
      <div className="li-fetch-dataset">
        <Form requiredMark={false} form={form} onValuesChange={onFormChange} labelCol={{ span: 3 }}>
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请填写数据集名称' }]}>
            <Input placeholder="请输入数据集名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="请求地址"
            rules={[
              { required: true, message: '请输入请求地址' },
              { type: 'url', message: '请输入合法的请求地址' },
            ]}
          >
            <Input placeholder="https://example.com/info.json" />
          </Form.Item>
          <Form.Item name="method" label="请求方法" rules={[{ required: true, message: '请选择请求方法' }]}>
            <Select
              placeholder="请选择请求方式"
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
              ]}
            />
          </Form.Item>

          <Form.Item label="请求参数" name="body">
            <DynamicFormItem fieldName="body" />
          </Form.Item>

          <Form.Item label="请求头信息" name="headers">
            <DynamicFormItem fieldName="headers" />
          </Form.Item>
        </Form>
      </div>
      <div className="li-fetch-dataset__footer ant-modal-footer">
        <Space>
          <Button onClick={onCancel}>返回</Button>
          <Button disabled={!canAddDataset} type="primary" htmlType="submit" onClick={onAddTileset}>
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}
