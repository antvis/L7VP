import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { useUpdateEffect } from 'ahooks';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS } from './constants';
import CustomMappingColor from './CustomMappingColors';
import { getCustomMappingData, getDefaultValue, getScaleByCustomMappingData } from './helper';
import useStyle from './style';
import type { CustomMappingData, SelectorValue, SelectType } from './type';

type ScaleSelectorProp = {
  /**
   * 数据字段类型
   */
  dataType: 'string' | 'number';
  /**
   * 默认颜色
   */
  defaultColors?: string[];
  /**
   * 自定义参数值
   */
  domain: [number, number] | string[];
  /**
   * value
   */
  value?: SelectorValue;
  /**
   * 选择发生改变时
   */
  onChange?: (val: SelectorValue) => void;
};

const Internal = (props: ScaleSelectorProp) => {
  const prefixCls = usePrefixCls('formily-scale-selector');
  const { dataType, value, domain = [], defaultColors = ['#f00', '#ff0', '#00f', '#faa'], onChange } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const customMappingData = useMemo(() => {
    if (value) {
      return getCustomMappingData(dataType, value);
    }
  }, [value]);

  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(value?.isCustom ? 'custom' : value?.type);

  const selectOptions = useMemo(() => {
    const _type = ['string', 'number'].includes(dataType) ? dataType : 'string';
    return DEHAULT_OPTIONS.filter((item) => item.type === _type);
  }, [dataType]);

  // 自定义数据变动
  const onValueChange = (ranges: CustomMappingData) => {
    const _val = getScaleByCustomMappingData(ranges);
    onChange?.({ ..._val });
    setOpen(false);
  };

  // 类型选择变化
  const onTypeChange = (type: SelectType) => {
    setSelectedType(type);
    if (type === 'custom') {
      const _defaultValue = getDefaultValue(dataType, domain, defaultColors);
      if (onChange)
        onChange({
          ..._defaultValue,
        });
    } else {
      onChange?.({ isCustom: false, type });
      setOpen(false);
    }
  };

  // dataType 变更，引起可选类型变更，当 scale 为非自定义时自动填充当前类型
  useEffect(() => {
    if (!value) return;
    // 非自定义数据
    if (!value.isCustom) {
      // 判断 value 类型是否有效
      const isValid = selectOptions.findIndex((item) => item.value === value.type) === -1;
      if (isValid) {
        const val = selectOptions[0].value !== 'custom' ? selectOptions[0].value : undefined;
        setSelectedType(val);
        if (val) {
          onChange?.({ isCustom: false, type: val });
        }
      }
    }
  }, [selectOptions]);

  // 自定义 scale 且数据 domain 发生更新时，自动计算默认值
  useUpdateEffect(() => {
    if (selectedType === 'custom' && value?.domain && value.domain.length !== 0) {
      const range = value.range ? [...new Set(value.range)] : defaultColors;
      const _defaultValue = getDefaultValue(dataType, domain, range);
      if (onChange)
        onChange({
          ..._defaultValue,
        });
    }
  }, [domain.toString()]);

  return wrapSSR(
    <Select
      value={selectedType}
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            {selectOptions.map((item) => {
              return (
                <div
                  className={cls(`${prefixCls}-select-option`, hashId, {
                    [`${prefixCls}-select-option-selected`]: item.value === selectedType,
                  })}
                  key={item?.value?.toString()}
                  onClick={() => onTypeChange(item.value)}
                >
                  {item.label}
                </div>
              );
            })}

            {selectedType === 'custom' && customMappingData && (
              <CustomMappingColor
                className={`${prefixCls}-customcontent`}
                dataType={dataType}
                domain={domain}
                value={customMappingData}
                onChange={(ranges: CustomMappingData) => onValueChange(ranges)}
              />
            )}
          </div>
        );
      }}
      options={selectOptions}
    />,
  );
};

const ScaleSelector = connect(Internal);

export default ScaleSelector;
