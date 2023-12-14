import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button, Modal } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import useStyle from './style';

type InternalRichTextEditingProps = {};

const InternalRichTextEditing: React.FC<InternalRichTextEditingProps> = (props) => {
  const prefixCls = usePrefixCls('formily-rich-text-editing', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <Button className={`${prefixCls}__btn`} onClick={() => setIsModalOpen(true)}>
        编辑
      </Button>
      <Modal
        title="筛选器设置"
        cancelText="取消"
        okText="确定"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        富文本新一站是
      </Modal>
    </div>,
  );
};

const RichTextEditing = connect(InternalRichTextEditing);

export default RichTextEditing;
