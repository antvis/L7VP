import type { FilterDateConfigType } from '@antv/li-p2';
import React from 'react';
import { FilterDateConfig } from '@antv/li-p2';

export interface DateItemProps {
  value: FilterDateConfigType;
  onChange: (value: FilterDateConfigType) => void;
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
    <FilterDateConfig
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
