import { ZoomControl as Zoom } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import classNames from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

/** 组件名称, 前缀 */
const CLS_PREFIX = 'li-zoom-control';

export interface ZoomControlProps extends ImplementWidgetProps, Properties {}

const ZoomControl: React.FC<ZoomControlProps> = (props) => {
  const { position, showZoom = true } = props;
  const styles = useStyle();

  return <Zoom className={classNames(`${CLS_PREFIX}__l7`, styles.l7Zoom)} showZoom={showZoom} position={position} />;
};

export default ZoomControl;
