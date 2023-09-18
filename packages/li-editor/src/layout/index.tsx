import { getDatasetColumns } from '@antv/li-sdk';
import { useAsyncEffect } from 'ahooks';
import { ConfigProvider, notification, Spin } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useEditorService, useEditorState } from '../hooks';
import type { EditorServiceCache } from '../types';
import './index.less';
import type { RuntimeAppProps } from './RuntimeApp';
import RuntimeApp from './RuntimeApp';
import SideNav from './SideNav';
import SidePanel from './SidePanel';

export type LayoutProps = RuntimeAppProps;

export const DefaultTheme = {
  token: {
    // 编辑器侧边栏的弹出层组件，z-index 优先级调整至最高，避免被预览区组件遮挡
    zIndexPopupBase: 1100,
  },
};

const Layout: React.FC<LayoutProps> = (props) => {
  const { className, style, defaultApplication, App } = props;
  const [notificationApi, contextHolder] = notification.useNotification();
  const { state, updateState } = useEditorState();
  const { appService } = useEditorService();
  const { datasets, serviceCache } = state;

  const [dataLoading, setDataLoading] = useState(false);

  useAsyncEffect(async () => {
    const newServiceCache: EditorServiceCache = {};
    const requestList: { datasetId: string; datasetName: string; promise: Promise<Record<string, any>[]> }[] = [];
    datasets.forEach((dataset) => {
      const {
        id: datasetId,
        metadata: { name: datasetName },
      } = dataset;
      if (dataset.type === 'remote') {
        if (serviceCache[datasetId]) {
          newServiceCache[datasetId] = serviceCache[datasetId];
        } else {
          const service = appService.getImplementService(dataset.serviceType);
          if (service) {
            requestList.push({
              datasetName,
              datasetId,
              promise: service.service({
                properties: dataset.properties,
                // TODO: filters 初始值问题
              }),
            });
          }
        }
      }
    });

    setDataLoading(true);

    await Promise.all(
      requestList.map(async ({ datasetId, datasetName, promise }) => {
        try {
          const data = await promise;
          newServiceCache[datasetId] = {
            data: data ?? [],
            columns: data?.length ? getDatasetColumns(data[0]) : [],
          };
        } catch (error: any) {
          notificationApi.error({
            message: `数据集"${datasetName}"请求失败`,
            description: error?.message || error,
          });
        }
      }),
    ).finally(() => {
      setDataLoading(false);
    });

    updateState((draft) => {
      return {
        ...draft,
        serviceCache: newServiceCache,
      };
    });
  }, [datasets]);

  return (
    <div className={classNames('li-editor', 'li-editor-layout', className)} style={style}>
      <ConfigProvider theme={DefaultTheme}>
        {contextHolder}
        {dataLoading && (
          <div className="li-editor-layout__loading">
            <Spin />
            <span>数据集加载中...</span>
          </div>
        )}
        <div className="li-editor-layout__left">
          <SideNav className="li-editor-layout__side-nav" />
          <SidePanel
            className={classNames('li-editor-layout__side-panel', {
              'li-editor-layout__side-panel_hidden': state.collapsed,
            })}
          />
        </div>
      </ConfigProvider>
      <RuntimeApp className="li-editor-layout__cavans" App={App} defaultApplication={defaultApplication} />
    </div>
  );
};

export default Layout;
