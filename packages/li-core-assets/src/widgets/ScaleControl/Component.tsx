import { ScaleControl as Scale } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

export interface ScaleControlProps extends ImplementWidgetProps, Properties {}

const ScaleControl: React.FC<ScaleControlProps> = (props) => {
  const styles = useStyle();

  return <Scale className={classNames('li-scales-control', styles.scalesControl)} position={props.position} />;
};

export default ScaleControl;
