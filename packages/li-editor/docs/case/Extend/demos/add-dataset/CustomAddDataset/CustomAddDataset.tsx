import type { ImplementEditorAddDatasetWidgetProps } from '@antv/li-editor';
import type { DatasetSchema } from '@antv/li-sdk';
import { Button, Space } from 'antd';
import React, { useState } from 'react';
import './CustomAddDataset.less';

type CustomAddDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function CustomAddDataset(props: CustomAddDatasetProps) {
  const { onSubmit, onCancel } = props;
  const [addDatasets, setAddDatasets] = useState<DatasetSchema[]>([]);

  return (
    <>
      <div className="li-custom-add-dataset">自定义新增数据集内容</div>
      <div className="li-custom-add-dataset__footer ant-modal-footer">
        <Space>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            返回
          </Button>
          <Button
            disabled={addDatasets.length ? false : true}
            type="primary"
            onClick={() => {
              onSubmit(addDatasets);
            }}
          >
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}
