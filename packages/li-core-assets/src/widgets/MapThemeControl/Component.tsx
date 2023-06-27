import type { PopperPlacement } from '@antv/l7-component/es/utils/popper';
import { MapThemeControl as MapTheme } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import cls from 'classnames';
import React, { useMemo } from 'react';
import useStyle from './ComponenStyle';
import { POPOVER_PLACEMENT } from './constants';
import type { Properties } from './registerForm';

export interface MapThemeControlProps extends ImplementWidgetProps, Properties {}

const MapThemeControl: React.FC<MapThemeControlProps> = ({ position }) => {
  const styles = useStyle();
  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT.get(position);
  }, [position]);

  return (
    <MapTheme
      className={styles.mapTheme}
      popperClassName={cls('li-map-theme-control', styles.mapThemePopper)}
      position={position}
      popperPlacement={onPlacement as PopperPlacement}
    />
  );
};

export default MapThemeControl;
