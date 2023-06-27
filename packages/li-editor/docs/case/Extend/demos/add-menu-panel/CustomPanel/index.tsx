import { SmileTwoTone } from '@ant-design/icons';
import { implementEditorWidget } from '@antv/li-editor';
import React from 'react';
import CustomPanel from './CustomPanel';

export default implementEditorWidget({
  version: 'v0.1',
  component: CustomPanel,
  metadata: {
    name: 'CustomPanel',
    displayName: '自定义设置',
    description: '自定义设置面板',
  },
  container: {
    type: 'SideNav',
    slot: 'menuPanel',
  },
  menu: {
    name: '自定义',
    key: 'custom',
    icon: <SmileTwoTone twoToneColor="#eb2f96" />,
  },
});
