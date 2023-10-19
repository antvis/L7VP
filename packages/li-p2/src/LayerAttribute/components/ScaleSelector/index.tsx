import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useUpdateEffect } from 'ahooks';
import { DEHAULT_OPTIONS } from './constants';
import CustomContent from './CustomContent';
import { getDefaultValue, transformToLayer, transformToScale } from './helper';
import useStyle from './style';
import type { CustomItemType, SelectorValue, SelectorValueType, SelectType } from './type';

type ScaleSelectorProp = {
  dataType: 'string' | 'number';
  defaultColors?: string[];
  domain: [number, number] | string[];
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

  const defaultValue = useMemo(() => {
    if (value) {
      return transformToScale(dataType, value);
    }
  }, [value]);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(defaultValue?.type);
  const [customOpen, setCustomOpen] = useState(false);

  const selectOptions = useMemo(() => {
    const _type = ['string', 'number'].includes(dataType) ? dataType : 'string';
    return DEHAULT_OPTIONS.filter((item) => item.type === _type);
  }, [dataType]);

  // 自定义数据变动
  const onValueChange = (ranges: CustomItemType) => {
    const _val = transformToLayer(ranges);
    onChange?.({ ..._val });
    setCustomOpen(false);
  };

  // 类型选择变化
  const onTypeChange = (type: SelectType) => {
    setType(type);
    if (type === 'custom') {
      const _defaultValue = getDefaultValue(dataType, domain, defaultColors);
      if (onChange)
        onChange({
          ..._defaultValue,
        });
    } else {
      onChange?.({ type });
      setOpen(false);
    }
  };

  // 选择字段变更
  useEffect(() => {
    if (!value) return;
    const isCustom = value.type === 'threshold' || (value.type === 'cat' && value.domain && value.domain.length !== 0);
    // 非自定义数据
    if (!isCustom) {
      const isValid = selectOptions.findIndex((item) => item.value === value.type) === -1;
      if (isValid) {
        const val = selectOptions[0].value as SelectorValueType;
        setType(val);
        onChange?.({ type: val });
      }
    }
  }, [selectOptions]);

  // 自定义类型数据变动
  useUpdateEffect(() => {
    if (type === 'custom' && value?.domain && value.domain.length !== 0) {
      const _defaultValue = getDefaultValue(dataType, domain, value.range ?? defaultColors);
      if (onChange)
        onChange({
          ..._defaultValue,
        });
    }
  }, [domain.toString()]);

  return wrapSSR(
    <Select
      value={type}
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            {!customOpen && (
              <>
                {selectOptions.map((item) => {
                  return (
                    <div
                      className={cls(`${prefixCls}-select-option`, hashId, {
                        [`${prefixCls}-select-option-selected`]: item.value === type,
                      })}
                      key={item?.value?.toString()}
                      onClick={() => onTypeChange(item.value)}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </>
            )}

            {type === 'custom' && (
              <CustomContent
                className={`${prefixCls}-customcontent`}
                fieldType={dataType}
                domain={domain}
                customRanges={defaultValue as CustomItemType}
                onChange={(ranges) => onValueChange(ranges)}
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
