import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React from 'react';

export interface ChoroplethLayerWrapperProps extends ChoroplethLayerProps, ImplementLayerProps {}

const ChoroplethLayerWrapper: React.FC<ChoroplethLayerWrapperProps> = (props) => {
  return <ChoroplethLayer {...props} />;
};

export default ChoroplethLayerWrapper;
