import { Input, InputNumber, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import './index.less';

type Props = {
  onChange?: (e: any) => void;
};
type Type = 'string' | 'expression' | 'boolean' | 'number';

const DynamicFormItemValue = (props: Props) => {
  const [type, setType] = useState<Type>('string');
  const [val, setVal] = useState<string | boolean | number>();
  const { onChange } = props;

  const onValueChange = (val: string | boolean | number) => {
    setVal(val);
  };

  const onTypeChange = (types: Type) => {
    setType(types);
  };

  useEffect(() => {
    if (type === 'expression') {
      const vals = val ? { type: 'JSExpression', value: `${val}` } : null;
      return onChange?.(vals);
    }

    return onChange?.(val);
  }, [type, val]);

  return (
    <div className="li-dynamic-form-item__item__value">
      <div className="li-dynamic-form-item__item__value__content">
        {type === 'string' && <Input placeholder="请输入" onChange={(e) => onValueChange(e.target.value)} />}
        {type === 'boolean' && <Switch onChange={onValueChange} />}
        {type === 'number' && <InputNumber placeholder="请输入" onChange={(e) => onValueChange(Number(e))} />}
        {type === 'expression' && (
          <Input
            prefix="{{"
            suffix="}}"
            placeholder="请输入 JS 表达式"
            onChange={(e) => onValueChange(e.target.value)}
          />
        )}
      </div>
      <div className="li-dynamic-form-item__item__value__type">
        <Select
          style={{ width: '90px' }}
          value={type}
          onChange={onTypeChange}
          options={[
            { value: 'string', label: '字符串' },
            { value: 'boolean', label: '布尔值' },
            { value: 'number', label: '数值' },
            // { value: 'expression', label: '表达式' },
          ]}
        />
      </div>
    </div>
  );
};

export default DynamicFormItemValue;
