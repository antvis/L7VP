import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Button, Form, Input, Popover } from 'antd';
import cls from 'classnames';
import Quill from 'quill';
import type { RichTextEditingType } from '../type';
import 'quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import './index.css';
import useStyle from './style';

type EditorProps = {
  value?: RichTextEditingType;
  onChange: (val: RichTextEditingType) => void;
};

// 字体大小
const FontAttributor = Quill.import('attributors/class/size');
FontAttributor.whitelist = ['ft12', 'ft14', 'ft16', 'ft18', 'ft32', 'ft48'];
Quill.register(FontAttributor, true);

const Editor: React.FC<EditorProps> = (props) => {
  const { onChange, value } = props;
  const prefixCls = usePrefixCls('formily-rich-editor');
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
            [
              { size: ['ft12', 'ft14', 'ft16', 'ft18', 'ft32', 'ft48'] }, //字体大小
              { header: [false, 1, 2, 3, 4, 5, 6] }, // 几级标题
            ],
            [
              'bold', // 加粗
              'italic', // 斜体
              'underline', //下划线，
            ],
            [
              { color: [] }, // 字体颜色
              { background: [] }, // 字体背景颜色
            ],
            [
              { align: [] }, // 对齐方式
              { list: 'ordered' },
              { list: 'bullet' }, // 列表
            ],
            [
              'image', // 上传图片
              'link', // 链接
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
      // @ts-ignore
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

  const onFormClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const content = (
    <div className={cls(`${prefixCls}__popover__content`, hashId)}>
      <Form form={form} style={{ minWidth: 500 }}>
        <Form.Item name="image" validateFirst={true} rules={[{ required: true, message: '请输入图片地址' }]}>
          <Input placeholder="https://example.png" />
        </Form.Item>

        <Form.Item className={cls(`${prefixCls}__popover__content-btn`, hashId)}>
          <Button onClick={onFormClose} style={{ marginRight: 10 }}>
            取消
          </Button>
          <Button
            type="primary"
            onClick={() => {
              if (quillRef.current && form.getFieldValue('image')) {
                const selection = quillRef.current.getSelection(true).index; //当前光标位置
                const contents = quillRef.current.getContents();
                contents.ops.splice(selection > 0 ? selection - 1 : selection, 0, {
                  insert: {
                    image: form.getFieldValue('image'),
                  },
                  attributes: {
                    width: '100%',
                  },
                });
                quillRef.current.setContents(contents);
              }
              onFormClose();
            }}
          >
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div ref={editorContainerRef} />
      <Popover
        overlayClassName={cls(`${prefixCls}__popover`, hashId)}
        overlayStyle={{ left: 220, top: 0 }}
        open={open}
        content={content}
        title="插入图片"
        trigger="click"
        placement="bottom"
        arrow={false}
        destroyTooltipOnHide={true}
        onOpenChange={(open: boolean) => setOpen(open)}
        getPopupContainer={() => editorContainerRef.current!}
      />
    </div>,
  );
};

export default Editor;
