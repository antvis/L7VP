import { DatabaseOutlined } from '@ant-design/icons';
import React from 'react';
import { implementEditorWidget } from '../../utils';
import DatasetsPanel from './DatasetsPanel';

export default implementEditorWidget({
  version: 'v0.1',
  component: DatasetsPanel,
  metadata: {
    name: 'DatasetsPanel',
    displayName: '数据集设置',
    description: '数据集面板',
  },
  container: {
    type: 'SideNav',
    slot: 'menuPanel',
  },
  menu: {
    name: '数据',
    key: 'datasets',
    icon: <DatabaseOutlined />,
  },
});
