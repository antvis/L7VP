import type { HeatmapLayerProps } from '@antv/larkmap';
import { HeatmapLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface HeatmapLayerWrapperProps extends ImplementLayerProps, HeatmapLayerProps {}

const HeatmapLayerWrapper: React.FC<HeatmapLayerWrapperProps> = (props) => {
  return <HeatmapLayer {...props} />;
};

export default HeatmapLayerWrapper;
