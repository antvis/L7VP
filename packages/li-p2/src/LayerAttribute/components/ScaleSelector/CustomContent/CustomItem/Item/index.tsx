import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { InputNumber, Select } from 'antd';
import classnames from 'classnames';
import React, { useEffect, useState } from 'react';
import type { CustomType } from '../../../type';
import useStyle from './style';

type ItemProps = {
  customType: CustomType;
  value: (string | number)[];
  onChange: (val: (string | number)[]) => void;
};

const Item = ({ customType, value, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [itemVal, setItemVal] = useState<(string | number)[]>(value);

  const onSelectChange = (val: string[]) => {
    setItemVal(val);
  };

  const onFirstInputChange = (e: number) => {
    const val = itemVal?.length === 2 ? [e, itemVal[1]] : [e];
    setItemVal(val);
  };

  const onLastInputChange = (e: number) => {
    const val = itemVal?.length === 2 ? [itemVal[0], e] : [e];
    setItemVal(val);
  };

  useEffect(() => {
    if (itemVal?.length) {
      onChange(itemVal);
    }
  }, [itemVal]);

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      {customType === 'customArray' && (
        <Select
          mode="multiple"
          maxTagCount={1}
          allowClear
          style={{ width: '100%' }}
          placeholder="请选择"
          value={itemVal as string[]}
          onChange={onSelectChange}
          options={[
            { value: 'jack', label: 'Jack' },
            { value: 'lucy', label: 'Lucy' },
            { value: 'Yiminghe', label: 'yiminghe' },
          ]}
        />
      )}

      {customType === 'customCat' && (
        <div className={`${prefixCls}__input-group`}>
          <InputNumber
            size="small"
            value={itemVal?.[0]}
            className={`${prefixCls}__input-group__input`}
            onChange={(e) => onFirstInputChange(e as number)}
          />
          <span style={{ margin: '0 8px' }}>-</span>
          <InputNumber
            size="small"
            value={itemVal?.[1]}
            className={`${prefixCls}__input-group__input`}
            onChange={(e) => onLastInputChange(e as number)}
          />
        </div>
      )}
    </div>,
  );
};

export default Item;
