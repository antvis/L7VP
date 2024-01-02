import { Assets, DEFAULT_PROJECTS } from '@/constants';
import type { Application } from '@antv/li-sdk';
import { LIRuntimeApp } from '@antv/li-sdk';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import { useMemo, useState } from 'react';
import { history, useParams } from 'umi';
import Logo from './components/Logo';
import style from './index.less';

const defaultTheme = {
  algorithm: theme.defaultAlgorithm,
};

const App = () => {
  const { id: projectId = '' } = useParams();
  const liRuntimeApp = useMemo(() => new LIRuntimeApp({ assets: Assets }), []);
  const [appConfig, setAppConfig] = useState<Application | undefined>(
    () =>
      DEFAULT_PROJECTS.find((p) => p.projectId === projectId)
        ?.applicationConfig,
  );

  const onClickLogo = () => {
    history.push('/');
  };

  const { App: LIAPP } = liRuntimeApp;
  const loaded = appConfig;

  return (
    loaded && (
      <div className={style.app}>
        <div className={style.header}>
          <div className={style.left}>
            <Logo onClick={onClickLogo} />
            <div className={style.title}>{appConfig.metadata.name}</div>
          </div>
          <div className={style.actions} />
        </div>
        <ConfigProvider locale={zhCN} theme={defaultTheme}>
          <LIAPP className={style.runtimeApp} config={appConfig} />
        </ConfigProvider>
      </div>
    )
  );
};

export default App;
