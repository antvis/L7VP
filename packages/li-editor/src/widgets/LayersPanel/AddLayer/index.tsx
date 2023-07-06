import { uniqueName } from '@antv/li-sdk';
import { Button, Form, Select } from 'antd';
import React from 'react';
import { useEditorState } from '../../../hooks';

type Props = {
  className?: string;
  onSubmit: (name: string, datasetId: string) => void;
  onClose: () => void;
};

const AddLayer: React.FC<Props> = (props) => {
  const { onClose, onSubmit } = props;
  const { state } = useEditorState();
  const [form] = Form.useForm();

  const handleSubmits = () => {
    form
      .validateFields()
      .then((val: { name: string; datasetId: string }) => {
        const { name, datasetId } = val;
        const datasetName = state.datasets.find((item) => item.id === datasetId)?.metadata.name;
        const layerName = uniqueName(`${datasetName}图层`);
        onSubmit(layerName, datasetId);
        form.resetFields();
      })
      .catch();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmits}>
      <Form.Item name="datasetId" label="数据来源" rules={[{ required: true }]}>
        <Select placeholder="请选择数据来源" style={{ width: '100%' }}>
          {state.datasets?.map((item) => {
            return (
              <Select.Option value={item.id} key={item.id}>
                {item.metadata.name}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      {/* <Form.Item name="name" label="图层名称" rules={[{ required: true }]}>
        <Input placeholder="请输入图层名称" />
      </Form.Item> */}
      <Form.Item style={{ textAlign: 'right' }}>
        <Button
          htmlType="button"
          onClick={() => {
            form.resetFields();
            onClose();
          }}
          style={{ marginRight: 10 }}
        >
          取消
        </Button>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddLayer;
