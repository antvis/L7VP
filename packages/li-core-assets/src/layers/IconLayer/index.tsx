import { DefaultIconImageLayerStyle } from '@antv/li-p2/dist/esm/LayerAttribute/IconImageLayerStyle/constant';
import { implementLayer } from '@antv/li-sdk';
import React from 'react';
import component from './Component';
import registerForm from './register-form';

const ICON = () => {
  return (
    <svg viewBox="0 0 64 64" width="1em" height="1em" style={{ fill: 'currentcolor' }}>
      <path d="M42.27,33.59l-4.34,4.34-4.34-4.34a13.25,13.25,0,0,1-8.9-12.52h0A13.24,13.24,0,0,1,37.93,7.83h0A13.24,13.24,0,0,1,51.17,21.07h0A13.25,13.25,0,0,1,42.27,33.59ZM37.93,28.3a7.22,7.22,0,1,0-7.22-7.22A7.22,7.22,0,0,0,37.93,28.3Z" />
      <path d="M18.68,48.79l-2.44,2.44L13.8,48.79a7.44,7.44,0,0,1-5-7h0a7.44,7.44,0,0,1,7.44-7.44h0a7.44,7.44,0,0,1,7.44,7.44h0A7.44,7.44,0,0,1,18.68,48.79Zm-2.44-3a4.06,4.06,0,1,0-4.06-4.06A4.06,4.06,0,0,0,16.24,45.81Z" />
      <path d="M48.85,55.52l-2.2,2.2-2.2-2.2a6.73,6.73,0,0,1-4.52-6.36h0a6.72,6.72,0,0,1,6.72-6.72h0a6.72,6.72,0,0,1,6.72,6.72h0A6.73,6.73,0,0,1,48.85,55.52Zm-2.2-2.69A3.67,3.67,0,1,0,43,49.17,3.67,3.67,0,0,0,46.65,52.83Z" />
    </svg>
  );
};

export default implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'IconLayer',
    displayName: '图标图层',
    description: '用于点数据图标标注',
    type: 'Layer',
    icon: ICON,
    color: 'yellowgreen',
  },
  defaultVisConfig: {
    visible: true,
    ...DefaultIconImageLayerStyle,
    state: {
      active: false,
      select: false,

      // active: {
      //   color: '#FFF684',
      // },
      // select: {
      //   color: '#FFF684',
      //   radius: undefined,
      // },
    },
  },
  component: component,
  registerForm,
});
