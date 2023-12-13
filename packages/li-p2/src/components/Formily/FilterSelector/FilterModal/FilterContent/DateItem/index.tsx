import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { DatePicker, Radio, Select } from 'antd';
import cls from 'classnames';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import type { FilterDate } from '../../../type';
import { DEFAULT_OPTIONS } from './contants';
import { getOptions, getTimeFormat } from './helper';
import useStyle from './style';
import type { GranularityItem } from './type';

const { RangePicker } = DatePicker;
export interface DateItemProps {
  value: FilterDate;
  format: string;
  onChange: (value: FilterDate) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector-modal-date-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, format, onChange } = props;

  const timer = useMemo(() => {
    return defaultValue.value;
  }, [defaultValue.value]);

  const [granularity, setGranularity] = useState<GranularityItem>(DEFAULT_OPTIONS[0]);

  // 粒度 options
  const options = useMemo(() => {
    if (format) {
      const _options = getOptions(format);

      const _granularity = _options.find(
        (item) => defaultValue.granularity && [item.granularity, item.value].includes(defaultValue.granularity),
      );
      if (_granularity) {
        setGranularity(_granularity);
      }
      return _options;
    }
    return [];
  }, [defaultValue, format]);

  // 时间类型
  const onDateTypeChange = (e: 'date' | 'range') => {
    const _times = timer ? getTimeFormat(timer[0], granularity?.value) : '';
    onChange({ ...defaultValue, value: _times, params: { ...defaultValue.params, type: e } });
  };

  // 选择粒度
  const onGranularityChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e);

    if (_granularity) {
      const _value: FilterDate = {
        ...defaultValue,
        granularity: _granularity.granularity,
        value: timer ? getTimeFormat(timer, _granularity?.value) : '',
        params: {
          ...defaultValue.params,
          format: _granularity.value,
        },
      };
      onChange(_value);
      setGranularity(_granularity);
    }
  };

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: [string, string] | string) => {
    if (defaultValue.params.type === 'date') {
      if (dateString) {
        const _timer = getTimeFormat(dateString, defaultValue.params.format);
        if (_timer) {
          onChange({ ...defaultValue, value: _timer });
        }
      } else {
        onChange({ ...defaultValue, value: '' });
      }
    } else {
      if (dateString[0]) {
        const _timer = getTimeFormat(dateString, defaultValue.params.format);
        if (_timer) {
          onChange({ ...defaultValue, value: _timer });
        }
      } else {
        onChange({ ...defaultValue, value: '' });
      }
    }
  };

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>日期类型</div>
        <Radio.Group value={defaultValue.params.type || 'date'} onChange={(e) => onDateTypeChange(e.target.value)}>
          <Radio value="date">单日期</Radio>
          <Radio value="range">日期区间</Radio>
        </Radio.Group>
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>时间粒度</div>
        <Select
          size="small"
          style={{ width: '100%' }}
          value={granularity?.value}
          options={options}
          onChange={onGranularityChange}
        />
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>默认值</div>
        {defaultValue.params.type === 'date' && granularity && (
          <>
            {granularity.picker ? (
              <DatePicker
                value={timer ? dayjs(typeof timer === 'string' ? timer : timer[0], granularity.value) : undefined}
                picker={granularity.picker}
                format={granularity.value}
                onChange={onRangePickerChange}
              />
            ) : (
              <DatePicker
                value={timer ? dayjs(typeof timer === 'string' ? timer : timer[0], granularity.value) : undefined}
                showTime={{ format: granularity.value }}
                format={granularity.value}
                onChange={onRangePickerChange}
              />
            )}
          </>
        )}

        {defaultValue.params.type === 'range' && granularity && (
          <>
            {granularity.picker ? (
              <RangePicker
                value={timer ? [dayjs(timer[0], granularity.value), dayjs(timer[1], granularity.value)] : undefined}
                picker={granularity.picker}
                onChange={onRangePickerChange}
                format={granularity.value}
              />
            ) : (
              <RangePicker
                value={timer ? [dayjs(timer[0], granularity.value), dayjs(timer[1], granularity.value)] : undefined}
                showTime={{ format: granularity.value }}
                onChange={onRangePickerChange}
                format={granularity.value}
              />
            )}
          </>
        )}
      </div>
    </>,
  );
};

export default DateItem;
