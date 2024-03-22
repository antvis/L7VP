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
  // 时间格式，eg: ""YYYY/MM/DD HH:mm:ss""
  format: string;
  // 时间粒度, eg: "day"
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
    format: outterFormat,
    granularity: outterGranularity,
    type: outterType = 'date',
    value: outterValue,
    size = 'middle',
    bordered = true,
    onChange,
  } = props;
  const [open, setOpen] = useState(false);
  const prefixCls = usePrefixCls('formily-filter-setting-date');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const dataRef = useRef(0);
  const [state, setState] = useState<{
    granularity: Granularity;
    format: string;
    value?: string | [string, string];
    type: 'date' | 'range';
  }>({
    granularity: outterGranularity,
    format: outterFormat,
    value: outterValue,
    type: outterType,
  });

  // RangePicker 开关变化
  const onRangePickerOpenChange = (open: boolean) => {
    setOpen(open);
    dataRef.current = 0;
  };

  // 时间区间变化
  const onRangePickerChange = (_: any, dateString: string | string[]) => {
    let value: string | [string, string] | undefined;

    // 点击清空的情况
    // dateString is '' Or ['','']
    if (dateString === '' || (Array.isArray(dateString) && dateString.every((item) => item === ''))) {
      value = undefined;
    } else if (state.type === 'date') {
      value = typeof dateString === 'string' ? getTimeFormat(dateString, state.format) : undefined;
    } else {
      value = Array.isArray(dateString) ? getTimeFormat(dateString as [string, string], state.format) : undefined;
    }

    setState((pre) => ({ ...pre, value }));
    onChange({ value, format: state.format, type: state.type, granularity: state.granularity });
  };

  // 粒度变化
  const onGranularityChange = (format: string, granularity: Granularity) => {
    const value = state.value ? getTimeFormat(state.value, format) : undefined;
    setState((pre) => ({ ...pre, format, granularity }));
    onChange({ value, format, type: state.type, granularity });
    setOpen(true);
  };

  // 区间变化
  const onDateOrRange = (type: 'date' | 'range') => {
    setState((pre) => ({ ...pre, type }));
    const value = state.value ? getTimeFormat(state.value[0], state.format) : undefined;
    onChange({ value, format: state.format, type, granularity: state.granularity });
    setOpen(true);
  };

  // 外部属性更新，同步状态
  useUpdateEffect(() => {
    setState({
      granularity: outterGranularity,
      format: outterFormat,
      value: outterValue,
      type: outterType,
    });
  }, [outterGranularity, outterFormat, outterValue, outterType]);

  const granularityOptions = useMemo(() => {
    return state.format
      ? getGranularityOptions(state.format).map((item) => ({
          ...item,
          label: <div onClick={() => onGranularityChange(item.value, item.granularity)}>{item.label}</div>,
        }))
      : [];
  }, [state.format]);

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
              {granularityOptions.find((item) => item.value === state.format)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
      <div>
        <Dropdown menu={{ items: dateRangeTtpe }} trigger={['hover']}>
          <a onClick={(e) => e.preventDefault()} className={cls(`${prefixCls}__item__info`, hashId)}>
            <Space>
              {dateRangeTtpe.find((item) => item.value === state.type)?.label}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </div>
  );

  return wrapSSR(
    <div>
      {state.type === 'date' && (
        <>
          {['year', 'month', 'day'].includes(state.granularity) ? (
            <DatePicker
              bordered={bordered}
              size={size}
              open={open}
              showToday={false}
              onOpenChange={(open) => setOpen(open)}
              value={
                state.value
                  ? dayjs(typeof state.value === 'string' ? state.value : state.value[0], state.format)
                  : undefined
              }
              picker={(state.granularity === 'day' ? 'date' : state.granularity) as 'year' | 'month' | 'date'}
              format={state.format}
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
                state.value
                  ? dayjs(typeof state.value === 'string' ? state.value : state.value[0], state.format)
                  : undefined
              }
              showTime={{ format: state.format }}
              format={state.format}
              onChange={onRangePickerChange}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}

      {state.type === 'range' && state.granularity && (
        <>
          {['year', 'month', 'day'].includes(state.granularity) ? (
            <RangePicker
              bordered={bordered}
              size={size}
              open={open}
              onOpenChange={onRangePickerOpenChange}
              value={
                state.value ? [dayjs(state.value[0], state.format), dayjs(state.value[1], state.format)] : undefined
              }
              picker={(state.granularity === 'day' ? 'date' : state.granularity) as 'year' | 'month' | 'date'}
              onChange={onRangePickerChange}
              format={state.format}
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
                state.value ? [dayjs(state.value[0], state.format), dayjs(state.value[1], state.format)] : undefined
              }
              showTime={{ format: state.format }}
              onChange={onRangePickerChange}
              onCalendarChange={() => {
                if (dataRef.current !== 3) {
                  dataRef.current += 1;
                } else {
                  setOpen(false);
                }
              }}
              format={state.format}
              renderExtraFooter={() => (isRenderExtraFooter ? renderExtraFooter : null)}
            />
          )}
        </>
      )}
    </div>,
  );
};

export default FilterDateConfig;
