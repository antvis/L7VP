import type { FilterDateConfigType } from '@antv/li-p2';
import { FilterDateConfig } from '@antv/li-p2';
import React from 'react';

export interface DateItemProps {
  defaultValue: FilterDateConfigType;
  onChange: (value: FilterDateConfigType) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const { defaultValue, onChange } = props;

  const onValueChange = (val: any) => {
    const { type, granularity, value } = val;
    onChange({
      ...defaultValue,
      value,
      granularity,
      params: {
        ...defaultValue.params,
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
