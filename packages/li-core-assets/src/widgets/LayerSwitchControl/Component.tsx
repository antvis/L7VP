import { CustomControl, LayerSwitchControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useGlobalModel, useScene } from '@antv/li-sdk';
import { useDebounceEffect } from 'ahooks';
import React, { useMemo } from 'react';
import type { Properties } from './registerForm';
import useStyle from './style';

export interface LayerSwitchProps extends Properties, ImplementWidgetProps {}

const LayerSwitch: React.FC<LayerSwitchProps> = (props) => {
  const { position, layerFilter, isMultiple } = props;
  const [scene] = useScene();
  const style = useStyle();
  const [, setGlobalData] = useGlobalModel();

  const newLayers = useMemo(() => {
    return layerFilter
      ?.filter(({ visible }) => visible)
      ?.map((item) => ({
        layer: item?.id,
        name: item?.name,
        img: item?.img,
      }));
  }, [layerFilter, isMultiple, scene]);

  useDebounceEffect(() => {
    if (!isMultiple && layerFilter?.length) {
      const [firstLayer] = layerFilter;
      setGlobalData({ visibleLayer: firstLayer.name, isMultiple });
    }
  }, [isMultiple, layerFilter]);

  return (
    <CustomControl position={position}>
      <LayerSwitchControl
        position={position}
        layers={newLayers as any[]}
        className={style.layerSwitch}
        popperTrigger="hover"
        multiple={isMultiple}
        onSelectChange={(name) => {
          if (!isMultiple) {
            setGlobalData({ visibleLayer: name, isMultiple });
            // 单选时瓦片图层不会展示，采用zoom最小阀值来更改地图的状态
            // 瓦片图层随zoom展示，在切换时地图状态并没有更改，所以不展示，也许是L7的bug。
            scene?.setZoom(scene.getZoom() + 0.001);
          }
        }}
      />
    </CustomControl>
  );
};

export default LayerSwitch;
