import type { ChoroplethLayerProps } from '@antv/larkmap';
import { ChoroplethLayer } from '@antv/larkmap';
import type { ImplementLayerProps } from '@antv/li-sdk';
import React, { useMemo } from 'react';
import { getSource } from './helper';
import type { H3HexagonLayerSource } from './type';

export interface H3HexagonLayerWrapperProps extends ChoroplethLayerProps, ImplementLayerProps {
  source: H3HexagonLayerSource;
}

const H3HexagonLayerWrapper: React.FC<H3HexagonLayerWrapperProps> = (props) => {
  const {
    source: {
      data: sourceData,
      parser: { hexagonId },
    },
  } = props;
  const source = useMemo(() => getSource(sourceData, hexagonId), [sourceData, hexagonId]);

  return <ChoroplethLayer {...props} source={source} />;
};

export default H3HexagonLayerWrapper;
