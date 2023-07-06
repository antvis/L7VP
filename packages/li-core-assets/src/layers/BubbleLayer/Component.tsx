import type { BubbleLayerProps } from '@antv/larkmap';
import { BubbleLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface BubbleLayerWrapperProps extends BubbleLayerProps, ImplementLayerProps {}

const BubbleLayerWrapper: React.FC<BubbleLayerWrapperProps> = (props) => {
  return <BubbleLayer {...props} />;
};

export default BubbleLayerWrapper;
