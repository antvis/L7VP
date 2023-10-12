import { isEmpty } from '@formily/shared';
import { DatePicker, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import type { FilterDateOperator, FilterDateValue } from '../../types';
import { DEFAULT_OPTIONS, getOptions, getTimeFormat } from './helper';
import type { GranularityItem, Granularity } from './type';
import './index.less';

interface FilterDateProps {
  operator: FilterDateOperator;
  value: FilterDateValue;
  granularity?: Granularity;
  format?: string;
  onChange: (val: FilterDateValue, granularity: Granularity) => void;
}

const CLS_PREFIX = 'li-filter-item-filter-field-date';

const { RangePicker } = DatePicker;

export const FilterDate: React.FC<FilterDateProps> = ({
  value: defaultValue,
  granularity: defaultGranularity,
  operator,
  format,
  onChange,
}) => {
  const [granularity, setGranularity] = useState<GranularityItem>(DEFAULT_OPTIONS[3]);

  const timer: Dayjs | Dayjs[] | undefined = useMemo(() => {
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

  const onGranularityChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e) as GranularityItem;
    if (_granularity) {
      setGranularity(_granularity);
    }
  };

  const onValueChange = (_: any, dateString: FilterDateValue) => {
    // 处理时间到最小粒度
    const timer = getTimeFormat(dateString, granularity.value, operator);
    onChange(timer, granularity.granularity ?? 'day');
  };

  useEffect(() => {
    if (!isEmpty(defaultValue)) {
      const _value: FilterDateValue =
        typeof defaultValue === 'string'
          ? dayjs(defaultValue).format(granularity.value).toString()
          : [
              dayjs(defaultValue[0]).format(granularity.value).toString(),
              dayjs(defaultValue[1]).format(granularity.value).toString(),
            ];
      // 处理时间到最小粒度
      const timer = getTimeFormat(_value, granularity.value, operator);
      onChange(timer, granularity.granularity ?? 'day');
    }
  }, [granularity, operator]);

  useEffect(() => {
    // 数据根据所选粒度回填
    if ((defaultGranularity || format) && options.length) {
      const _granularity = defaultGranularity || format;
      const _type = options.find((item) => item.defaultGranularity === _granularity);
      setGranularity(_type as GranularityItem);
    }
  }, [options, defaultGranularity, format]);

  return (
    <div className={`${CLS_PREFIX}`}>
      <Select
        size="small"
        placeholder="时间粒度"
        value={granularity.value}
        style={{ marginRight: 10 }}
        onChange={onGranularityChange}
        options={options}
      />

      {['>', '<'].includes(operator) && (
        <>
          {granularity.picker ? (
            <DatePicker
              size="small"
              className={`${CLS_PREFIX}-picker`}
              value={timer as Dayjs}
              picker={granularity.picker}
              format={granularity.value}
              onChange={onValueChange}
            />
          ) : (
            <DatePicker
              size="small"
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
              size="small"
              className={`${CLS_PREFIX}-picker`}
              value={timer as [Dayjs, Dayjs]}
              picker={granularity.picker}
              onChange={onValueChange}
              format={granularity.value}
            />
          ) : (
            <RangePicker
              size="small"
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
