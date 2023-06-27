import type { Scene } from '@antv/l7';
import type { LocationSearchOption } from '@antv/larkmap';
import { LocationSearch, useDraw } from '@antv/larkmap';
import type { DrawData } from '@antv/larkmap/es/components/Draw/types';
import { point } from '@turf/turf';
import { Button, message } from 'antd';
import React, { useEffect } from 'react';
import './DrawContol.less';

type DrawControlProps = {
  type: 'point' | 'polygon' | 'line' | 'rect' | 'circle';
  initialData?: DrawData;
  scene?: Scene | null;
  onChange?: (value: DrawData) => void;
};

export const DrawContol: React.FC<DrawControlProps> = ({ type, initialData, scene, onChange }) => {
  const { draw, enable, drawData } = useDraw({
    type: type,
    // @ts-ignore
    options: { initialData, maxCount: 1 },
  });
  const [messageApi, messageContextHolder] = message.useMessage();

  useEffect(() => {
    enable();
  }, [enable]);

  useEffect(() => {
    onChange?.(drawData);
  }, [drawData, onChange]);

  useEffect(() => {
    return () => {
      draw.clear();
    };
  }, []);

  const onChanges = (name?: string, item?: LocationSearchOption) => {
    if (item && scene) {
      const { longitude, latitude } = item;
      scene.setZoomAndCenter(16, [longitude, latitude]);
      messageApi.success(`地图移动至 ${name}`);
      const points = point([longitude, latitude]);
      draw.setData([points]);
    }
  };

  return (
    <div className="li-draw-contol">
      {messageContextHolder}
      <LocationSearch
        searchParams={{
          key: 'fdef552a086edf93e01b6bac2eb89197',
        }}
        showDistrict
        showAddress
        autoFocus
        value={null}
        onChange={onChanges}
      />

      <Button
        onClick={() => {
          draw.clear();
        }}
        className={`li-draw-contol__btn`}
      >
        <div className={`li-draw-contol__btn-item`}>
          <svg className={`li-draw-contol__btn-icon`} aria-hidden="true">
            <use xlinkHref="#l7draw-qingkong" />
          </svg>
          <div>清除</div>
        </div>
      </Button>
    </div>
  );
};
