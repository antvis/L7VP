import { LIEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'umi';
import { editorWidgets } from './editor-widgets';
import { useEditorNavbarKey } from './hooks';
import { Assets, DEFAULT_PROJECTS } from '@/constants';
import './index.less';

const BuilderPage = () => {
  const { id: projectId = '' } = useParams();
  const [project, setProject] = useState(() =>
    DEFAULT_PROJECTS.find((p) => p.projectId === projectId),
  );
  const liEditor = useMemo(
    () => new LIEditor({ assets: Assets, editorWidgets }),
    [],
  );
  const activeNavbarKey = useEditorNavbarKey(liEditor);

  const defaultApplication = project?.applicationConfig;

  useEffect(() => {
    const onUpdate = (applicationConfig: Application) => {
      // TODO: update project
    };
    liEditor.on('change', onUpdate);
    return () => {
      liEditor.off('change', onUpdate);
    };
  }, [liEditor]);

  const { Editor: EditorApp } = liEditor;
  const loaded = defaultApplication;

  return (
    <div className="li-builder">
      {loaded && (
        <EditorApp
          className="li-builder__editor"
          defaultActiveNavMenuKey={activeNavbarKey}
          defaultApplication={defaultApplication}
        />
      )}
    </div>
  );
};

export default BuilderPage;
