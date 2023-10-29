import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <rect x="11.2" y="11.2" width="13.1" height="13.1" style={{ opacity: 0.8 }} />
    <rect x="25.4" y="11.2" width="13.1" height="13.1" style={{ opacity: 0.8 }} />
    <rect x="39.6" y="11.2" width="13.1" height="13.1" />
    <rect x="11.2" y="25.4" width="13.1" height="13.1" style={{ opacity: 0.4 }} />
    <rect x="25.4" y="25.4" width="13.1" height="13.1" />
    <rect x="39.6" y="25.4" width="13.1" height="13.1" style={{ opacity: 0.8 }} />
    <rect x="11.2" y="39.6" width="13.1" height="13.1" />
    <rect x="25.4" y="39.6" width="13.1" height="13.1" style={{ opacity: 0.4 }} />
    <rect x="39.6" y="39.6" width="13.1" height="13.1" style={{ opacity: 0.4 }} />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'GridLayer',
    displayName: '网格图层',
    description: '用于点数据聚合展示',
    type: 'Layer',
    icon: ICON,
    color: 'darkcyan',
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
