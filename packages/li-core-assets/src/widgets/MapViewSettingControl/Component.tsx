import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import { Popover, Slider, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import useStyle from './ComponenStyle';
import { CLS_PREFIX, MapViewSettingControlSvg, POPOVER_PLACEMENT_MAP } from './constants';
import type { Properties } from './registerForm';

export interface MapViewSettingProps extends ImplementWidgetProps, Properties {}

const MapViewSettingControl: React.FC<MapViewSettingProps> = (props) => {
  const { position } = props;
  const [scene, { setMapViewState }] = useScene();
  const [pitchValue, setPitchValue] = useState<number>();
  const [rotateValue, setRotateValue] = useState<number>();
  const isGaode = scene?.getType() === 'amap2';
  const styles = useStyle();

  const onPitchChange = (value: number) => {
    setMapViewState({ pitch: value });
    setPitchValue(value);
  };

  const onRotateChange = (value: number) => {
    if (isGaode) {
      setMapViewState({ rotation: value });
    } else {
      // mapBox\map 逆时针旋转更改顺时针
      setMapViewState({ rotation: 360 - value });
    }

    setRotateValue(value);
  };

  useEffect(() => {
    if (scene) {
      const onMapSelectPitch = () => {
        setPitchValue(Math.round(scene.getPitch()));
        const currentRotation = scene.getRotation();

        if (isGaode) {
          setRotateValue(currentRotation > 360 ? Math.round(currentRotation - 360) : Math.round(360 - currentRotation));
        } else {
          // mapBox\map 计算旋转区间顺时针 0 -> -180 -> 180 -> 0 根据旋转角回退到 slider 展示计算
          const rotate =
            currentRotation === 0
              ? 0
              : currentRotation < 0
              ? Math.round(-currentRotation)
              : Math.round(360 - currentRotation);

          setRotateValue(rotate);
        }
      };

      onMapSelectPitch();

      scene?.on('moveend', onMapSelectPitch);
      return () => {
        scene?.off('moveend', onMapSelectPitch);
      };
    }
  }, [scene]);

  // 判断气泡方向
  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_MAP.get(position);
  }, [position]);

  const content = (
    <div className={classNames(`${CLS_PREFIX}__setting-container`, styles.settingContainer)}>
      <div className={classNames(`${CLS_PREFIX}__setting-container__item`, styles.settingContainerItem)}>
        <div>地图倾斜</div>
        <div>{`${pitchValue}°`}</div>
      </div>
      <Slider value={pitchValue} min={0} max={isGaode ? 90 : 60} onChange={onPitchChange} />
      <div className={classNames(`${CLS_PREFIX}__setting-container__item`, styles.settingContainerItem)}>
        <div>地图旋转</div>
        <div>{`${rotateValue}°`}</div>
      </div>
      <Slider value={rotateValue} min={0} max={360} onChange={onRotateChange} />
    </div>
  );

  return (
    <CustomControl position={position} className={CLS_PREFIX}>
      <Popover arrow={false} placement={onPlacement} content={content} trigger="click">
        <Tooltip placement={onPlacement} title="地图倾角">
          <div className={classNames(`${CLS_PREFIX}__setting-btn`, styles.SettingBtn)}>
            <Icon component={MapViewSettingControlSvg} />
          </div>
        </Tooltip>
      </Popover>
    </CustomControl>
  );
};

export default MapViewSettingControl;
