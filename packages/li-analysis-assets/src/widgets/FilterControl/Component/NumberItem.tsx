import { DownOutlined } from '@ant-design/icons';
import type { FilterNumberConfigType } from '@antv/li-p2';
import { FilterNumberConfig } from '@antv/li-p2';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import useStyle from './style';

export interface NumberItemProps {
  defaluValue: FilterNumberConfigType;
  onChange: (value: FilterNumberConfigType) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { defaluValue, onChange } = props;
  const styles = useStyle();
  const [open, setOpen] = useState(false);

  const [valAndOperator, setValAndOperator] = useState<Pick<FilterNumberConfigType, 'operator' | 'value'>>({
    value: defaluValue.value,
    operator: defaluValue.operator,
  });

  const onValueChange = (val: number | [number, number] | undefined, operator: '>=' | '<=' | 'BETWEEN') => {
    setValAndOperator({ value: val, operator });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    const numberNode = { ...defaluValue, ...valAndOperator } as FilterNumberConfigType;
    onChange(numberNode);
    setOpen(false);
  };

  const content = (
    <div className={styles.numberContent}>
      <FilterNumberConfig value={defaluValue.value} operator={defaluValue.operator} onChange={onValueChange} />
      <div className={styles.numberSubmit}>
        <Button type="primary" size="small" onClick={onSubmit}>
          确定
        </Button>
      </div>
    </div>
  );

  const title = !valAndOperator.value
    ? '不限'
    : valAndOperator.operator === 'BETWEEN' && Array.isArray(valAndOperator.value)
    ? `${valAndOperator.value[0]} ~ ${valAndOperator.value[1]}`
    : `${valAndOperator.operator} ${valAndOperator.value}`;

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
      <div className={styles.numberItem}>
        <div>{title}</div>
        <DownOutlined />
      </div>
    </Popover>
  );
};

export default NumberItem;
