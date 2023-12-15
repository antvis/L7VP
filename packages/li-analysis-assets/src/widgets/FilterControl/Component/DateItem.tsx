import type { FilterDate as FilterDateType } from '@antv/li-p2';
import React from 'react';
import { FilterDateSetting } from '@antv/li-p2';

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
        dateType: type,
      },
    });
  };

  return (
    <FilterDateSetting
      bordered={false}
      value={defaultValue.value}
      format={defaultValue.params.format}
      granularity={defaultValue.granularity}
      isRenderExtraFooter={true}
      type={defaultValue.params.dateType}
      onChange={onValueChange}
    />
  );
};

export default DateItem;
