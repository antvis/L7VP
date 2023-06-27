import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { CustomControl, ZoomControl as Zoom } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import classNames from 'classnames';
import { round } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

/** 组件名称, 前缀 */
const CLS_PREFIX = 'li-zoom-control';

export interface ZoomControlProps extends ImplementWidgetProps, Properties {}

const ZoomControl: React.FC<ZoomControlProps> = (props) => {
  const { position, showZoom = true } = props;
  const styles = useStyle();

  return showZoom ? (
    <ZoomWithNumberControl position={position} />
  ) : (
    <Zoom className={classNames(`${CLS_PREFIX}__l7`, styles.l7Zoom)} position={props.position} />
  );
};

function ZoomWithNumberControl(props: Pick<ZoomControlProps, 'position'>) {
  const { position } = props;
  const [scene] = useScene();
  const [zoom, setZoom] = useState(() => round(scene?.getZoom() ?? 3));
  const styles = useStyle();

  const onZoomIn = () => {
    scene?.zoomIn();
  };

  const onZoomOut = () => {
    scene?.zoomOut();
  };

  useEffect(() => {
    if (scene) {
      const onZoomChange = () => {
        const zoomend = round(scene.getZoom());
        setZoom(zoomend);
      };

      scene.on('zoomend', onZoomChange);
      return () => {
        scene.off('zoomend', onZoomChange);
      };
    }
  }, [scene]);

  return (
    <CustomControl position={position} className={classNames(CLS_PREFIX, styles.zoomControl)}>
      <div
        className={classNames(
          `${CLS_PREFIX}__zoom-item`,
          styles.zoomItem,
          `${CLS_PREFIX}__zoom-btn`,
          styles.zoomBtn,
          `${CLS_PREFIX}__zoom-btn_in`,
          styles.zoomBtnIn,
        )}
        onClick={onZoomIn}
      >
        <PlusOutlined />
      </div>
      <div
        className={classNames(
          `${CLS_PREFIX}__zoom-item`,
          styles.zoomItem,
          `${CLS_PREFIX}__zoom-number`,
          styles.zoomNumber,
        )}
      >
        {zoom}
      </div>
      <div
        className={classNames(
          `${CLS_PREFIX}__zoom-item`,
          styles.zoomItem,
          `${CLS_PREFIX}__zoom-btn`,
          styles.zoomBtn,
          `${CLS_PREFIX}__zoom-btn_out`,
          styles.zoomBtnOut,
        )}
        onClick={onZoomOut}
      >
        <MinusOutlined />
      </div>
    </CustomControl>
  );
}

export default ZoomControl;
