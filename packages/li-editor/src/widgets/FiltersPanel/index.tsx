import { FilterOutlined } from '@ant-design/icons';
import React from 'react';
import { implementEditorWidget } from '../../utils';
import FiltersPanel from './FiltersPanel';

export default implementEditorWidget({
  version: 'v0.1',
  component: FiltersPanel,
  metadata: {
    name: 'FiltersPanel',
    displayName: '筛选器设置',
    description: '筛选器面板',
  },
  container: {
    type: 'SideNav',
    slot: 'menuPanel',
  },
  menu: {
    name: '筛选',
    key: 'filters',
    icon: <FilterOutlined />,
  },
});
