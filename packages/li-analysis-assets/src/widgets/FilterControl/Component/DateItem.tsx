import { DownOutlined } from '@ant-design/icons';
import type { FilterDate } from '@antv/li-p2';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import type { Granularity } from './helper';
import { getGranularityOptions, getTimeFormat } from './helper';
import useStyle from './DateItemStyle';

const { RangePicker } = DatePicker;
export interface DateItemProps {
  value: FilterDate;
  onChange: (value: FilterDate) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const { value: defaultValue, onChange } = props;
  const [open, setOpen] = useState(false);
  const style = useStyle();

  const timer: [string, string] | string = useMemo(() => {
    return defaultValue.value;
  }, [defaultValue.value]);

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
    setOpen(false);
  };

  // 粒度变化
  const onGranularityChange = (format: string, granularity: Granularity) => {
    if (defaultValue.value) {
      const _timer = getTimeFormat(defaultValue.value, format);
      if (_timer) {
        onChange({
          ...defaultValue,
          value: _timer,
          granularity: granularity === 'date' ? 'day' : granularity,
          params: {
            ...defaultValue.params,
            format: format,
          },
        });
      }
    }
    setOpen(true);
  };

  // 区间变化
  const onDateOrRange = (type: 'date' | 'range') => {
    const _times = timer ? getTimeFormat(timer[0], defaultValue.params.format) : '';
    onChange({ ...defaultValue, value: _times, params: { ...defaultValue.params, type } });
    setOpen(true);
  };

  const granularityOptions = useMemo(() => {
    if (defaultValue.params.format) {
      const _options = getGranularityOptions(defaultValue.params.format).map((item) => ({
        ...item,
        label: <div onClick={() => onGranularityChange(item.value, item.granularity)}>{item.label}</div>,
      }));
      return _options;
    }
    return [];
  }, [defaultValue]);

  const dateRangeTtpe = [
    { key: 'date', value: 'date', label: <div onClick={() => onDateOrRange('date')}>单日期</div> },
    { key: 'range', value: 'range', label: <div onClick={() => onDateOrRange('range')}>日期区间</div> },
  ];

  const renderExtraFooter = (
    <div className={style.extraFooter}>
      <div className={style.extraFooterItem}>
        <Dropdown menu={{ items: granularityOptions }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={style.extraFooterItemInfo}>
            <Space>
              {granularityOptions.find((item) => item.value === defaultValue.params.format)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        <Dropdown menu={{ items: dateRangeTtpe }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={style.extraFooterItemInfo}>
            <Space>
              {dateRangeTtpe.find((item) => item.value === defaultValue.params.type)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );

  return (
    <>
      {defaultValue.params.type === 'date' && defaultValue.granularity && (
        <>
          {['year', 'month', 'day'].includes(defaultValue.granularity) ? (
            <DatePicker
              open={open}
              showToday={false}
              onOpenChange={(open) => setOpen(open)}
              value={
                timer ? dayjs(typeof timer === 'string' ? timer : timer[0], defaultValue.params.format) : undefined
              }
              picker={defaultValue.granularity === 'day' ? 'date' : defaultValue.granularity}
              format={defaultValue.params.format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => renderExtraFooter}
            />
          ) : (
            <DatePicker
              showNow={false}
              open={open}
              onOpenChange={(open) => setOpen(open)}
              value={
                timer ? dayjs(typeof timer === 'string' ? timer : timer[0], defaultValue.params.format) : undefined
              }
              showTime={{ format: defaultValue.params.format }}
              format={defaultValue.params.format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => renderExtraFooter}
            />
          )}
        </>
      )}

      {defaultValue.params.type === 'range' && defaultValue.granularity && (
        <>
          {['year', 'month', 'day'].includes(defaultValue.granularity) ? (
            <RangePicker
              open={open}
              onOpenChange={(open) => setOpen(open)}
              value={
                timer
                  ? [dayjs(timer[0], defaultValue.params.format), dayjs(timer[1], defaultValue.params.format)]
                  : undefined
              }
              picker={defaultValue.granularity === 'day' ? 'date' : defaultValue.granularity}
              onChange={onRangePickerChange}
              format={defaultValue.params.format}
              renderExtraFooter={() => renderExtraFooter}
            />
          ) : (
            <RangePicker
              open={open}
              onOpenChange={(open) => setOpen(open)}
              value={
                timer
                  ? [dayjs(timer[0], defaultValue.params.format), dayjs(timer[1], defaultValue.params.format)]
                  : undefined
              }
              showTime={{ format: defaultValue.params.format }}
              onChange={onRangePickerChange}
              format={defaultValue.params.format}
              renderExtraFooter={() => renderExtraFooter}
            />
          )}
        </>
      )}
    </>
  );
};

export default DateItem;
