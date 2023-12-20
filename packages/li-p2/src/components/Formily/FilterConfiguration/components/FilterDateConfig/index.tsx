import { DownOutlined } from '@ant-design/icons';
import { DatePicker, Dropdown, Space } from 'antd';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import dayjs from 'dayjs';
import React, { useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { getGranularityOptions, getTimeFormat } from './helper';
import useStyle from './style';
import type { Granularity } from './type';

const { RangePicker } = DatePicker;
export interface FilterDateConfigProps {
  // 是否自定义footer
  isRenderExtraFooter?: boolean;
  // 时间格式
  format: string;
  // 时间粒度
  granularity: Granularity;
  // 时间类型 单日期｜区间
  type: 'date' | 'range';
  // 默认时间
  value?: string | [string, string];
  bordered?: boolean;
  size?: 'small' | 'middle' | 'large';
  onChange: (value: {
    format: string;
    granularity: Granularity;
    type: 'date' | 'range';
    value?: string | [string, string];
  }) => void;
}

const FilterDateConfig: React.FC<FilterDateConfigProps> = (props) => {
  const {
    isRenderExtraFooter = false,
    format,
    granularity,
    type = 'date',
    value: defaultValue,
    size = 'middle',
    bordered = true,
    onChange,
  } = props;
  const [open, setOpen] = useState(false);
  const prefixCls = usePrefixCls('formily-filter-setting-date');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const dataRef = useRef(0);

  // 开关变化
  const onOpenChange = (open: boolean) => {
    setOpen(open);
    dataRef.current = 0;
  };

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: [string, string] | string) => {
    if (type === 'date') {
      if (dateString) {
        const _timer = getTimeFormat(dateString, format);
        if (_timer) {
          onChange({ value: _timer, format, type, granularity });
        }
      } else {
        onChange({ value: '', format, type, granularity });
      }
    } else {
      if (dateString[0]) {
        const _timer = getTimeFormat(dateString, format);
        if (_timer) {
          onChange({ value: _timer, format, type, granularity });
        }
      } else {
        onChange({ value: '', format, type, granularity });
      }
    }
  };

  // 粒度变化
  const onGranularityChange = (format: string, granularity: Granularity) => {
    if (defaultValue) {
      const _timer = getTimeFormat(defaultValue, format);
      if (_timer) {
        onChange({ value: _timer, format, type, granularity });
      }
    }
    setOpen(true);
  };

  // 区间变化
  const onDateOrRange = (type: 'date' | 'range') => {
    const _times = defaultValue ? getTimeFormat(defaultValue[0], format) : '';
    onChange({ value: _times, format, type, granularity });
    setOpen(true);
  };

  const granularityOptions = useMemo(() => {
    if (format) {
      const _options = getGranularityOptions(format).map((item) => ({
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
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__item`, hashId)}>
        <Dropdown menu={{ items: granularityOptions }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={cls(`${prefixCls}__item__info`, hashId)}>
            <Space>
              {granularityOptions.find((item) => item.value === format)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        <Dropdown menu={{ items: dateRangeTtpe }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={cls(`${prefixCls}__item__info`, hashId)}>
            <Space>
              {dateRangeTtpe.find((item) => item.value === type)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );

  return wrapSSR(
    <div>
      {type === 'date' && (
        <>
          {['year', 'month', 'day'].includes(granularity) ? (
            <DatePicker
              bordered={bordered}
              size={size}
              open={open}
              showToday={false}
              onOpenChange={(open) => setOpen(open)}
              value={
                defaultValue
                  ? dayjs(typeof defaultValue === 'string' ? defaultValue : defaultValue[0], format)
                  : undefined
              }
              picker={(granularity === 'day' ? 'date' : granularity) as 'year' | 'month' | 'date'}
              format={format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          ) : (
            <DatePicker
              bordered={bordered}
              size={size}
              showNow={false}
              open={open}
              onOpenChange={(open) => setOpen(open)}
              value={
                defaultValue
                  ? dayjs(typeof defaultValue === 'string' ? defaultValue : defaultValue[0], format)
                  : undefined
              }
              showTime={{ format: format }}
              format={format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}

      {type === 'range' && granularity && (
        <>
          {['year', 'month', 'day'].includes(granularity) ? (
            <RangePicker
              bordered={bordered}
              size={size}
              open={open}
              onOpenChange={onOpenChange}
              value={defaultValue ? [dayjs(defaultValue[0], format), dayjs(defaultValue[1], format)] : undefined}
              picker={(granularity === 'day' ? 'date' : granularity) as 'year' | 'month' | 'date'}
              onChange={onRangePickerChange}
              format={format}
              onCalendarChange={() => {
                if (dataRef.current !== 1) {
                  dataRef.current += 1;
                } else {
                  setOpen(false);
                }
              }}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          ) : (
            <RangePicker
              bordered={bordered}
              size={size}
              open={open}
              onOpenChange={onOpenChange}
              value={defaultValue ? [dayjs(defaultValue[0], format), dayjs(defaultValue[1], format)] : undefined}
              showTime={{ format: format }}
              onChange={onRangePickerChange}
              onCalendarChange={() => {
                if (dataRef.current !== 3) {
                  dataRef.current += 1;
                } else {
                  setOpen(false);
                }
              }}
              format={format}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}
    </div>,
  );
};

export default FilterDateConfig;
