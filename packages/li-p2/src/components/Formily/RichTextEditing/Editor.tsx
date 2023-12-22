import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { ImageResize } from 'quill-image-resize-module';
import { ImageUpload } from 'quill-image-upload';

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageUpload', ImageUpload);

type EditorProps = {
  onSubmit: (val: any) => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const { onSubmit } = props;
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const informationRef = useRef<HTMLDivElement>(null);
  const [vals, setValis] = useState<any>();

  useEffect(() => {
    const quill = new Quill(editorContainerRef.current!, {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'], // 加粗，斜体，下划线，删除线
          ['blockquote', 'code-block'], // 引用，代码块
          [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
          [{ list: 'ordered' }, { list: 'bullet' }], // 列表
          [{ script: 'sub' }, { script: 'super' }], // 上下标
          [{ indent: '-1' }, { indent: '+1' }], // 缩进
          [{ direction: 'rtl' }], // 文本方向
          [{ size: ['small', false, 'large', 'huge'] }], // 字体大小
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // 几级标题
          [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
          [{ align: [] }], // 对齐方式
          ['clean'], // 清除字体样式
          ['image'], // 上传图片、上传视频
        ],
        ImageResize: {
          modules: ['Resize', 'DisplaySize', 'Toolbar'],
        },
      },
      placeholder: '请输入...',
      theme: 'snow',
    });

    quill.on('editor-change', function () {
      const delta = quill.getContents();
      setValis(delta);
      onSubmit(delta);
    });

    return () => {
      quill.off('editor-change', function () {
        const delta = quill.getContents();
        onSubmit(delta);
      });
    };
  }, []);

  // 预览编辑信息展示
  useEffect(() => {
    const quill2 = new Quill(informationRef.current!, {
      modules: {},
      theme: 'bubble',
    });
    quill2.enable(false);
    quill2.setContents(vals);
  }, [vals]);

  return (
    <>
      <div ref={editorContainerRef} />
      <div ref={informationRef} />
    </>
  );
};

export default Editor;
