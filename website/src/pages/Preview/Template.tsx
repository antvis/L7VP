import { LIEditor } from '@antv/li-editor';
import type { Application } from '@antv/li-sdk';
import { Button, Space, theme } from 'antd';
import { cloneDeep } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { history, Link, useParams } from 'umi';
import { editorWidgets } from '../Builder/editor-widgets';
import { useEditorNavbarKey } from '../Builder/hooks';
import Logo from './components/Logo';
import style from './Template.less';
import { createProject, getCase } from '@/services';
import { useEmptyModal, useMarketAssets } from '@/hooks';

const { useToken } = theme;

const Template = () => {
  const { id: caseId = '' } = useParams();
  const liEditor = useMemo(() => new LIEditor({ assets: [], editorWidgets }), []);
  const [assetPackageIds, setAssetPackageIds] = useState<string[] | undefined>([]);
  const { assets } = useMarketAssets(assetPackageIds);
  const { token } = useToken();

  const activeNavbarKey = useEditorNavbarKey(liEditor);
  const { emptyModal, emptyContextHolder } = useEmptyModal();
  const [appConfig, setAppConfig] = useState<Application>();

  // 安装资产
  useMemo(() => liEditor.installAssets(assets), [assets]);

  useEffect(() => {
    getCase(caseId)
      .then((template) => {
        template.applicationConfig.metadata.assetPackageIds = template.assetPackageIds;
        setAssetPackageIds(template.assetPackageIds);
        setAppConfig(cloneDeep(template.applicationConfig));
        document.title = `${template.applicationConfig.metadata.name}`;
      })
      .catch((message) => {
        emptyModal(message);
      });
  }, [caseId]);

  const onClickLogo = () => {
    history.push('/case');
  };

  const saveToProject = () => {
    const applicationConfig = liEditor.getApplicationConfig();
    const params = {
      projectName: `${applicationConfig.metadata.name}_copy`,
      description: applicationConfig.metadata.description || '',
      applicationConfig,
      assetPackageIds,
    };
    createProject(params)
      .then(() => {
        history.push({
          pathname: `/project`,
        });
      })
      .catch(() => {
        emptyModal(' 添加到项目失败');
      });
  };

  const { Editor: EditorApp } = liEditor;
  const loaded = Boolean(assets.length) && appConfig;

  return (
    <>
      {loaded && (
        <div>
          <div className={style.header} style={{ color: token.colorText, backgroundColor: token.colorBgElevated }}>
            <div className={style.left}>
              <Logo onClick={onClickLogo} />
              <p className={style.title}>{appConfig.metadata.name}</p>
            </div>
            <div className={style.actions}>
              <Space>
                <Link to={`/app/${caseId}?type=case`} target="_blank">
                  <Button size="middle" type="primary">
                    预览
                  </Button>
                </Link>
                <Button size="middle" type="primary" onClick={saveToProject}>
                  添加到我的项目
                </Button>
              </Space>
            </div>
          </div>

          <EditorApp
            className={style.editor}
            defaultActiveNavMenuKey={activeNavbarKey}
            defaultApplication={appConfig}
          />
        </div>
      )}

      {emptyContextHolder}
    </>
  );
};

export default Template;
