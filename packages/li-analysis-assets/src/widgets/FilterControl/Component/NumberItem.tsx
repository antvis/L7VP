import { DownOutlined } from '@ant-design/icons';
import type { NumberConfig } from '@antv/li-p2';
import { FilterNumberConfig } from '@antv/li-p2';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import useStyle from './style';

export interface NumberItemProps {
  value: NumberConfig;
  onChange: (value: NumberConfig) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { value: defaluValue, onChange } = props;
  const styles = useStyle();
  const [open, setOpen] = useState(false);

  const [valAndOperator, setValAndOperator] = useState<{
    value?: number | [number, number];
    operator: '>=' | '<=' | 'BETWEEN';
  }>({ value: defaluValue.value, operator: defaluValue.operator });

  const onValueChange = (val: number | [number, number] | undefined, operator: '>=' | '<=' | 'BETWEEN') => {
    setValAndOperator({ value: val, operator });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    const numberNode = { ...defaluValue, ...valAndOperator } as NumberConfig;
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

  const title = !defaluValue.value
    ? '不限'
    : defaluValue.operator === 'BETWEEN'
    ? `${defaluValue.value[0]} ~ ${defaluValue.value[1]}`
    : `${defaluValue.operator} ${defaluValue.value}`;

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
