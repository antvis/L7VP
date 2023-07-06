import type { LineLayerProps } from '@antv/larkmap';
import { LineLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface ArcLayerWrapperProps extends ImplementLayerProps, LineLayerProps {}

const ArcLayerWrapper: React.FC<ArcLayerWrapperProps> = (props) => {
  return <LineLayer {...props} shape="arc" />;
};

export default ArcLayerWrapper;
