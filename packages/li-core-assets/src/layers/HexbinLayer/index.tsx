import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
    <polygon points="23.9,10 30.9,14 30.9,22.1 23.9,26.2 16.8,22.1 16.8,14 " style={{ opacity: 0.6 }} />
    <polygon points="23.9,37.8 30.9,41.9 30.9,50 23.9,54 16.8,50 16.8,41.9 " style={{ opacity: 0.4 }} />
    <polygon points="40.1,10 47.2,14 47.2,22.1 40.1,26.2 33.1,22.1 33.1,14 " />
    <polygon points="40.1,37.8 47.2,41.9 47.2,50 40.1,54 33.1,50 33.1,41.9 " style={{ opacity: 0.8 }} />
    <polygon points="15.8,23.9 22.8,27.9 22.8,36.1 15.8,40.1 8.7,36.1 8.7,27.9 " />
    <polygon points="32,23.9 39,27.9 39,36.1 32,40.1 25,36.1 25,27.9 " style={{ opacity: 0.8 }} />
    <polygon points="48.2,23.9 55.3,27.9 55.3,36.1 48.2,40.1 41.2,36.1 41.2,27.9 " style={{ opacity: 0.4 }} />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'HexbinLayer',
    displayName: '蜂窝图层',
    description: '用于点数据聚合展示',
    type: 'Layer',
    icon: ICON,
    color: 'purple',
  },
  defaultVisConfig: {
    aggregateSize: 10000,
    color: 'rgb(90, 216, 166)',
    style: {
      coverage: 0.9,
      opacity: 1,
    },
    state: { active: { color: 'yellow' } },
    minZoom: 0,
    maxZoom: 24,
    blend: 'normal',
  },
  component,
  registerForm,
});
