import type { Scene } from '@antv/l7';
import { LarkMap } from '@antv/larkmap';
import type { LayerManager } from '@antv/larkmap/es/utils';
import classNames from 'classnames';
import React, { memo, useCallback } from 'react';
import { useMapConfig } from '../../hooks/internal';
import LayerList from '../internal/LayerList';
import { CLS_PREFIX } from './constant';
import './index.less';
import type { MapContainerProps } from './types';
import { useLatestKey } from './useLatestKey';

/**
 * 地图容器组件
 * 复杂渲染地图画布区域
 */
const MapContainer: React.FC<MapContainerProps> = (props) => {
  const { className, style, onSceneLoaded, slotsElements, children } = props;
  const [mapConfig, { setScene, setLayerManager }] = useMapConfig();

  const { basemap: mapType, config: mapOptions, ...larkmapProps } = mapConfig;

  const larkMapKey = useLatestKey(mapConfig.basemap);

  const sceneLoaded = useCallback((scene: Scene) => {
    setScene(scene);
    onSceneLoaded?.(scene);
  }, []);

  const onLayerManagerCreated = useCallback((layerManager: LayerManager) => {
    setLayerManager(layerManager);
  }, []);

  return (
    <LarkMap
      {...larkmapProps}
      key={larkMapKey}
      className={classNames(CLS_PREFIX, className)}
      style={style}
      mapType={mapType}
      mapOptions={mapOptions}
      onSceneLoaded={sceneLoaded}
      onLayerManagerCreated={onLayerManagerCreated}
    >
      <LayerList />
      {slotsElements.content ? slotsElements.content({}) : null}
      {slotsElements.controls ? slotsElements.controls({}) : null}
      {children}
    </LarkMap>
  );
};

export default memo(MapContainer);
