import { Swipe } from '@antv/l7';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import type React from 'react';
import { useEffect, useRef } from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

/** 组件名称, 前缀 */
const CLS_PREFIX = 'li-swipe-control';

export interface SwipeControlProps extends ImplementWidgetProps, Properties {}

const SwipeControl: React.FC<SwipeControlProps> = (props) => {
  const { position, orientation, leftLayers, rightLayers } = props;
  const styles = useStyle();
  const [scene] = useScene();

  const swipeRef = useRef(
    new Swipe({
      orientation: orientation,
      ratio: 0.5,
      layers: [],
      rightLayers: [],
    }),
  );

  useEffect(() => {
    scene?.addControl(swipeRef.current);

    return () => {
      scene?.removeControl(swipeRef.current);
    };
  }, [scene]);

  return null;
};

export default SwipeControl;
