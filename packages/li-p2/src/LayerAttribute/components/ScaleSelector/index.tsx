import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Divider, Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { DEHAULT_COLORS, DEHAULT_OPTIONS } from './constants';
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
  const { dataType, value, domain = [], onChange } = props;
  const lastDataStateRef = useRef<{ dataType: 'string' | 'number'; domain: [number, number] | string[] } | null>(null);
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const defaultColors = useMemo(() => {
    if (props.defaultColors) {
      return props.defaultColors;
    } else {
      return DEHAULT_COLORS[dataType];
    }
  }, [props.defaultColors]);

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

  useEffect(() => {
    let defaultSelectType: SelectType | undefined;
    // 初始类型
    if (!lastDataStateRef.current) {
      if (value) {
        lastDataStateRef.current = { dataType, domain };
      } else {
        defaultSelectType = selectOptions[0].value;

        setSelectedType(defaultSelectType);
        //@ts-ignore
        onChange?.({ isCustom: false, type: defaultSelectType });

        lastDataStateRef.current = { dataType, domain };
      }
      return;
    }

    // 对比类型判断 出现类型变更
    if (lastDataStateRef.current.dataType !== dataType) {
      defaultSelectType = selectOptions[0].value;

      setSelectedType(defaultSelectType);
      //@ts-ignore
      onChange?.({ isCustom: false, type: defaultSelectType });

      lastDataStateRef.current = { dataType, domain };
      return;
    }

    // 类型没有发生变更，但是 domain 出现变更，需要进行重新赋予默认值
    if (lastDataStateRef.current.domain.toString() !== domain.toString()) {
      if (value && value?.domain && value.domain.length !== 0) {
        const range = value.range && value.range.length ? [...new Set(value.range)] : defaultColors;
        const _defaultValue = getDefaultValue(dataType, domain, range);
        if (onChange)
          onChange({
            ..._defaultValue,
          });
      }
      lastDataStateRef.current = { dataType, domain };
      return;
    }
  }, [dataType, domain.toString()]);

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
              <>
                <Divider style={{ margin: '10px 0' }} />

                <CustomMappingColor
                  dataType={dataType}
                  domain={domain}
                  value={customMappingData}
                  unknown={value?.unknown}
                  onChange={(ranges: CustomMappingData) => onValueChange(ranges)}
                />
              </>
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
