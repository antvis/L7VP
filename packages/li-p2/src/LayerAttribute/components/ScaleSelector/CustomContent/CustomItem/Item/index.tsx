import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { InputNumber, Select } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { CustomType } from '../../../type';
import useStyle from './style';

type ItemProps = {
  customType: CustomType;
  value: (string | number | null)[];
  options: { label: string; value: string; count: number }[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: (string | number | null)[]) => void;
};

const Item = ({ customType, value, options, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<(string | number | null)[]>(value);

  const onSelectChange = (val: string[]) => {
    setItemVal(val);
    onChange(val);
  };

  const onFirstInputChange = (e: number) => {
    const val = itemVal?.length === 2 ? [e, itemVal[1]] : [e];
    onChange(val);
    setItemVal(val);
  };

  const onLastInputChange = (e: number) => {
    if (position === 'first') {
      const val = [null, e];
      onChange(val);
      setItemVal(val);
    } else if (position === 'last') {
      const val = [e, null];
      onChange(val);
      setItemVal(val);
    } else {
      const val = itemVal?.length > 0 ? [itemVal[0], e] : [e];
      onChange(val);
      setItemVal(val);
    }
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {customType === 'string' && (
        <Select
          mode="multiple"
          maxTagCount={1}
          allowClear
          style={{ width: '100%' }}
          placeholder="请选择"
          value={itemVal as string[]}
          onChange={onSelectChange}
          options={options}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      )}

      {customType === 'number' && (
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
