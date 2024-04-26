import { useEmptyModal, useMarketAssets } from '@/hooks';
import { getProject, updateProject } from '@/services';
import { logYuyanMonitor } from '@/utils';
import { LIEditor } from '@antv/li-editor';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'umi';
import { DefaultEditorWidgets, editorWidgetsWithBuilder as editorWidgets } from './editor-widgets';
import { useEditorNavbarKey } from './hooks';
import './index.less';
import type { Application, BuilderState } from './types';

LIEditor.DefaultEditorWidgets = DefaultEditorWidgets;

const Builder = () => {
  const { id: projectId = '' } = useParams();
  const liEditor = useMemo(() => new LIEditor({ assets: [], editorWidgets }), []);
  const [assetPackageIds, setAssetPackageIds] = useState<string[] | undefined>([]);
  const { assets } = useMarketAssets(assetPackageIds);
  const activeNavbarKey = useEditorNavbarKey(liEditor);
  const { emptyModal, emptyContextHolder } = useEmptyModal();

  // 搭建应用状态
  const [builderState, setBuilderState] = useState<BuilderState>({
    project: undefined,
  });

  const defaultApplication = builderState.project?.applicationConfig;

  // 安装资产
  useMemo(() => liEditor.installAssets(assets), [assets]);

  // 查询数据
  useEffect(() => {
    getProject(projectId)
      .then((project) => {
        setAssetPackageIds(project.assetPackageIds);
        setBuilderState((state) => ({ ...state, project }));
        document.title = `${project.applicationConfig.metadata.name}`;
        logYuyanMonitor(14, { c1: project.projectName, c2: project.creatTime });
      })
      .catch((message) => {
        emptyModal(message);
      });
  }, [projectId]);

  // 更新项目时存储数据
  useEffect(() => {
    const onUpdate = (applicationConfig: Application) => {
      // setBuilderState((state) => ({...state, project: {...state.project!, applicationConfig}}));
      const { projectName, description } = builderState.project!;
      updateProject(projectId, { projectName, description, applicationConfig });
    };
    liEditor.on('change', onUpdate);
    return () => {
      liEditor.off('change', onUpdate);
    };
  }, [builderState.project, liEditor, projectId]);

  const { Editor: EditorApp } = liEditor;
  const loaded = Boolean(assets.length) && defaultApplication;

  return (
    <div className="li-builder">
      {emptyContextHolder}
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

export default Builder;
