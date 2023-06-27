/* eslint-disable import/no-unresolved */
import type { ILngLat } from '@antv/l7';
import { Marker } from '@antv/larkmap';
import { useScene } from '@antv/li-sdk';
import type { Feature } from '@turf/turf';
import React, { memo, useEffect, useState } from 'react';
import type { ContextMenuProps } from '../types';

type MenuProps = {
  visible: boolean;
  position: ILngLat | undefined;
};

export const ContextMenu = memo((props: ContextMenuProps) => {
  const { children, structure } = props;
  const [scene] = useScene();
  const [initMenu, setInitMenu] = useState<MenuProps>({
    visible: false,
    position: undefined,
  });
  const [params, setParams] = useState<Feature>();

  // 右键打开面板信息
  const mapRightMenuOpen = (e: Record<string, any>) => {
    const { lng, lat } = e.lngLat;
    setParams(e as Feature);
    setInitMenu({
      visible: true,
      position: { lng, lat },
    });
  };

  // 单击事件关闭菜单
  const mapRightMenuClose = () => {
    const timeOut = setTimeout(() => {
      if (timeOut) {
        clearTimeout(timeOut);
        setInitMenu({
          visible: false,
          position: undefined,
        });
      }
    }, 0);
  };

  useEffect(() => {
    const drawMap = structure;
    if (drawMap) {
      Object.values(drawMap).forEach((draw) => {
        const layer = draw.getMainLayer();
        layer[0]?.on('contextmenu', mapRightMenuOpen);
      });
    }
    scene?.on('click', mapRightMenuClose);
    return () => {
      Object.values(drawMap || {}).forEach((draw) => {
        const layer = draw.getMainLayer();
        layer[0]?.off('contextmenu', mapRightMenuOpen);
      });
      scene?.off('click', mapRightMenuClose);
    };
  }, [scene, structure]);

  return initMenu.visible ? (
    <Marker lngLat={initMenu.position as ILngLat} anchor="top-left">
      {children && children(params as Feature)}
    </Marker>
  ) : null;
});
