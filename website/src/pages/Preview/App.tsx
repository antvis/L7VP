import type { Application } from '@antv/li-sdk';
import { LIRuntimeApp } from '@antv/li-sdk';
import { Button, Space, theme } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { history, useParams, useSearchParams } from 'umi';
import style from './App.less';
import Logo from './components/Logo';
import { logYuyanMonitor } from '@/utils';
import { createProject, getCase, getProject } from '@/services';
import type { Case, Project } from '@/services';
import { useEmptyModal, useMarketAssets } from '@/hooks';

const { useToken } = theme;

const App = () => {
  const { id: appId = '' } = useParams();
  const [searchParams] = useSearchParams();
  const previewType = searchParams.get('type') || 'project';
  const embed = searchParams.get('embed') || 'false';
  const isEmbed = embed === 'true';
  const isCase = previewType === 'case';

  const [assetPackageIds, setAssetPackageIds] = useState<string[] | undefined>([]);

  const { token } = useToken();

  const liRuntimeApp = useMemo(() => new LIRuntimeApp({ assets: [] }), []);
  const [appConfig, setAppConfig] = useState<Application>();
  const { assets } = useMarketAssets(assetPackageIds);

  const { emptyModal, emptyContextHolder } = useEmptyModal();

  // 安装资产
  useMemo(() => liRuntimeApp.installAssets(assets), [assets]);

  useEffect(() => {
    const setData = (project: Case | Project) => {
      setAssetPackageIds(project.assetPackageIds);
      setAppConfig(project.applicationConfig);
      document.title = `${project.applicationConfig.metadata.name}`;
      logYuyanMonitor(13, { c1: previewType, c2: appId });
    };
    if (isCase) {
      getCase(appId)
        .then((_case) => {
          setData(_case);
        })
        .catch((message) => {
          emptyModal(message);
        });
    } else {
      getProject(appId)
        .then((project) => {
          setData(project);
        })
        .catch((message) => {
          emptyModal(message);
        });
    }
  }, [appId]);

  const onClickLogo = () => {
    history.push(isCase ? '/case' : '/project');
  };

  const saveToProject = () => {
    const params = {
      projectName: `${appConfig?.metadata.name}_copy`,
      description: appConfig?.metadata.description || '',
      applicationConfig: appConfig!,
      assetPackageIds: assetPackageIds,
    };
    createProject(params)
      .then((project) => {
        history.push({
          pathname: `/project`,
        });
      })
      .catch(() => {
        emptyModal('复制到项目失败');
      });
  };

  const { App: LIAPP } = liRuntimeApp;
  const loaded = Boolean(assets.length) && appConfig;

  if (!loaded) {
    return null;
  }

  const Header = (
    <div className={style.header} style={{ color: token.colorText, backgroundColor: token.colorBgElevated }}>
      <div className={style.left}>
        <Logo onClick={onClickLogo} />
        <p className={style.title}>{appConfig.metadata.name}</p>
      </div>
      {!isEmbed && isCase && (
        <div className={style.actions}>
          <Space>
            {isCase && (
              <Button size="middle" type="primary" onClick={saveToProject}>
                使用案例
              </Button>
            )}
          </Space>
        </div>
      )}
    </div>
  );

  return (
    <div className={style.app}>
      {Header}
      {emptyContextHolder}
      <LIAPP className={style.runtimeApp} config={appConfig} />
    </div>
  );
};

export default App;
