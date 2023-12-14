import { DownOutlined } from '@ant-design/icons';
import type { FilterNumber } from '@antv/li-p2';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import { FilterNumberItem } from '@antv/li-p2';
import useStyle from './style';

export interface NumberItemProps {
  value: FilterNumber;
  onChange: (value: FilterNumber) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { value: defaluValue, onChange } = props;
  const styles = useStyle();
  const domain = defaluValue.params?.domain || [-Infinity, Infinity];
  const [open, setOpen] = useState(false);

  const [valAndOperator, setValAndOperator] = useState<{
    value: number | [number, number];
    operator: '>=' | '<=' | 'BETWEEN';
  }>({ value: defaluValue.value, operator: defaluValue.operator });

  const onValueChange = (val: number | [number, number], operator: '>=' | '<=' | 'BETWEEN') => {
    setValAndOperator({ value: val, operator });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    const numberNode = { ...defaluValue, ...valAndOperator } as FilterNumber;
    onChange(numberNode);
    setOpen(false);
  };

  const content = (
    <>
      <FilterNumberItem
        value={defaluValue.value}
        min={domain[0]}
        max={domain[1]}
        operator={defaluValue.operator}
        onChange={onValueChange}
      />
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button type="primary" onClick={onSubmit}>
          确定
        </Button>
      </div>
    </>
  );

  const title =
    defaluValue.operator === 'BETWEEN'
      ? `${defaluValue.value[0]} ~ ${defaluValue.value[1]}`
      : defaluValue.operator === '>=' && defaluValue.value === domain[0]
      ? '不限'
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
