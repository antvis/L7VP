import type { Application } from '@antv/li-sdk';
import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo } from 'react';
import type { LIEditorOptions, LIEditorProps } from './editor';
import LIEditor from './editor';

export type LocationInsightEditorRefAttributes = {
  /** 获取 Editor 实例 */
  getEditor: () => LIEditor;
};

export type LocationInsightEditorProps = LIEditorProps &
  LIEditorOptions & {
    /** 更新的回调函数 */
    onChange?: (app: Application) => void;
  };

const LocationInsightEditor = forwardRef<LocationInsightEditorRefAttributes, LocationInsightEditorProps>(
  function LocationInsightEditor(props, ref) {
    const { assets, onChange, editorWidgets, ...restProps } = props;
    const liEditor = useMemo(() => new LIEditor({ assets, editorWidgets }), []);
    const { Editor } = liEditor;

    useImperativeHandle(ref, () => ({ getEditor: () => liEditor }), [liEditor]);

    useEffect(() => {
      if (!onChange) return;

      liEditor.on('change', onChange);
      return () => {
        liEditor.off('change', onChange);
      };
    }, [liEditor, onChange]);

    return <Editor {...restProps} />;
  },
);

export default memo(LocationInsightEditor);
