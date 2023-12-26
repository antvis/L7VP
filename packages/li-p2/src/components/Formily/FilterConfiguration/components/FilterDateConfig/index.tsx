import { DownOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { useUpdateEffect } from 'ahooks';
import { DatePicker, Dropdown, Space } from 'antd';
import cls from 'classnames';
import dayjs from 'dayjs';
import React, { useMemo, useRef, useState } from 'react';
import { getGranularityOptions, getTimeFormat } from './helper';
import useStyle from './style';
import type { Granularity } from './type';

const { RangePicker } = DatePicker;
export interface FilterDateConfigProps {
  // 是否自定义footer
  isRenderExtraFooter?: boolean;
  // 时间格式
  defaultFormat: string;
  // 时间粒度
  defaultGranularity: Granularity;
  // 时间类型 单日期｜区间
  defaultType: 'date' | 'range';
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
    defaultFormat,
    defaultGranularity,
    defaultType = 'date',
    value: outterValue,
    size = 'middle',
    bordered = true,
    onChange,
  } = props;
  const [open, setOpen] = useState(false);
  const prefixCls = usePrefixCls('formily-filter-setting-date');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const dataRef = useRef(0);
  const [timer, setTimer] = useState<{
    granularity: Granularity;
    format: string;
    value?: string | [string, string];
    type: 'date' | 'range';
  }>({
    granularity: defaultGranularity,
    format: defaultFormat,
    value: outterValue,
    type: defaultType,
  });

  // RangePicker 开关变化
  const onRangePickerOpenChange = (open: boolean) => {
    setOpen(open);
    dataRef.current = 0;
  };

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: [string, string] | string) => {
    if (timer.type === 'date') {
      if (dateString) {
        const _timer = getTimeFormat(dateString, timer.format);
        if (_timer) {
          onChange({ value: _timer, format: timer.format, type: timer.type, granularity: timer.granularity });
        }
      } else {
        onChange({ value: undefined, format: timer.format, type: timer.type, granularity: timer.granularity });
      }
    } else {
      if (dateString[0]) {
        const _timer = getTimeFormat(dateString, timer.format);
        if (_timer) {
          onChange({ value: _timer, format: timer.format, type: timer.type, granularity: timer.granularity });
        }
      } else {
        onChange({ value: undefined, format: timer.format, type: timer.type, granularity: timer.granularity });
      }
    }
  };

  // 粒度变化
  const onGranularityChange = (format: string, granularity: Granularity) => {
    const _timer = timer.value ? getTimeFormat(timer.value, format) : undefined;
    setTimer((pre) => ({ ...pre, format, granularity }));
    onChange({ value: _timer, format, type: timer.type, granularity });
    setOpen(true);
  };

  // 区间变化
  const onDateOrRange = (type: 'date' | 'range') => {
    setTimer((pre) => ({ ...pre, type }));
    const _times = timer.value ? getTimeFormat(timer.value[0], timer.format) : undefined;
    onChange({ value: _times, format: timer.format, type, granularity: timer.granularity });
    setOpen(true);
  };

  useUpdateEffect(() => {
    setTimer({
      granularity: defaultGranularity,
      format: defaultFormat,
      value: outterValue,
      type: defaultType,
    });
  }, [defaultGranularity, defaultFormat, outterValue, defaultType]);

  const granularityOptions = useMemo(() => {
    return timer.format
      ? getGranularityOptions(timer.format).map((item) => ({
          ...item,
          label: <div onClick={() => onGranularityChange(item.value, item.granularity)}>{item.label}</div>,
        }))
      : [];
  }, [timer.format]);

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
              {granularityOptions.find((item) => item.value === timer.format)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        <Dropdown menu={{ items: dateRangeTtpe }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={cls(`${prefixCls}__item__info`, hashId)}>
            <Space>
              {dateRangeTtpe.find((item) => item.value === timer.type)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );

  return wrapSSR(
    <div>
      {timer.type === 'date' && (
        <>
          {['year', 'month', 'day'].includes(timer.granularity) ? (
            <DatePicker
              bordered={bordered}
              size={size}
              open={open}
              showToday={false}
              onOpenChange={(open) => setOpen(open)}
              value={
                timer.value
                  ? dayjs(typeof timer.value === 'string' ? timer.value : timer.value[0], timer.format)
                  : undefined
              }
              picker={(timer.granularity === 'day' ? 'date' : timer.granularity) as 'year' | 'month' | 'date'}
              format={timer.format}
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
                timer.value
                  ? dayjs(typeof timer.value === 'string' ? timer.value : timer.value[0], timer.format)
                  : undefined
              }
              showTime={{ format: timer.format }}
              format={timer.format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}

      {timer.type === 'range' && timer.granularity && (
        <>
          {['year', 'month', 'day'].includes(timer.granularity) ? (
            <RangePicker
              bordered={bordered}
              size={size}
              open={open}
              onOpenChange={onRangePickerOpenChange}
              value={
                timer.value ? [dayjs(timer.value[0], timer.format), dayjs(timer.value[1], timer.format)] : undefined
              }
              picker={(timer.granularity === 'day' ? 'date' : timer.granularity) as 'year' | 'month' | 'date'}
              onChange={onRangePickerChange}
              format={timer.format}
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
              onOpenChange={onRangePickerOpenChange}
              value={
                timer.value ? [dayjs(timer.value[0], timer.format), dayjs(timer.value[1], timer.format)] : undefined
              }
              showTime={{ format: timer.format }}
              onChange={onRangePickerChange}
              onCalendarChange={() => {
                if (dataRef.current !== 3) {
                  dataRef.current += 1;
                } else {
                  setOpen(false);
                }
              }}
              format={timer.format}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}
    </div>,
  );
};

export default FilterDateConfig;
