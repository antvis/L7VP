import { Checkbox, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

type ZoomProps = {
  onChange: (val: { minZoom?: number; maxZoom?: number }) => void;
};

export const CLS_PREFIX = 'li-analysis-vector-tiles-loader-control-zoom';

const Zoom = (props: ZoomProps) => {
  const [minZoom, setMinZoom] = useState(0);
  const [maxZoom, setMaxZoom] = useState(14);
  const [minChecked, setMinCheck] = useState(true);
  const [maxChecked, setMaxCheck] = useState(true);

  useEffect(() => {
    props.onChange({ minZoom: minChecked ? minZoom : undefined, maxZoom: maxChecked ? maxZoom : undefined });
  }, [minZoom, maxZoom]);

  return (
    <div className={`${CLS_PREFIX}__input-number`}>
      <div className={`${CLS_PREFIX}__input-number-min`}>
        <Checkbox
          checked={minChecked}
          onChange={(e) => {
            setMinCheck(e.target.checked);
          }}
        >
          最小缩放级别
        </Checkbox>
        <InputNumber
          min={0}
          value={minZoom}
          max={maxZoom}
          size="small"
          onChange={(val) => {
            setMinZoom(Number(val));
          }}
        />
      </div>
      <div className={`${CLS_PREFIX}__input-number-max`}>
        <Checkbox
          checked={maxChecked}
          onChange={(e) => {
            setMaxCheck(e.target.checked);
          }}
        >
          最大缩放级别
        </Checkbox>
        <InputNumber
          min={minZoom}
          value={maxZoom}
          size="small"
          onChange={(val) => {
            setMaxZoom(Number(val));
          }}
        />
      </div>
    </div>
  );
};

export default Zoom;
