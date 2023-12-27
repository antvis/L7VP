import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button, Modal } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import useStyle from './style';
import 'quill/dist/quill.snow.css';
import Editor from './Editor';
import type { RichTextEditingDelta } from './type';

type InternalRichTextEditingProps = {
  value?: RichTextEditingDelta;
  onChange: (val?: RichTextEditingDelta) => void;
};

const InternalRichTextEditing: React.FC<InternalRichTextEditingProps> = (props) => {
  const { onChange, value } = props;
  const prefixCls = usePrefixCls('formily-rich-text-editing');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<RichTextEditingDelta>();

  const handleOk = () => {
    onChange(content);
    setIsModalOpen(false);
  };

  const onSubmit = (val: RichTextEditingDelta) => {
    setContent(val);
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
        title="应用简介设置"
        cancelText="取消"
        okText="确定"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <Editor value={value} onChange={onSubmit} />
      </Modal>
    </div>,
  );
};

const RichTextEditing = connect(InternalRichTextEditing);

export default RichTextEditing;
