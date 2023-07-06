import type { ImplementWidgetProps } from '@antv/li-sdk';
import { MapContainer } from '@antv/li-sdk';
import React, { useMemo } from 'react';
import './Component.less';
import { CLS_PREFIX } from './constant';
import type { Properties } from './registerForm';

export interface MyLayoutProps extends ImplementWidgetProps<'content' | 'controls' | 'sidePanel'>, Properties {
  children?: React.ReactNode;
}

const MyLayout: React.FC<MyLayoutProps> = (props) => {
  const { showSidePanel, slotsElements, children } = props;

  const mapContainerSlots = useMemo(() => ({ content: slotsElements.content, controls: slotsElements.controls }), [
    slotsElements.content,
    slotsElements.controls,
  ]);

  return (
    <div className={CLS_PREFIX}>
      <MapContainer className={`${CLS_PREFIX}__map-container`} slotsElements={mapContainerSlots}>
        {children}
      </MapContainer>
      {showSidePanel && (
        <div className={`${CLS_PREFIX}__side-panel`}>
          {slotsElements.sidePanel ? slotsElements.sidePanel({}) : null}
        </div>
      )}
    </div>
  );
};

export default MyLayout;
