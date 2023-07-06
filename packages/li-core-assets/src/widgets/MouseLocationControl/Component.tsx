import { MouseLocationControl as MouseLocation } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

export interface MouseLocationControlProps extends ImplementWidgetProps, Properties {}

const MouseLocationControl: React.FC<MouseLocationControlProps> = (props) => {
  const styles = useStyle();

  return (
    <MouseLocation
      className={classNames('li-mouse-location-control', styles.mouseLocation)}
      position={props.position}
    />
  );
};

export default MouseLocationControl;
