import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio, Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { FilterDateSetting } from '../../../components';
import { DEFAULT_OPTIONS } from '../../../components/FilterDateSetting/contents';
import { getTimeFormat } from '../../../components/FilterDateSetting/helper';
import type { GranularityItem } from '../../../components/FilterDateSetting/type';
import type { FilterSettingDate as FilterDateType } from '../../../type';
import { getOptions } from './helper';
import useStyle from './style';
export interface DateItemProps {
  value: FilterDateType;
  format: string;
  onChange: (value: FilterDateType) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal-date-item');
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
    const _times = timer ? getTimeFormat(timer[0], granularity?.value) : undefined;
    onChange({ ...defaultValue, value: _times, params: { ...defaultValue.params, dateType: e } });
  };

  // 选择粒度
  const onGranularityChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e);

    if (_granularity) {
      const _value: FilterDateType = {
        ...defaultValue,
        granularity: _granularity.granularity,
        value: timer ? getTimeFormat(timer, _granularity?.value) : undefined,
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
  const onValueChange = (val: any) => {
    const { value } = val;
    onChange({
      ...defaultValue,
      value,
    });
  };

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>日期类型</div>
        <Radio.Group value={defaultValue.params.dateType || 'date'} onChange={(e) => onDateTypeChange(e.target.value)}>
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
        <FilterDateSetting
          isRenderExtraFooter={false}
          value={defaultValue.value}
          format={defaultValue.params.format}
          granularity={defaultValue.granularity}
          type={defaultValue.params.dateType}
          onChange={onValueChange}
        />
      </div>
    </>,
  );
};

export default DateItem;
