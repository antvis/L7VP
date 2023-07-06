import { ShareAltOutlined } from '@ant-design/icons';
import type { ImplementEditorWidgetProps } from '@antv/li-editor';
import { Button, Modal, Tooltip } from 'antd';
import React, { useState } from 'react';

type ShareProps = ImplementEditorWidgetProps;

const Share: React.FC<ShareProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip placement="right" title="分享">
        <Button type="text" size="middle" shape="circle" icon={<ShareAltOutlined size={18} />} onClick={showModal} />
      </Tooltip>
      <Modal title="分享" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default Share;
