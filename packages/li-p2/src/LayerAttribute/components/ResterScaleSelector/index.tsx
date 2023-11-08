import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { DEHAULT_OPTIONS } from './constants';
import CustomMappingColor from './CustomMappingColors';
import { getCustomMappingData, getDefaultValue, getScaleByCustomMappingData } from './helper';
import useStyle from './style';
import type { CustomMappingData, SelectorValue, SelectorValueType } from './type';

type ScaleSelectorProp = {
  /**
   * 默认颜色
   */
  defaultColors?: string[];
  /**
   * 自定义参数值
   */
  domain: [number, number];
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
  const prefixCls = usePrefixCls('formily-rester-scale-selector');
  const { value, domain = [], defaultColors = ['#f00', '#ff0', '#00f', '#faa'], onChange } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState(value?.type ?? 'quantize');

  const customMappingData = useMemo(() => {
    if (value && value?.type !== 'quantize') {
      return getCustomMappingData(value);
    }
  }, [value]);

  // 自定义数据变动
  const onValueChange = (ranges: CustomMappingData) => {
    const _val = getScaleByCustomMappingData(ranges);
    onChange?.({ ..._val });
    setOpen(false);
  };

  // 类型选择变化
  const onTypeChange = (type: SelectorValueType) => {
    setSelectedType(type);
    if (type === 'quantize') {
      onChange?.({ type });
      setOpen(false);
      return;
    }

    const _defaultValue = getDefaultValue(type, domain, value?.colors ?? defaultColors);
    if (onChange) {
      onChange({
        ..._defaultValue,
      });
    }
  };

  return wrapSSR(
    <Select
      value={selectedType}
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            {DEHAULT_OPTIONS.map((item) => {
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

            {selectedType !== 'quantize' && customMappingData && (
              <CustomMappingColor
                className={`${prefixCls}-customcontent`}
                type={selectedType}
                domain={domain}
                value={customMappingData}
                onChange={(ranges: CustomMappingData) => onValueChange(ranges)}
              />
            )}
          </div>
        );
      }}
      options={DEHAULT_OPTIONS}
    />,
  );
};

const ResterScaleSelector = connect(Internal);

export default ResterScaleSelector;
