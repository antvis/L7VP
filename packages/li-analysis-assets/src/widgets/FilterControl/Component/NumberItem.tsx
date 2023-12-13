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
  const domain = defaluValue.params?.domain || [-Infinity, Infinity];
  const styles = useStyle();
  const [open, setOpen] = useState(false);
  const [ranges, setRanges] = useState<[number | undefined, number | undefined]>([undefined, undefined]);

  useEffect(() => {
    if (defaluValue.operator === '>=') {
      setRanges([defaluValue.value, undefined]);
    } else if (defaluValue.operator === '<=') {
      setRanges([undefined, defaluValue.value]);
    } else if (defaluValue.operator === 'BETWEEN') {
      setRanges(defaluValue.value);
    }
  }, [defaluValue]);

  const onValueChange = (val: [number | undefined, number | undefined]) => {
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
      onChange({
        ...defaluValue,
        operator: '<=',
        value: ranges[1] as number,
      });
      setOpen(false);
      return;
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

  return (
    <Popover content={content} trigger="click" open={open} onOpenChange={handleOpenChange}>
      <div className={styles.numberItem}>
        <div>
          {defaluValue.operator === 'BETWEEN'
            ? `${defaluValue.value[0]} - ${defaluValue.value[1]}`
            : `${defaluValue.operator} ${defaluValue.value}`}
        </div>
        <DownOutlined />
      </div>
    </Popover>
  );
};

export default NumberItem;
