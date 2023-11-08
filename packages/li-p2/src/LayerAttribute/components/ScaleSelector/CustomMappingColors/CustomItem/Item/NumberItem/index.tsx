import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Input, InputNumber, Select, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import useStyle from './style';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  customType: 'string' | 'number';
  value: (string | number)[];
  options: { label: string; value: string }[];
  min: number;
  max: number;
  position: string | null;
  onChange: (val: (string | number)[]) => void;
};

const NumberItem = ({ size = 'middle', customType, value, options, min, max, position, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<(string | number)[]>(value);

  const onSelectChange = (val: string[]) => {
    setItemVal(val);
    onChange(val);
  };

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
      {customType === 'string' && (
        <Select
          size={size}
          mode="tags"
          maxTagCount={1}
          popupMatchSelectWidth={false}
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
              <Input size={size} value="MIN" bordered={false} className={`${prefixCls}__input-group__input-desc`} />
              <span style={{ margin: '0 2px' }}>-</span>
              <Tooltip title={itemVal?.[1]}>
                <InputNumber
                  size={size}
                  min={min}
                  max={max}
                  value={itemVal?.[1]}
                  className={`${prefixCls}__input-group__input`}
                  onChange={(e) => onLastInputChange(e as number)}
                />
              </Tooltip>
            </>
          )}

          {position === 'last' && (
            <>
              <Tooltip title={itemVal?.[0]}>
                <InputNumber
                  size={size}
                  min={min}
                  max={max}
                  value={itemVal?.[0]}
                  className={`${prefixCls}__input-group__input`}
                  onChange={(e) => onLastInputChange(e as number)}
                />
              </Tooltip>
              <span style={{ margin: '0 2px' }}>-</span>
              <Input size={size} value="MAX" bordered={false} className={`${prefixCls}__input-group__input-desc`} />
            </>
          )}

          {!position && (
            <>
              <Tooltip title={itemVal?.[0]}>
                <InputNumber
                  size={size}
                  min={min}
                  max={max}
                  value={itemVal?.[0]}
                  className={`${prefixCls}__input-group__input`}
                  onChange={(e) => onFirstInputChange(e as number)}
                />
              </Tooltip>
              <span style={{ margin: '0 2px' }}>-</span>
              <Tooltip title={itemVal?.[1]}>
                <InputNumber
                  size={size}
                  min={min}
                  max={max}
                  value={itemVal?.[1]}
                  className={`${prefixCls}__input-group__input`}
                  onChange={(e) => onLastInputChange(e as number)}
                />
              </Tooltip>
            </>
          )}
        </div>
      )}
    </div>,
  );
};

export default NumberItem;
