import { implementWidget } from '@antv/li-sdk';
import React from 'react';

const AttributeInfor = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'AttributeInfor',
    displayName: '属性信息',
    description: '',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component: function AttributeInfor() {
    return <div>属性信息</div>;
  },
  registerForm: { schema: {} },
});

const StatisticsInfor = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'StatisticsInfor',
    displayName: '统计信息',
    description: '',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component: function StatisticsInfor() {
    return <div>统计信息</div>;
  },
  registerForm: { schema: {} },
});

const widgets = [AttributeInfor, StatisticsInfor];

export default {
  version: 'v0.1',
  layers: [],
  widgets,
};
