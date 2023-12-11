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
  const prefixCls = usePrefixCls('formily-filters-edit-modal-right-date-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaultValue, format, onChange } = props;

  const timer: [string, string] | string = useMemo(() => {
    if (defaultValue.value) {
      return defaultValue.value;
    }
    const _timer = getTimeFormat(dayjs(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    return _timer ?? '';
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
  }, [defaultValue.field, defaultValue.granularity]);

  // 时间区间选择
  const onDateTypeChange = (e: 'date' | 'range') => {
    const _times = getTimeFormat(timer[0], granularity?.value);
    if (_times) {
      onChange({ ...defaultValue, value: _times, params: { ...defaultValue.params, type: e } });
    }
  };

  // 选择粒度
  const onGranularityChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e);
    if (_granularity) {
      const _value = {
        ...defaultValue,
        granularity: _granularity.granularity,
        value: getTimeFormat(timer, _granularity?.value),
        params: {
          format: _granularity.value,
        },
      };
      // @ts-ignore
      onChange(_value);
      setGranularity(_granularity);
    }
  };

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: [string, string] | string) => {
    const _timer = getTimeFormat(dateString, granularity?.value);
    if (_timer) {
      onChange({ ...defaultValue, value: _timer });
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
          defaultValue={granularity?.value}
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
                value={[dayjs(timer[0], granularity.value), dayjs(timer[1], granularity.value)]}
                picker={granularity.picker}
                onChange={onRangePickerChange}
                format={granularity.value}
              />
            ) : (
              <RangePicker
                value={[dayjs(timer[0], granularity.value), dayjs(timer[1], granularity.value)]}
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
