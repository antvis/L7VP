import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio, Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { FilterDateSetting } from '../../../components';
import { DEFAULT_OPTIONS } from '../../../components/FilterDateConfig/constants';
import { getTimeFormat } from '../../../components/FilterDateConfig/helper';
import type { GranularityItem } from '../../../components/FilterDateConfig/type';
import type { FilterDateConfigType } from '../../../type';
import { getOptions } from './helper';
import useStyle from './style';
export interface DateItemProps {
  value: FilterDateConfigType;
  format: string;
  onChange: (value: FilterDateConfigType) => void;
}

const DateItem: React.FC<DateItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal-date-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: outterValue, format, onChange } = props;
  const dateValue = outterValue.value;
  // 粒度 options
  const options = useMemo(() => (format ? getOptions(format) : []), [format]);

  const [granularity, setGranularity] = useState<GranularityItem>(() => {
    const _granularity = options.find((item) => [item.granularity, item.value].includes(outterValue.granularity));
    return _granularity || DEFAULT_OPTIONS[0];
  });

  // 时间类型
  const onDateTypeChange = (e: 'date' | 'range') => {
    const _times = dateValue ? getTimeFormat(dateValue[0], granularity?.value) : undefined;
    onChange({ ...outterValue, value: _times, params: { ...outterValue.params, dateType: e } });
  };

  // 选择粒度
  const onGranularityChange = (e: string) => {
    const _granularity = options.find((item) => item.value === e);

    if (_granularity) {
      const _value: FilterDateConfigType = {
        ...outterValue,
        granularity: _granularity.granularity,
        value: dateValue ? getTimeFormat(dateValue, _granularity?.value) : undefined,
        params: {
          ...outterValue.params,
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
      ...outterValue,
      value,
    });
  };

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>日期类型</div>
        <Radio.Group value={outterValue.params.dateType || 'date'} onChange={(e) => onDateTypeChange(e.target.value)}>
          <Radio value="date">单日期</Radio>
          <Radio value="range">日期区间</Radio>
        </Radio.Group>
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>时间粒度</div>
        <Select
          size="small"
          style={{ width: '100%' }}
          value={granularity.value}
          options={options}
          onChange={onGranularityChange}
        />
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>默认值</div>
        <FilterDateSetting
          isRenderExtraFooter={false}
          value={outterValue.value}
          format={outterValue.params.format}
          granularity={outterValue.granularity}
          type={outterValue.params.dateType}
          onChange={onValueChange}
        />
      </div>
    </>,
  );
};

export default DateItem;
