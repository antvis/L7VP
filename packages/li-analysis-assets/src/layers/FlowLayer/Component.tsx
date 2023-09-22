import type { FlowLayerProps } from '@antv/larkmap';
import { FlowLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import { isEmpty } from 'lodash-es';
import React from 'react';

export interface FlowLayerWrapperProps extends FlowLayerProps, ImplementLayerProps {}

const FlowLayerWrapper: React.FC<FlowLayerWrapperProps> = (props) => {
  const { source, ...other } = props;
  if (isEmpty(source?.data)) {
    return null;
  }
  return <FlowLayer {...other} source={source} />;
};

export default FlowLayerWrapper;
