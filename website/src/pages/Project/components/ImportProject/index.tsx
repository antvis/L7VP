import { InboxOutlined } from '@ant-design/icons';
import type { Application } from '@antv/li-sdk';
import type { ModalProps } from 'antd';
import { Button, message, Modal, Space, Tabs, Upload } from 'antd';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import { useState } from 'react';
import styles from './index.less';
import { createProject } from '@/services';
import { DefaultAssetPackageIds } from '@/constants';

interface ImportProjectProps extends ModalProps {
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  onSubmit: () => void;
}

export default function ImportProject({ visible, onVisibleChange, onSubmit }: ImportProjectProps) {
  const [uploadData, setUploadData] = useState<Application>();
  const [messageApi, messageContextHolder] = message.useMessage();

  const customRequest = (uploadRequestOption: UploadRequestOption<any>) => {
    const { file, onSuccess } = uploadRequestOption;
    const fileReader = new FileReader();
    fileReader.readAsText(file as File);
    fileReader.onload = (event) => {
      try {
        const res = JSON.parse(event.target?.result as string);
        if (res.version && res.metadata && res.datasets && res.spec) {
          setUploadData(JSON.parse(event.target?.result as string));
        } else {
          messageApi.error('数据无法解析，请检查数据结构');
        }
      } catch (e) {
        console.log('文件解析失败', e);
      }
      // @ts-ignore
      onSuccess();
    };
  };

  const items = [
    {
      key: '1',
      label: '导入项目',
      children: (
        <Upload.Dragger name="data" accept=".json" customRequest={customRequest} maxCount={1}>
          <div className={styles['upload-dragger-content']}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或将数据文件拖拽到这里上传</p>
          </div>
        </Upload.Dragger>
      ),
    },
  ];

  return (
    <Modal
      width={800}
      open={visible}
      destroyOnClose
      onCancel={() => onVisibleChange(false)}
      footer={
        <Space>
          <Button onClick={() => onVisibleChange(false)}>返回</Button>
          <Button
            type="primary"
            disabled={uploadData ? false : true}
            onClick={() => {
              if (uploadData) {
                const { metadata } = uploadData;
                const defaultImportApp = {
                  projectName: metadata.name,
                  description: metadata?.description || '暂无项目描述',
                  assetPackageIds: metadata?.assetPackageIds || DefaultAssetPackageIds,
                };
                createProject({ ...defaultImportApp, applicationConfig: uploadData }).then((_project) => {
                  onSubmit();
                  onVisibleChange(false);
                });
              }
            }}
          >
            导入
          </Button>
        </Space>
      }
    >
      {messageContextHolder}
      <Tabs defaultActiveKey="1" items={items} className={styles['tabs-item']} />
    </Modal>
  );
}
