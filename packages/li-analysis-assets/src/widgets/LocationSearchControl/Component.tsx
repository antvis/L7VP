import type { LocationSearchOption } from '@antv/larkmap';
import { CustomControl, LocationSearch } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import { Empty, message } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import useStyle from './ComponenStyle';
import { CLS_PREFIX } from './constants';
import type { Properties } from './registerForm';

export interface LocationSearchControlProps extends ImplementWidgetProps, Properties {
  AMAP_KEY?: string;
  PRIVATE_KEY?: string;
}

const LocationSearchControl: React.FC<LocationSearchControlProps> = (props) => {
  const {
    position,
    AMAP_KEY = 'd76a81e912e36130d498216d1085db31',
    PRIVATE_KEY = 'ebdfcc6939257864bc9132f741811043',
  } = props;
  const [location, setLocation] = useState('');
  const [scene] = useScene();
  const styles = useStyle();
  const [messageApi, messageContextHolder] = message.useMessage();

  // 同步地图中心点至 location 中
  const syncMapCenter = useCallback(() => {
    if (scene) {
      const { lng, lat } = scene.getCenter();
      setLocation(`${lng},${lat}`);
    }
  }, [scene]);

  useEffect(() => {
    if (scene) {
      syncMapCenter();
      scene?.on('moveend', syncMapCenter);
      scene?.on('zoomend', syncMapCenter);
    }
  }, [scene, syncMapCenter]);

  const onChange = (name?: string, item?: LocationSearchOption) => {
    if (item) {
      const { longitude, latitude } = item;
      scene?.setZoomAndCenter(16, [longitude, latitude]);
      messageApi.success(`地图移动至 ${name}`);
    }
  };

  return (
    <CustomControl position={position} className={classNames(styles.locationSearcheContainer, CLS_PREFIX)}>
      {messageContextHolder}
      <LocationSearch
        searchParams={{
          location,
          key: AMAP_KEY,
          privateKey: PRIVATE_KEY,
        }}
        autoFocus
        bordered={false}
        value={null}
        notFoundContent={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={false} />}
        onChange={onChange}
        popupClassName={classNames(styles.locationSearche, `${CLS_PREFIX}__location-searche`)}
      />
    </CustomControl>
  );
};
export default LocationSearchControl;
