import { Checkbox, InputNumber } from 'antd';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { usePrefixCls } from '../../../hooks';
import useStyle from './style';

type ZoomProps = {
  onChange: (val: { minZoom?: number; maxZoom?: number }) => void;
};

const Zoom = (props: ZoomProps) => {
  const prefixCls = usePrefixCls('tiles-zoom');
  const styles = useStyle();
  const [minZoom, setMinZoom] = useState(0);
  const [maxZoom, setMaxZoom] = useState(18);
  const [minChecked, setMinCheck] = useState(true);
  const [maxChecked, setMaxCheck] = useState(true);

  useEffect(() => {
    props.onChange({ minZoom: minChecked ? minZoom : undefined, maxZoom: maxChecked ? maxZoom : undefined });
  }, [minZoom, maxZoom]);

  return (
    <div className={classNames(`${prefixCls}__input-number`, styles.tilesZoomInputNumber)}>
      <div className={classNames(`${prefixCls}__input-number-min`, styles.tilesZoomInputNumberMin)}>
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
      <div className={classNames(`${prefixCls}__input-number-max`, styles.tilesZoomInputNumberMin)}>
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
