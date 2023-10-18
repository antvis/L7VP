import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS, THRESHOLD } from './constants';
import CustomContent from './CustomContent';
import { getDefault, transformToLayer, transformToScale } from './helper';
import useStyle from './style';
import type { CustomItemType, SelectorValue, SelectorValueType, SelectType } from './type';

type ScaleSelectorProp = {
  fieldType: 'string' | 'number';
  defaultRanges?: string[];
  domain: [number, number] | string[];
  value?: SelectorValue;
  /**
   * 选择发生改变时
   */
  onChange?: (val: SelectorValue) => void;
};

const Internal = (props: ScaleSelectorProp) => {
  const prefixCls = usePrefixCls('formily-scale-selector');
  const { fieldType, value, domain = [], defaultRanges = ['#f00', '#ff0', '#00f', '#faa'], onChange } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const defaultValue = useMemo(() => {
    if (value) {
      return transformToScale(fieldType, value) as CustomItemType;
    }
  }, [value]);

  const [open, setOpen] = useState(false);
  const _type = (value?.domain ? THRESHOLD : value?.type) as SelectType;
  const [type, setType] = useState<SelectType>(_type);
  const [customOpen, setCustomOpen] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const _type = (defaultValue?.type ? defaultValue.type : defaultValue) as SelectType;
      setType(_type);
    }
  }, [defaultValue]);

  const selectOptions = useMemo(() => {
    const _type = ['string', 'number'].includes(fieldType) ? fieldType : 'string';
    return DEHAULT_OPTIONS.filter((item) => item.type === _type || item.type === 'custom');
  }, [fieldType]);

  useEffect(() => {
    if (!defaultValue?.type || selectOptions.findIndex((item) => item.value === defaultValue.type) === -1) {
      if (props.onChange) {
        const val = selectOptions[0].value as SelectorValueType;
        props.onChange({ type: val });
      }
    }
  }, [selectOptions]);

  const onValueChange = (ranges: CustomItemType) => {
    const _val = transformToLayer(ranges);
    // @ts-ignore
    props?.onChange({
      ..._val,
    });
    setCustomOpen(false);
  };

  const onTypeChange = (type: SelectType) => {
    setType(type);
    if (type === 'custom') {
      const _defaultValue = getDefault(fieldType, domain, defaultRanges) as SelectorValue;
      if (onChange)
        onChange({
          ..._defaultValue,
        });
    } else {
      if (onChange) onChange({ type });
      setOpen(false);
    }
  };

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
                fieldType={fieldType}
                domain={domain}
                customRanges={defaultValue}
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
