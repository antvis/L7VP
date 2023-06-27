import { GeoLocateControl as GeoLocate } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import gcoord from 'gcoord';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

export interface GeoLocateControlProps extends Properties, ImplementWidgetProps {}

const GeoLocateControl: React.FC<GeoLocateControlProps> = (props) => {
  const { position } = props;
  const styles = useStyle();

  const transform = (positions: [number, number]) => {
    return gcoord.transform(positions, gcoord.WGS84, gcoord.GCJ02);
  };

  return (
    <GeoLocate
      className={classNames('li-geo-location-control', styles.geoLocation)}
      transform={transform}
      position={position}
    />
  );
};

export default GeoLocateControl;
