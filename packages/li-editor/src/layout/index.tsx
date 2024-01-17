import { ConfigProvider, notification, Spin } from 'antd';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { useEditorDatasets, useEditorState, usePrefixCls } from '../hooks';
import type { RuntimeAppProps } from './RuntimeApp';
import RuntimeApp from './RuntimeApp';
import SideNav from './SideNav';
import SidePanel from './SidePanel';
import useStyle from './style';

export type LayoutProps = RuntimeAppProps;

export const DefaultTheme = {
  token: {
    // 编辑器侧边栏的弹出层组件，z-index 优先级调整至最高，避免被预览区组件遮挡
    zIndexPopupBase: 1100,
  },
};

const Layout: React.FC<LayoutProps> = (props) => {
  const { className, style, App } = props;
  const [notificationApi, contextHolder] = notification.useNotification();
  const { state } = useEditorState();
  const { editorDatasets, isLoading } = useEditorDatasets();
  const prefixCls = usePrefixCls('editor-layout');
  const styles = useStyle();

  useEffect(() => {
    editorDatasets.forEach((editorDataset) => {
      if (editorDataset.isLoadingError && editorDataset.error) {
        notificationApi.error({
          message: `数据集"${editorDataset.metadata.name}"请求失败`,
          description: editorDataset.error.message,
        });
      }
    });
  }, [editorDatasets]);

  return (
    <div className={cx(`${prefixCls}`, styles.editorLayout, className)} style={style}>
      <ConfigProvider theme={DefaultTheme}>
        {contextHolder}
        {isLoading && (
          <div className={cx(`${prefixCls}__loading`, styles.loading)}>
            <Spin />
            <span>数据集加载中...</span>
          </div>
        )}
        <div className={cx(`${prefixCls}__left`, styles.left)}>
          <SideNav className={cx(`${prefixCls}__side-nav`, styles.sideNav)} />
          <SidePanel
            className={cx(`${prefixCls}__side-panel`, styles.sidePanel, {
              [styles.sidePanelHidden]: state.collapsed,
            })}
          />
        </div>
      </ConfigProvider>
      <RuntimeApp className={cx(`${prefixCls}__cavans`, styles.cavans)} App={App} />
    </div>
  );
};

export default Layout;
