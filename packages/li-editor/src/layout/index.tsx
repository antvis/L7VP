import { ConfigProvider, notification, Spin } from 'antd';
import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useEditorDatasets, useEditorState } from '../hooks';
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
  const { state } = useEditorState();
  const { editorDatasets, isLoading } = useEditorDatasets();

  useEffect(() => {
    editorDatasets.forEach((editorDataset) => {
      if (editorDataset.isLoadingError && editorDataset.error) {
        notificationApi.error({
          message: `数据集"${editorDataset.metadata.name}"请求失败`,
          description: editorDataset.error.message || editorDataset.error.message,
        });
      }
    });
  }, [editorDatasets]);

  return (
    <div className={classNames('li-editor', 'li-editor-layout', className)} style={style}>
      <ConfigProvider theme={DefaultTheme}>
        {contextHolder}
        {isLoading && (
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
