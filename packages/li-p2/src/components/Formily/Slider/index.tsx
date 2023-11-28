import { connect } from '@formily/react';

import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { InputNumber, Slider as AntdSlider } from 'antd';
import type { SliderSingleProps } from 'antd/lib/slider';
import cls from 'classnames';
import React, { useState } from 'react';
import useStyle from './style';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

const InternalSlider: React.FC<SliderSingleProps> = (props) => {
  const prefixCls = usePrefixCls('formily-slider', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const config = { ...defaultConfig, ...props };

  const [sliderVal, setSliderVal] = useState<number>(config.value ?? 0);

  const onValueChange = (value: number) => {
    setSliderVal(value);
    props.onChange?.(value);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <AntdSlider
        range={false}
        {...config}
        value={sliderVal}
        onChange={(val) => {
          onValueChange(val);
        }}
      />
      <InputNumber
        size="small"
        min={config.min}
        max={config.max}
        step={config.step || 1}
        value={sliderVal}
        onChange={(val) => {
          onValueChange(Number(val));
        }}
        onBlur={() => {
          if (!props.value) {
            onValueChange(0);
          }
        }}
      />
    </div>,
  );
};

const Slider = connect(InternalSlider);

export default Slider;
