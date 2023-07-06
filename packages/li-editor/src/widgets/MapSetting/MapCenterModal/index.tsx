import type { ILngLat, Scene } from '@antv/l7';
import type { LarkMapProps, LocationSearchOption } from '@antv/larkmap';
import { CustomControl, LarkMap, LocationSearch } from '@antv/larkmap';
import type { ModalProps } from 'antd';
import { message, Modal } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { CLS_PREFIX } from '../constant';
import './index.less';

export interface MapCenterModalProps extends Omit<ModalProps, 'onOk'> {
  currentMapCenter: [number, number];
  larkMap?: LarkMapProps;
  onSubmit: (mapCenter?: [number, number]) => void;
  zoomValue: number;
  setZoomValue: (v: number) => void;
  mapCenterModalOpen: boolean;
}

export const MapCenterModal: React.FC<MapCenterModalProps> = ({
  currentMapCenter,
  larkMap,
  onSubmit,
  zoomValue,
  setZoomValue,
  mapCenterModalOpen,
  ...modalProps
}) => {
  const [scene, setScene] = useState<Scene | null>(null);
  const [mapCenter, setMapCenter] = useState<ILngLat | null>(null);
  const [messageApi, messageContextHolder] = message.useMessage();

  const onSceneLoaded = (newScene: Scene) => {
    setScene(newScene);
    newScene.setZoomAndCenter(zoomValue, currentMapCenter);
  };

  useEffect(() => {
    if (mapCenterModalOpen && currentMapCenter) {
      const [lng, lat] = currentMapCenter;
      setMapCenter({ lng, lat });
      scene?.setZoomAndCenter(zoomValue, currentMapCenter);
    }
  }, [mapCenterModalOpen]);

  const dragEnd = () => {
    if (scene) {
      setMapCenter(scene.getCenter());
    }
  };

  const zoomEnd = () => {
    if (scene) {
      setMapCenter(scene.getCenter());
    }
  };

  const okClick = () => {
    if (mapCenter) {
      const { lng, lat } = mapCenter;
      onSubmit([lng, lat]);
    }
    if (scene) {
      setZoomValue(scene.getZoom());
    }
  };

  const onChanges = (name?: string, item?: LocationSearchOption) => {
    if (item && scene) {
      const { longitude, latitude } = item;
      scene.setZoomAndCenter(16, [longitude, latitude]);
      setMapCenter({ lng: longitude, lat: latitude });
      messageApi.success(`地图移动至 ${name}`);
    }
  };

  return (
    <Modal {...modalProps} onOk={okClick}>
      <LarkMap {...larkMap} onSceneLoaded={onSceneLoaded} onDragEnd={dragEnd} onZoomEnd={zoomEnd}>
        <div className={`${CLS_PREFIX}__map-center`} />
        <CustomControl className={`${CLS_PREFIX}__control`}>
          {messageContextHolder}
          <LocationSearch
            searchParams={{
              key: 'fdef552a086edf93e01b6bac2eb89197',
            }}
            showDistrict
            showAddress
            autoFocus
            bordered={false}
            value={null}
            onChange={onChanges}
            popupClassName={classNames(`${CLS_PREFIX}__location-search`, `${CLS_PREFIX}__location-search-dropdown`)}
          />
        </CustomControl>
      </LarkMap>
    </Modal>
  );
};

MapCenterModal.defaultProps = {
  width: 900,
  title: '绘制数据',
  okText: '确认',
  cancelText: '取消',
  maskClosable: false,
  destroyOnClose: false,
  bodyStyle: {
    padding: 0,
  },
  larkMap: {
    mapType: 'Gaode',
    mapOptions: {
      style: 'dark',
      jogEnable: false,
    },
    style: {
      height: 400,
    },
  },
};
