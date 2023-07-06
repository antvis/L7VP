import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer as ChoroplethLayerComponent } from '@antv/larkmap';
import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <polygon
      className="cr1"
      points="25.04 23.08 9.72 31.79 8.19 43.2 19.57 53.83 28.79 53.83 35.6 46.57 39.45 30.08 25.04 23.08"
    />
    <polygon
      className="cr2"
      points="52.8 26.3 41.74 30.32 37.9 46.75 45.26 53.83 51.45 53.83 55.07 43.51 52.8 26.3"
      style={{ opacity: 0.8 }}
    />
    <polygon className="cr3" points="36.69 48.75 31.93 53.83 41.96 53.83 36.69 48.75" style={{ opacity: 0.4 }} />
    <polygon
      className="cr3"
      points="25.95 20.98 40.84 28.22 52.57 24.06 50.89 11.5 23.24 11.5 25.95 20.98"
      style={{ opacity: 0.4 }}
    />
    <polygon
      className="cr4"
      points="20.79 11.9 11.73 15.72 10.08 28.96 23.64 21.25 20.79 11.9"
      style={{ opacity: 0.8 }}
    />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'ChoroplethLayer',
    displayName: '区域图层',
    description: '用于面数据展示，支持描边、文本标注、多选等功能',
    type: 'Layer',
    icon: ICON,
    color: 'magenta',
  },
  defaultVisConfig: {
    zIndex: 0,
    fillColor: 'rgb(90, 216, 166)',
    opacity: 0.8,
    strokeColor: 'rgb(146, 112, 202)',
    lineWidth: 1,
    lineOpacity: 1,
    label: { style: { fill: 'red', fontSize: 14, textAnchor: 'center' } },
  },
  component: function ChoroplethLayer(props: ChoroplethLayerProps) {
    return <ChoroplethLayerComponent {...props} />;
  },
  registerForm,
});
