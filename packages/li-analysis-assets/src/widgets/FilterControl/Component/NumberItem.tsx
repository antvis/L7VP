import { DownOutlined } from '@ant-design/icons';
import type { FilterNumberConfigType } from '@antv/li-p2';
import { FilterNumberConfig } from '@antv/li-p2';
import { useUpdateEffect } from 'ahooks';
import { Button, Popover } from 'antd';
import React, { useState } from 'react';
import useStyle from './style';

export interface NumberItemProps {
  defaultValue: FilterNumberConfigType;
  onChange: (value: FilterNumberConfigType) => void;
}

const NumberItem: React.FC<NumberItemProps> = (props) => {
  const { defaultValue, onChange } = props;
  const styles = useStyle();
  const [open, setOpen] = useState(false);

  const [valAndOperator, setValAndOperator] = useState<Pick<FilterNumberConfigType, 'operator' | 'value'>>({
    value: defaultValue.value,
    operator: defaultValue.operator,
  });

  // 配置初始筛选条件变更，配置态运行
  useUpdateEffect(() => {
    setValAndOperator({ value: defaultValue.value, operator: defaultValue.operator });
  }, [defaultValue.value, defaultValue.operator]);

  const onValueChange = (val: number | [number, number] | undefined, operator: '>=' | '<=' | 'BETWEEN') => {
    setValAndOperator({ value: val, operator });
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const onSubmit = () => {
    const numberNode = { ...defaultValue, ...valAndOperator } as FilterNumberConfigType;
    onChange(numberNode);
    setOpen(false);
  };

  const content = (
    <div className={styles.numberContent}>
      <FilterNumberConfig value={defaultValue.value} operator={defaultValue.operator} onChange={onValueChange} />
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
