import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Select } from 'antd';
import React, { useEffect, useState } from 'react';

type ItemProps = {
  size: 'small' | 'middle' | 'large';
  value: string[];
  options: { label: string; value: string }[];
  onChange: (val: string[]) => void;
};

const StringItem = ({ size = 'middle', value, options, onChange }: ItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-content__custom-item__item-string');
  const [itemVal, setItemVal] = useState(value);

  const onSelectChange = (val: string[]) => {
    setItemVal(val);
    onChange(val);
  };

  useEffect(() => {
    setItemVal(value);
  }, [value]);

  return (
    <div className={prefixCls}>
      <Select
        size={size}
        mode="tags"
        maxTagCount={1}
        popupMatchSelectWidth={false}
        allowClear
        style={{ width: '100%' }}
        placeholder="请选择"
        value={itemVal}
        onChange={onSelectChange}
        options={options}
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      />
    </div>
  );
};

export default StringItem;
