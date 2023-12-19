import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

type EditorProps = {
  onSubmit: (val: any) => void;
};

const Editor: React.FC<EditorProps> = (props) => {
  const { onSubmit } = props;
  const editorContainerRef = useRef();

  useEffect(() => {
    const quill = new Quill('#editor-container', {
      modules: {
        toolbar: [
          [
            { size: ['small', false, 'large', 'huge'] },
            { header: [1, 2, 3, 4, 5, 6, false] },
            'bold',
            'italic',
            'underline',
            { color: [] },
            { background: [] },
            { script: 'sub' },
            { script: 'super' },
            { align: [] },
            { list: 'ordered' },
            { list: 'bullet' },
            'link',
            'image',
          ],
        ],
      },
      placeholder: '请输入...',
      theme: 'snow',
    });

    quill.on('editor-change', function () {
      const delta = quill.getContents();
      onSubmit(delta);
    });

    return () => {
      quill.off('editor-change', function () {
        const delta = quill.getContents();
        onSubmit(delta);
      });
    };
  }, []);

  return <div ref={editorContainerRef.current} id="editor-container" />;
};

export default Editor;
