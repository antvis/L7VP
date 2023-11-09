import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { InputNumber, Slider as AntdSlider } from 'antd';
import type { SliderRangeProps } from 'antd/lib/slider';
import cls from 'classnames';
import { isArray } from 'lodash-es';
import React from 'react';
import useStyle from './style';

const defaultConfig = {
  min: 0,
  max: 100,
  step: 1,
};

type InternalSliderRangeProps = SliderRangeProps & {
  showSlider?: boolean;
};

const InternalSliderRange: React.FC<InternalSliderRangeProps> = (props) => {
  const prefixCls = usePrefixCls('formily-slider-range', props);
  const { showSlider = true, ...otherProps } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const config = { ...defaultConfig, ...otherProps };
  const range = isArray(props.value) ? props.value : props.defaultValue || [0, 100];

  const onValueChange = (val: [number, number]) => {
    props.onChange?.(val);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      {showSlider && (
        <AntdSlider
          {...config}
          range={true}
          onChange={(val) => {
            props.onChange?.(val);
          }}
        />
      )}
      <div className={`${prefixCls}__input-number`}>
        <InputNumber
          min={config.min}
          max={range[1] ?? config.max}
          size="small"
          value={range[0]}
          onChange={(e) => {
            if (Number(e) <= range[1]) {
              onValueChange([Number(e), range[1]]);
            }
          }}
        />
        <InputNumber
          min={range[0] ?? config.min}
          max={config.max}
          size="small"
          value={range[1]}
          onChange={(e) => {
            if (Number(e) >= range[0]) {
              onValueChange([range[0], Number(e)]);
            }
          }}
        />
      </div>
    </div>,
  );
};

const SliderRange = connect(InternalSliderRange);

export default SliderRange;
