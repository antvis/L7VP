import { FullscreenControl as Fullscreen } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

export interface FullscreenControlProps extends ImplementWidgetProps, Properties {}

const FullscreenControl: React.FC<FullscreenControlProps> = (props) => {
  const styles = useStyle();

  return <Fullscreen className={classNames('li-full-screen-control', styles.fullScreen)} position={props.position} />;
};

export default FullscreenControl;
