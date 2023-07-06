import type { LineLayerProps } from '@antv/larkmap';
import { LineLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface LineLayerWrapperProps extends ImplementLayerProps, LineLayerProps {}

const LineLayerWrapper: React.FC<LineLayerWrapperProps> = (props) => {
  return <LineLayer {...props} />;
};

export default LineLayerWrapper;
