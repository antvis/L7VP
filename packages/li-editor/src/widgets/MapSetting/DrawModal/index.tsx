import type { Scene } from '@antv/l7';
import type { LarkMapProps } from '@antv/larkmap';
import { LarkMap } from '@antv/larkmap';
import type { DrawData, FeatureData } from '@antv/larkmap/es/components/Draw/types';
import { bbox, bboxPolygon } from '@turf/turf';
import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React, { useMemo, useState } from 'react';
import { DrawContol } from './DrawContol';

export interface DrawModalProps extends Omit<ModalProps, 'onOk'> {
  type: 'point' | 'polygon' | 'line' | 'rect' | 'circle';
  initialData?: FeatureData;
  larkMap?: LarkMapProps;
  onSubmit?: (data?: FeatureData) => void;
}

export const DrawModal: React.FC<DrawModalProps> = ({ type, initialData, larkMap, onSubmit, ...modalProps }) => {
  const [drawData, setDrawData] = useState<DrawData>([]);
  const [scene, setScene] = useState<Scene | null>(null);

  const initDrawData = useMemo(() => (initialData ? [initialData] : []), [initialData]);

  const onSceneLoaded = (newScene: Scene) => {
    setScene(newScene);
    if (initialData) {
      const bounds = bboxPolygon(bbox(initialData)).bbox;
      if (bounds) {
        newScene.fitBounds([
          [bounds[0], bounds[1]],
          [bounds[2], bounds[3]],
        ]);
      }
    }
  };

  return (
    <Modal {...modalProps} onOk={() => onSubmit?.(drawData[0])}>
      <LarkMap {...larkMap} onSceneLoaded={onSceneLoaded}>
        <DrawContol
          type={type}
          initialData={initDrawData}
          scene={scene}
          onChange={(data) => {
            setDrawData(data);
          }}
        />
      </LarkMap>
    </Modal>
  );
};

DrawModal.defaultProps = {
  width: 900,
  title: '绘制数据',
  okText: '确认',
  cancelText: '取消',
  maskClosable: false,
  destroyOnClose: true,
  bodyStyle: {
    padding: 0,
  },
  larkMap: {
    mapType: 'Gaode',
    mapOptions: {
      style: 'dark',
    },
    style: {
      height: 400,
    },
  },
};
