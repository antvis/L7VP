import type { PositionName } from '@antv/l7';
import { ZoomControl as Zoom } from '@antv/larkmap';
import { implementWidget } from '@antv/li-sdk';
import React from 'react';
import BubbleLayer from './BubbleLayer';
import ChoroplethLayer from './ChoroplethLayer';
import MyLayout from './MyLayout';

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
});

const ZoomControl = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'ZoomControl',
    displayName: '缩放器',
    description: '',
    type: 'Auto',
    category: 'MapControl',
  },
  defaultProperties: {
    position: 'topleft',
  },
  component: function ZoomControl(props: { position: PositionName }) {
    return <Zoom {...props} />;
  },
  registerForm: {
    schema: {
      position: {
        title: '放置方位',
        type: 'string',
        'x-decorator': 'FormItem',
        'x-component': 'ControlPositionSelect',
        default: 'bottomright',
      },
    },
  },
});

const layers = [BubbleLayer, ChoroplethLayer];
const widgets = [MyLayout, AttributeInfor, ZoomControl];

export default {
  version: 'v0.1',
  layers,
  widgets,
};
