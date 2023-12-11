import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Input, InputNumber, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import useStyle from './style';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  min: number;
  max: number;
  value: [number, number];
  position: string | null;
  onChange: (val: [number, number]) => void;
};

const NumberItem = ({ size = 'middle', value, min = -Infinity, max = Infinity, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-input__number');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<[number, number]>(value);

  const onFirstInputChange = (e: number) => {
    const val: [number, number] = itemVal?.length === 2 ? [e, itemVal[1]] : [e, Infinity];
    onChange(val);
    setItemVal(val);
  };

  const onLastInputChange = (e: number) => {
    if (position === 'first') {
      const val: [number, number] = [-Infinity, e];
      onChange(val);
      setItemVal(val);
    } else if (position === 'last') {
      const val: [number, number] = [e, Infinity];
      onChange(val);
      setItemVal(val);
    } else {
      const val: [number, number] = itemVal?.length > 0 ? [itemVal[0], e] : [-Infinity, e];
      onChange(val);
      setItemVal(val);
    }
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {position === 'first' && (
        <>
          <Input size={size} value="MIN" bordered={false} className={`${prefixCls}__input-desc`} />
          <span style={{ margin: '0 2px' }}>-</span>
          <Tooltip title={itemVal?.[1]}>
            <InputNumber
              controls={false}
              size={size}
              min={min}
              max={max}
              value={itemVal?.[1]}
              className={`${prefixCls}__input`}
              onChange={(e) => onLastInputChange(e as number)}
            />
          </Tooltip>
        </>
      )}

      {position === 'last' && (
        <>
          <Tooltip title={itemVal?.[0]}>
            <InputNumber
              controls={false}
              size={size}
              min={min}
              max={max}
              value={itemVal?.[0]}
              className={`${prefixCls}__input`}
              onChange={(e) => onLastInputChange(e as number)}
            />
          </Tooltip>
          <span style={{ margin: '0 2px' }}>-</span>
          <Input size={size} value="MAX" bordered={false} className={`${prefixCls}__input-desc`} />
        </>
      )}

      {!position && (
        <>
          <Tooltip title={itemVal?.[0]}>
            <InputNumber
              controls={false}
              size={size}
              min={min}
              max={itemVal?.[1]}
              value={itemVal?.[0]}
              className={`${prefixCls}__input`}
              onChange={(e) => onFirstInputChange(e as number)}
            />
          </Tooltip>
          <span style={{ margin: '0 2px' }}>-</span>
          <Tooltip title={itemVal?.[1]}>
            <InputNumber
              controls={false}
              size={size}
              min={itemVal?.[0]}
              max={max}
              value={itemVal?.[1]}
              className={`${prefixCls}__input`}
              onChange={(e) => onLastInputChange(e as number)}
            />
          </Tooltip>
        </>
      )}
    </div>,
  );
};

export default NumberItem;
