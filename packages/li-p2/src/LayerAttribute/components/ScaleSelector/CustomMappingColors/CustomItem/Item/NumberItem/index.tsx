import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Input, InputNumber, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import useStyle from './style';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  value: (string | number)[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: (string | number)[]) => void;
};

const NumberItem = ({ size = 'middle', value, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item-number');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<(string | number)[]>(value);

  const onFirstInputChange = (e: number) => {
    const val = itemVal?.length === 2 ? [e, itemVal[1]] : [e, Infinity];
    onChange(val);
    setItemVal(val);
  };

  const onLastInputChange = (e: number) => {
    if (position === 'first') {
      const val = [-Infinity, e];
      onChange(val);
      setItemVal(val);
    } else if (position === 'last') {
      const val = [e, Infinity];
      onChange(val);
      setItemVal(val);
    } else {
      const val = itemVal?.length > 0 ? [itemVal[0], e] : [-Infinity, e];
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
              max={max}
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
              min={min}
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
