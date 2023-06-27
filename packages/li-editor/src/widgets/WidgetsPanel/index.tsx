import { LayoutOutlined } from '@ant-design/icons';
import React from 'react';
import { implementEditorWidget } from '../../utils';
import WidgetsPanel from './WidgetsPanel';

export default implementEditorWidget({
  version: 'v0.1',
  component: WidgetsPanel,
  metadata: {
    name: 'WidgetsPanel',
    displayName: '组件配置',
    description: '组件面板',
  },
  container: {
    type: 'SideNav',
    slot: 'menuPanel',
  },
  menu: {
    name: '组件',
    key: 'widgets',
    icon: <LayoutOutlined />,
  },
});
