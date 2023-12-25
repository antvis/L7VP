import { Button, Form, Input, Popover } from 'antd';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import useStyle from './style';

type EditorProps = {
  value?: any;
  onChange: (val: any) => void;
};

// 字体大小
const FontAttributor = Quill.import('attributors/class/size');
FontAttributor.whitelist = ['ft12', 'ft14', 'ft16', 'ft18', 'ft32', 'ft48'];
Quill.register(FontAttributor, true);

const Editor: React.FC<EditorProps> = (props) => {
  const { onChange, value } = props;
  const prefixCls = usePrefixCls('formily-rich-editor', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill>();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const quill = new Quill(editorContainerRef.current!, {
      modules: {
        toolbar: {
          container: [
            [{ size: ['ft12', 'ft14', 'ft16', 'ft18', 'ft32', 'ft48'] }], //字体大小
            [{ header: [false, 1, 2, 3, 4, 5, 6] }], // 几级标题
            [
              { color: [] }, // 字体颜色
              'bold', // 加粗
              'italic', // 斜体
              'underline', //下划线，
              { align: [] }, // 对齐方式
              { background: [] }, // 字体背景颜色
              { list: 'ordered' },
              { list: 'bullet' }, // 列表
              'image', // 上传图片
            ],
          ],
          handlers: {
            image: () => {
              setOpen(true);
            },
          },
        },
      },
      placeholder: '请输入...',
      theme: 'snow',
    });

    quillRef.current = quill;
    if (value) {
      quillRef.current.setContents(value);
    }

    quill.on('editor-change', function () {
      const delta = quill.getContents();
      onChange(delta);
    });

    return () => {
      quill.off('editor-change', function () {
        const delta = quill.getContents();
        onChange(delta);
      });
    };
  }, []);

  const content = (
    <div>
      <Form layout="vertical" requiredMark={false} form={form} style={{ minWidth: 500 }}>
        <Form.Item
          name="image"
          label="图片 URL"
          validateFirst={true}
          rules={[{ required: true, message: '请输入图片地址' }]}
        >
          <Input placeholder="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*r6H_R5wv-WgAAAAAAAAAAAAADmJ7AQ/original" />
        </Form.Item>
      </Form>
      <Button
        onClick={() => {
          if (quillRef.current && form.getFieldValue('image')) {
            const contents = quillRef.current.getContents();
            quillRef.current.insertEmbed(quillRef.current.getLength(), 'image', form.getFieldValue('image'));
          }
          setOpen(false);
        }}
      >
        确定
      </Button>
    </div>
  );

  console.log(document.querySelector('.ql-image'), 'lskfnsjk');

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div ref={editorContainerRef} />
      <div>dlfgknfjkg</div>
      <Popover
        open={open}
        content={content}
        title="插入图片"
        trigger="click"
        getPopupContainer={() => document.querySelector('.ql-toolbar')!}
      />
    </div>,
  );
};

export default Editor;
