import type { LocationSearchOption } from '@antv/larkmap';
import { CustomControl, LocationSearch } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import { message } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import useStyle from './ComponenStyle';
import { CLS_PREFIX } from './constants';
import type { Properties } from './registerForm';

export interface LocationSearchControlProps extends ImplementWidgetProps, Properties {
  AMAP_KEY?: string;
}

const LocationSearchControl: React.FC<LocationSearchControlProps> = (props) => {
  const { position, AMAP_KEY = 'fdef552a086edf93e01b6bac2eb89197' } = props;
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
          key: AMAP_KEY,
          location,
        }}
        autoFocus
        bordered={false}
        value={null}
        onChange={onChange}
        popupClassName={classNames(styles.locationSearche, `${CLS_PREFIX}__location-searche`)}
      />
    </CustomControl>
  );
};
export default LocationSearchControl;
