import { DownOutlined } from '@ant-design/icons';
import type { FilterDate } from '@antv/li-p2';
import { DatePicker, Dropdown, Space } from 'antd';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import type { Granularity} from './helper';
import { getGranularityOptions, getTimeFormat } from './helper';

const { RangePicker } = DatePicker;
export interface DateItemProps {
  value: FilterDate;
  onChange: (value: FilterDate) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const { value: defaultValue, onChange } = props;

  const timer: [string, string] | string = useMemo(() => {
    if (defaultValue.value) {
      return defaultValue.value;
    }
    const _timer = getTimeFormat(dayjs(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD');
    return _timer ?? '';
  }, [defaultValue.value]);

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: [string, string] | string) => {
    const _timer = getTimeFormat(dateString, defaultValue.params.format);
    if (_timer) {
      onChange({ ...defaultValue, value: _timer });
    }
  };

  // 粒度变化
  const onGranularityChange = (format: string, granularty: Granularity) => {
    if (defaultValue.value) {
      const _timer = getTimeFormat(defaultValue.value, granularty);
      if (_timer) {
        onChange({
          ...defaultValue,
          value: _timer,
          granularty,
          params: {
            ...defaultValue.params,
            format: format,
          },
        });
      }
    }
  };

  // 区间变化
  const onDateOrRange = (type: 'date' | 'range') => {
    console.log(type, '类型变化');
  };

  const granularityOptions = useMemo(() => {
    if (defaultValue.params.format) {
      const _options = getGranularityOptions(defaultValue.params.format).map((item) => ({
        ...item,
        label: <div onClick={() => onGranularityChange(item.granularity, item.value)}>{item.label}</div>,
      }));
      return _options;
    }
    return [];
  }, [defaultValue.field]);

  const dateRangeTtpe = [
    { key: 'date', value: 'date', label: <div onClick={() => onDateOrRange('date')}>单日期</div> },
    { key: 'range', value: 'range', label: <div onClick={() => onDateOrRange('range')}>日期区间</div> },
  ];

  const renderExtraFooter = (
    <div onClick={(e) => e.preventDefault()}>
      <Dropdown menu={{ items: granularityOptions }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {granularityOptions.find((item) => item.value === defaultValue.params.format)?.label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Dropdown menu={{ items: dateRangeTtpe }} trigger={['click']}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {dateRangeTtpe.find((item) => item.value === defaultValue.params.type)?.label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );

  return (
    <>
      {defaultValue.params.type === 'date' && defaultValue.granularity && (
        <>
          {['year', 'month', 'date'].includes(defaultValue.granularity) ? (
            <DatePicker
              value={
                timer ? dayjs(typeof timer === 'string' ? timer : timer[0], defaultValue.params.format) : undefined
              }
              picker={defaultValue.granularity}
              format={defaultValue.params.format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => renderExtraFooter}
            />
          ) : (
            <DatePicker
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
          {['year', 'month', 'date'].includes(defaultValue.granularity) ? (
            <RangePicker
              value={[dayjs(timer[0], defaultValue.params.format), dayjs(timer[1], defaultValue.params.format)]}
              picker={defaultValue.granularity}
              onChange={onRangePickerChange}
              format={defaultValue.params.format}
              renderExtraFooter={() => renderExtraFooter}
            />
          ) : (
            <RangePicker
              value={[dayjs(timer[0], defaultValue.params.format), dayjs(timer[1], defaultValue.params.format)]}
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
