import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { InputNumber } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import useStyle from './style';

type ItemProps = {
  type: 'cat' | 'custom';
  value: (string | number)[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: number[]) => void;
};

const Item = ({ type, value, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-rester--scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<(string | number)[]>(value);

  const onInputChange = (e: number) => {
    onChange([e]);
    setItemVal([e]);
  };

  const onFirstInputChange = (e: number) => {
    const val = (itemVal?.length === 2 ? [e, itemVal[1]] : [e, Infinity]) as number[];
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
      const val = (itemVal?.length > 0 ? [itemVal[0], e] : [-Infinity, e]) as number[];
      onChange(val);
      setItemVal(val);
    }
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {type === 'cat' && (
        <InputNumber
          size="small"
          min={min}
          max={max}
          value={itemVal?.[0]}
          style={{ width: '100%' }}
          onChange={(e) => onInputChange(e as number)}
        />
      )}

      {type === 'custom' && (
        <div className={classnames(`${prefixCls}__input-group`, hashId)}>
          {position === 'first' && (
            <>
              <span style={{ margin: '0 8px' }}>{`<`}</span>
              <InputNumber
                size="small"
                min={min}
                max={max}
                value={itemVal?.[1]}
                className={`${prefixCls}__input-group__input`}
                onChange={(e) => onLastInputChange(e as number)}
              />
            </>
          )}

          {position === 'last' && (
            <>
              <span style={{ margin: '0 8px' }}>{`>`}</span>
              <InputNumber
                size="small"
                min={min}
                max={max}
                value={itemVal?.[0]}
                className={`${prefixCls}__input-group__input`}
                onChange={(e) => onLastInputChange(e as number)}
              />
            </>
          )}

          {!position && (
            <>
              <InputNumber
                size="small"
                min={min}
                max={max}
                value={itemVal?.[0]}
                className={`${prefixCls}__input-group__input`}
                onChange={(e) => onFirstInputChange(e as number)}
              />
              <span style={{ margin: '0 8px' }}>-</span>
              <InputNumber
                size="small"
                min={min}
                max={max}
                value={itemVal?.[1]}
                className={`${prefixCls}__input-group__input`}
                onChange={(e) => onLastInputChange(e as number)}
              />
            </>
          )}
        </div>
      )}
    </div>,
  );
};

export default Item;
