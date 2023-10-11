import { isEmpty } from '@formily/shared';
import { DatePicker, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import type { FilterDateOperator, FilterDateValue } from '../../types';
import { DEFAULT_OPTIONS, getOptions, getTimeFormat } from './helper';
import './index.less';

interface FilterDateProps {
  operator: FilterDateOperator;
  value: FilterDateValue;
  format?: string;
  onChange: (val: FilterDateValue) => void;
}

type Picker = 'year' | 'month' | 'date';
export type Granularity = { label: string; value: string; picker?: Picker; other?: string };

const CLS_PREFIX = 'li-filter-item-filter-field-date';

const { RangePicker } = DatePicker;

export const FilterDate: React.FC<FilterDateProps> = ({ value: defaultValue, operator, format, onChange }) => {
  const [granularity, setGranularity] = useState<Granularity>(DEFAULT_OPTIONS[0]);

  const timer = useMemo(() => {
    if (isEmpty(defaultValue)) {
      return undefined;
    }
    if (typeof defaultValue === 'string') {
      const _timer = dayjs(defaultValue, format);
      return _timer;
    } else {
      const _timer = [dayjs(defaultValue[0], format), dayjs(defaultValue[1], format)];
      return _timer;
    }
  }, [defaultValue]);

  const options = useMemo(() => {
    return getOptions(format);
  }, [format]);

  const onTypeChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e) as Granularity;
    if (_granularity) {
      setGranularity(_granularity);
    }
  };

  const onValueChange = (_: any, dateString: FilterDateValue) => {
    onChange(getTimeFormat(dateString, granularity.value, operator));
  };

  useEffect(() => {
    if (timer) {
      onChange(getTimeFormat(defaultValue, granularity.value, operator));
    }
  }, [defaultValue, granularity]);

  useEffect(() => {
    if (format && options.length) {
      const _type = options.find((item) => item.value === format);
      setGranularity(_type as Granularity);
    }
  }, [options, format]);

  return (
    <div className={`${CLS_PREFIX}`}>
      <Select
        placeholder="时间粒度"
        value={granularity.value}
        style={{ marginRight: 10 }}
        onChange={onTypeChange}
        options={options}
      />

      {['>', '<'].includes(operator) && (
        <>
          {granularity.picker ? (
            <DatePicker
              className={`${CLS_PREFIX}-picker`}
              value={timer as Dayjs}
              picker={granularity.picker}
              format={granularity.value}
              onChange={onValueChange}
            />
          ) : (
            <DatePicker
              className={`${CLS_PREFIX}-picker`}
              value={timer as Dayjs}
              showTime={{ format: granularity.value }}
              format={granularity.value}
              onChange={onValueChange}
            />
          )}
        </>
      )}

      {['BETWEEN'].includes(operator) && (
        <>
          {granularity.picker ? (
            <RangePicker
              className={`${CLS_PREFIX}-picker`}
              value={timer as [Dayjs, Dayjs]}
              picker={granularity.picker}
              onChange={onValueChange}
              format={granularity.value}
            />
          ) : (
            <RangePicker
              className={`${CLS_PREFIX}-picker`}
              value={timer as [Dayjs, Dayjs]}
              showTime={{ format: granularity.value }}
              onChange={onValueChange}
              format={granularity.value}
            />
          )}
        </>
      )}
    </div>
  );
};
