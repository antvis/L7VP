import type { ILayer, ISwipeControlOption } from '@antv/l7';
import { Swipe as L7Swipe } from '@antv/l7';
import type { ICompositeLayer, ICoreLayer } from '@antv/l7-composite-layers';
import { useLayerList, useScene } from '@antv/larkmap';
import { useL7ComponentUpdate } from '@antv/larkmap/es/components/Control/hooks';
import type { Layer } from '@antv/larkmap/es/types';
import { getStyleText } from '@antv/larkmap/es/utils';
import { omitBy } from 'lodash-es';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';

export interface SwipeProps
  extends Omit<Partial<ISwipeControlOption>, 'position' | 'style' | 'layers' | 'rightLayers'> {
  /**
   * 左侧的图层, 支持传图层 ID 或实例
   */
  layers: (string | Layer)[];
  /**
   * 右侧的图层, 支持传图层 ID 或实例
   */
  rightLayers: (string | Layer)[];
  style?: React.CSSProperties;
}

// get L7Layer from CoreLayer Or CompositeLayer
const getL7Layer = (layer: Layer) => {
  const layers: ILayer[] = [];
  if (layer.isComposite) {
    const compositeLayer = layer as ICompositeLayer;
    const l7Layers = compositeLayer.subLayers.getLayers().map((coreLayer) => coreLayer.layer);
    layers.push(...l7Layers);
  } else {
    const coreLayer = layer as ICoreLayer;
    const l7Layer = coreLayer.layer;
    layers.push(l7Layer);
  }
  return layers;
};

// get L7Layers from CoreLayer Or CompositeLayer
const getL7Layers = (layers: (string | Layer)[], instanceLayerList: Layer[]) => {
  return layers
    .map((layer) => {
      if (typeof layer === 'string') {
        const targetLayer = instanceLayerList.find((instanceLayer) => instanceLayer.id === layer);
        return targetLayer ? getL7Layer(targetLayer) : [];
      }

      return getL7Layer(layer);
    })
    .flat();
};

export const Swipe: React.FC<SwipeProps> = ({ name, className, style, layers, rightLayers, ratio, orientation }) => {
  const scene = useScene();
  const [control, setControl] = useState<L7Swipe>();
  const styleText = useMemo(() => getStyleText(style), [style]);
  const instanceLayerList = useLayerList();

  const swipeLayers = useMemo(
    () => ({
      layers: getL7Layers(layers, instanceLayerList),
      rightLayers: getL7Layers(rightLayers, instanceLayerList),
    }),
    [instanceLayerList, layers, rightLayers],
  );

  const controlOptions: Partial<ISwipeControlOption> = useMemo(() => {
    return {
      name,
      className,
      style: styleText,
      layers: swipeLayers.layers,
      rightLayers: swipeLayers.rightLayers,
      ratio,
      orientation,
    };
  }, [name, className, styleText, swipeLayers.layers, swipeLayers.rightLayers, ratio, orientation]);

  useEffect(() => {
    const swipe = new L7Swipe(omitBy(controlOptions, (value) => value === undefined));
    setControl(swipe);
    scene.addControl(swipe);
    return () => {
      scene.removeControl(swipe);
      setControl(undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useL7ComponentUpdate(control!, controlOptions);

  return null;
};
