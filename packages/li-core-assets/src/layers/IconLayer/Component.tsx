import type { IconImageLayerProps } from '@antv/larkmap';
import { IconImageLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface IconImageLayerWrapperProps extends IconImageLayerProps, ImplementLayerProps {}

const BubbleLayerWrapper: React.FC<IconImageLayerWrapperProps> = (props) => {
  return <IconImageLayer {...props} />;
};
export default BubbleLayerWrapper;
