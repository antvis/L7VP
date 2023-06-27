import type { ImplementWidgetProps } from '@antv/li-sdk';
import { MapContainer } from '@antv/li-sdk';
import classNames from 'classnames';
import React, { useMemo } from 'react';
import './Component.less';
import { CLS_PREFIX } from './constant';
import type { Properties } from './registerForm';

export interface BaseLayoutProps extends Properties, ImplementWidgetProps<'content' | 'controls' | 'sidePanel'> {
  children?: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = (props) => {
  const { showSidePanel, slotsElements, children } = props;

  const mapContainerSlots = useMemo(() => ({ content: slotsElements.content, controls: slotsElements.controls }), [
    slotsElements.content,
    slotsElements.controls,
  ]);

  return (
    <div className={CLS_PREFIX}>
      <div className={`${CLS_PREFIX}__main`}>
        <MapContainer className={classNames(`${CLS_PREFIX}__map-container`)} slotsElements={mapContainerSlots}>
          {children}
        </MapContainer>
        {showSidePanel && (
          <div className={`${CLS_PREFIX}__side-panel`}>
            {slotsElements.sidePanel ? slotsElements.sidePanel({}) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseLayout;
