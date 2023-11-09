import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { InputNumber } from 'antd';
import cls from 'classnames';
import { isEmpty, isFinite } from 'lodash-es';
import React, { useState } from 'react';
import useStyle from './style';

type OffsetValue = [number | null, number | null];

export interface OffsetProps {
  /**
   * 偏移量
   */
  value?: OffsetValue;
  /**
   * 选择发生改变时
   */
  onChange?: (value: OffsetValue) => void;
}

const InternalOffset: React.FC<OffsetProps> = (props) => {
  const prefixCls = usePrefixCls('formily-offset');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [sliderVal, setSliderVal] = useState<OffsetValue>(
    isEmpty(props.value) ? [0, 0] : (props.value?.map((item) => (isFinite(item) ? item : 0)) as OffsetValue),
  );

  const onOffsetValueChange = (val: OffsetValue) => {
    setSliderVal(val);
    props.onChange?.(val);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={`${prefixCls}__input-group`}>
        <InputNumber
          size="small"
          value={sliderVal[0]}
          onChange={(val) => {
            onOffsetValueChange([val, sliderVal[1]]);
          }}
        />
        <InputNumber
          size="small"
          value={sliderVal[1]}
          onChange={(val) => {
            onOffsetValueChange([sliderVal[0], val]);
          }}
        />
      </div>
    </div>,
  );
};

const Offset: React.FC<OffsetProps> = connect(InternalOffset);

export default Offset;
