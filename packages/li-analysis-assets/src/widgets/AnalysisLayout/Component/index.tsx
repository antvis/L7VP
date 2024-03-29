import type { ImplementWidgetProps } from '@antv/li-sdk';
import { MapContainer } from '@antv/li-sdk';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import FloatPanel from '../FloatPanel';
import type { Properties } from '../registerForm';
import { CLS_PREFIX } from './constants';
import useStyle from './style';

export interface AnalysisLayoutProps
  extends ImplementWidgetProps<'content' | 'controls' | 'sidePanel' | 'bottomPanel' | 'floatPanel'>,
    Properties {
  children?: React.ReactNode;
}

const AnalysisLayout: React.FC<AnalysisLayoutProps> = (props) => {
  const { showSidePanel, showBottomPanel, showFloatPanel, collapsedFloatPanel = true, slotsElements, children } = props;

  const styles = useStyle();

  const [collapsed, setCollapsed] = useState(collapsedFloatPanel);
  const mapContainerSlots = useMemo(() => ({ content: slotsElements.content, controls: slotsElements.controls }), [
    slotsElements.content,
    slotsElements.controls,
  ]);

  useEffect(() => {
    setCollapsed(collapsedFloatPanel);
  }, [collapsedFloatPanel]);

  const onCollapse = (isCollapsed: boolean) => {
    setCollapsed(isCollapsed);
  };

  return (
    <div className={classNames(styles.analysisLayout, CLS_PREFIX)}>
      <div className={styles.layoutContainer}>
        <MapContainer
          className={classNames(styles.mapContainer, `${CLS_PREFIX}__map-conatiner`, {
            [styles.showFloatPanel]: showFloatPanel && !collapsed,
          })}
          slotsElements={mapContainerSlots}
        >
          {showFloatPanel && (
            <FloatPanel
              className={classNames(styles.floatPanel, `${CLS_PREFIX}__float-panel`)}
              collapsed={collapsed}
              onCollapse={onCollapse}
            >
              {slotsElements.floatPanel ? slotsElements.floatPanel({}) : null}
            </FloatPanel>
          )}
          {children}
        </MapContainer>
        {showSidePanel && (
          <div className={classNames(styles.sidePanel, `${CLS_PREFIX}__side-panel`)}>
            {slotsElements.sidePanel ? slotsElements.sidePanel({}) : null}
          </div>
        )}
      </div>
      {showBottomPanel && (
        <div className={classNames(styles.bottomPanel, `${CLS_PREFIX}__bottom-panel`)}>
          {slotsElements.bottomPanel ? slotsElements.bottomPanel({}) : null}
        </div>
      )}
    </div>
  );
};

export default AnalysisLayout;
