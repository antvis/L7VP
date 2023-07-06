import type { PositionName } from '@antv/l7';
import {
  BubbleLayer as BubbleLayerComponent,
  ChoroplethLayer as ChoroplethLayerComponent,
  ZoomControl as Zoom,
} from '@antv/larkmap';
import { implementLayer, implementWidget } from '@antv/li-sdk';
import React from 'react';
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
  component: function ZoomControl(props: { position: PositionName }) {
    return <Zoom {...props} />;
  },
  defaultProperties: {
    position: 'bottomright',
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

const ChoroplethLayer = implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'ChoroplethLayer',
    displayName: '区域图层',
    description: '',
    type: 'Layer',
  },
  component: function ChoroplethLayer(props: any) {
    return <ChoroplethLayerComponent {...props} />;
  },
  registerForm: { schema: {} },
});

const BubbleLayer = implementLayer({
  version: 'v0.1',
  metadata: {
    name: 'BubbleLayer',
    displayName: '气泡图层',
    description: '',
    type: 'Layer',
  },
  component: function BubbleLayer(props: any) {
    return <BubbleLayerComponent {...props} />;
  },
  registerForm: { schema: {} },
});

const layers = [ChoroplethLayer, BubbleLayer];
const widgets = [MyLayout, AttributeInfor, StatisticsInfor, ZoomControl];

export default {
  version: 'v0.1',
  layers,
  widgets,
};
