import { DownOutlined } from '@ant-design/icons';
import type { FilterNumber } from '@antv/li-p2';
import { Button, InputNumber, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import useStyle from './style';

export interface NumberItemProps {
  value: FilterNumber;
  onChange: (value: FilterNumber) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { value: defaluValue, onChange } = props;
  const styles = useStyle();
  const domain = (defaluValue.params?.domain || [-Infinity, Infinity]) as [number, number];
  const [open, setOpen] = useState(false);
  const [ranges, setRanges] = useState<[number | null, number | null]>([null, null]);

  useEffect(() => {
    if (defaluValue.operator === '>=') {
      setRanges([defaluValue.value, null]);
    } else if (defaluValue.operator === '<=') {
      setRanges([null, defaluValue.value]);
    } else if (defaluValue.operator === 'BETWEEN') {
      setRanges(defaluValue.value);
    }
  }, [defaluValue]);

  const onValueChange = (val: [number | null, number | null]) => {
    const [min, max] = val;
    setRanges(val);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    if (ranges[0]) {
      if (ranges[1]) {
        onChange({
          ...defaluValue,
          operator: 'BETWEEN',
          value: ranges as [number, number],
        });
        setOpen(false);
        return;
      } else {
        onChange({
          ...defaluValue,
          operator: '>=',
          value: ranges[0],
        });
        setOpen(false);
        return;
      }
    } else {
      if (ranges[1]) {
        onChange({
          ...defaluValue,
          operator: '<=',
          value: ranges[1] as number,
        });
        setOpen(false);
        return;
      } else {
        onChange({
          ...defaluValue,
          operator: '>=',
          value: domain[0] as number,
        });
        setOpen(false);
        return;
      }
    }
  };

  const content = (
    <>
      <div>
        <InputNumber
          placeholder="最小值"
          min={domain[0]}
          max={domain[1]}
          value={ranges[0]}
          onChange={(value) => onValueChange([value, ranges[1]])}
        />
        -
        <InputNumber
          placeholder="最大值"
          min={domain[0]}
          max={domain[1]}
          value={ranges[1]}
          onChange={(value) => onValueChange([ranges[0], value])}
        />
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <Button type="primary" onClick={onSubmit}>
          确定
        </Button>
      </div>
    </>
  );

  const title =
    defaluValue.operator === 'BETWEEN'
      ? `${defaluValue.value[0]} - ${defaluValue.value[1]}`
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
