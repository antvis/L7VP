import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <path d="M57.8,58.3c-0.4,0-0.8-0.2-1.1-0.5L33.1,32.1c-0.6-0.6-0.5-1.6,0.1-2.1c0.6-0.6,1.6-0.5,2.1,0.1l23.7,25.8 c0.6,0.6,0.5,1.6-0.1,2.1C58.5,58.2,58.2,58.3,57.8,58.3z" />
    <path d="M34.2,33.6c-0.6,0-1.2-0.2-1.7-0.6c-1-0.9-1.1-2.5-0.2-3.5l18.5-21c0.9-1,2.5-1.1,3.5-0.2c1,0.9,1.1,2.5,0.2,3.5L36,32.7 C35.5,33.3,34.9,33.6,34.2,33.6z" />
    <path d="M34.2,32.6c-0.5,0-1-0.3-1.3-0.8L20.7,10.2c-0.4-0.7-0.1-1.6,0.6-2c0.7-0.4,1.6-0.1,2,0.6l12.1,21.6c0.4,0.7,0.1,1.6-0.6,2 C34.7,32.5,34.4,32.6,34.2,32.6z" />
    <path d="M15.8,58.4c-0.3,0-0.6-0.1-0.9-0.3c-0.7-0.5-0.8-1.4-0.4-2.1l18.3-25.8c0.5-0.7,1.4-0.8,2.1-0.4s0.8,1.4,0.4,2.1L17.1,57.7 C16.8,58.2,16.3,58.4,15.8,58.4z" />
    <path d="M34.2,32.1c-0.1,0-0.3,0-0.4-0.1l-28.5-14c-0.5-0.2-0.7-0.8-0.5-1.3c0.2-0.5,0.8-0.7,1.3-0.5l28.5,14 c0.5,0.2,0.7,0.8,0.5,1.3C34.9,31.9,34.5,32.1,34.2,32.1z" />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'LineLayer',
    displayName: '线图层',
    description: '用于线数据展示',
    type: 'Layer',
    icon: ICON,
    color: 'green',
  },
  defaultVisConfig: {
    visible: true,
    size: 1,
    style: {
      opacity: 0.8,
      sourceColor: 'rgb(90, 216, 166)',
      targetColor: 'rgb(90, 216, 166)',
    },
    state: {
      active: { color: 'yellow' },
    },
    minZoom: 0,
    maxZoom: 24,
    blend: 'normal',
  },
  component,
  registerForm,
});
