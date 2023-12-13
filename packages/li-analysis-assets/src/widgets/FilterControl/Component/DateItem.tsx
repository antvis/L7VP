import type { FilterDate as FilterDateType } from '@antv/li-p2';
import React from 'react';
import { FilterDateItem } from '@antv/li-p2';

export interface DateItemProps {
  value: FilterDateType;
  onChange: (value: FilterDateType) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const { value: defaultValue, onChange } = props;

  const onValueChange = (val: any) => {
    const { format, type, granularity, value } = val;
    onChange({
      ...defaultValue,
      value,
      granularity,
      params: {
        ...defaultValue.params,
        format,
        type,
      },
    });
  };

  return (
    <FilterDateItem
      value={defaultValue.value}
      format={defaultValue.params.format}
      granularity={defaultValue.granularity}
      isRenderExtraFooter={true}
      type={defaultValue.params.type}
      onChange={onValueChange}
    />
  );
};

export default DateItem;
