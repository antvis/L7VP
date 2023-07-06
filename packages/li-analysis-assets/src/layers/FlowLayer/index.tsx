import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 56 56" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <circle cx="14.16" cy="13.66" r="9.18" style={{ opacity: 0.4 }} />
    <circle cx="14.16" cy="13.66" r="6.62" style={{ opacity: 0.9 }} />
    <circle cx="44.97" cy="45.31" r="6" style={{ opacity: 0.4 }} />
    <circle cx="44.97" cy="45.31" r="3.74" style={{ opacity: 0.9 }} />
    <path
      d="m40.96,40.86c.85-.76,1.92-1.29,3.1-1.47l-13.74-13.74,2.2-2.2-12.08-3.13,5.54,5.54h0s14.99,14.99,14.99,14.99Z"
      style={{ opacity: 0.8 }}
    />
    <path
      d="m40.62,41.31l-5.54-5.54h0s-15.06-15.06-15.06-15.06c-.86.71-1.85,1.27-2.93,1.63l13.64,13.64-2.2,2.2,12.08,3.13Z"
      style={{ opacity: 0.8 }}
    />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'FlowLayer',
    displayName: '客流图层',
    description: '用于客流数据分析展示',
    type: 'Layer',
    icon: ICON,
    color: 'purple',
  },
  defaultVisConfig: {
    blend: 'normal',
  },
  component,
  registerForm,
});
