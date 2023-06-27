import type { BubbleLayerProps } from '@antv/larkmap';
import { BubbleLayer as BubbleLayerComponent } from '@antv/larkmap';
import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import registerForm from './register-form';

const ICON = () => (
  <svg viewBox="0 0 64 64" width="56px" height="56px" style={{ fill: 'currentcolor' }}>
    <circle cx="29.4" cy="31.6" r="8.4" className="cr1" />
    <circle cx="48.5" cy="15.7" r="6.5" className="cr2" />
    <circle cx="11" cy="44.2" r="3" className="cr3" />
    <circle cx="50" cy="44.2" r="5" className="cr4" />
    <circle cx="34" cy="54.2" r="3" className="cr5" />
    <circle cx="14" cy="16.2" r="4" className="cr6" />
  </svg>
);

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'BubbleLayer',
    displayName: '气泡图层',
    description: '用于点数据以气泡形式展示，支持描边、文本标注、多选等功能',
    type: 'Layer',
    icon: ICON,
    color: 'orange',
  },
  defaultVisConfig: {
    zIndex: 0,
    radius: 10,
    fillColor: 'rgb(90, 216, 166)',
    opacity: 0.8,
    strokeColor: 'rgb(146, 112, 202)',
    lineWidth: 1,
    lineOpacity: 1,
    label: { style: { fill: '#c0c0c0', fontSize: 15, textAnchor: 'center' } },
    state: {
      active: { strokeColor: 'yellow', lineWidth: 1, lineOpacity: 1 },
    },
  },
  component: function BubbleLayer(props: BubbleLayerProps) {
    return <BubbleLayerComponent {...props} />;
  },
  registerForm,
});
