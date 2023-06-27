import { LogoControl as Logo } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import React from 'react';
import type { Properties } from './registerForm';

export interface LogoControlProps extends Properties, ImplementWidgetProps {}

const LogoControl: React.FC<LogoControlProps> = (props) => {
  const { position, url, href, height, width } = props;
  return <Logo position={position} img={url} href={href ? href : ''} style={{ width, height }} />;
};

export default LogoControl;
