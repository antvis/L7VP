import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS } from './constants';
import CustomContent from './CustomContent';
import { transformToLayer, transformToScale } from './helper';
import useStyle from './style';
import type { CustomItemType, DatasetType } from './type';
export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number' | 'threshold';
  thresholdType?: string;
  dataset?: DatasetType;
}

export type ScaleSelectorProps = SelectProps<any, ColorScaleSelectOptionType> & {
  type: 'string' | 'number';
  thresholdType: string;
  dataset?: DatasetType;
};

const Internal = (props: ScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector', props);
  const { type: defaultType, value, dataset } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const defaultValue: CustomItemType = useMemo(() => {
    return transformToScale(props.value) as CustomItemType;
  }, [value]);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState(defaultValue?.type ?? defaultValue);
  const [customOpen, setCustomOpen] = useState(false);

  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULT_OPTIONS;
    const _type = ['string', 'number'].includes(defaultType) ? defaultType : 'string';
    return options.filter((item) => item.type === _type || item.type === 'threshold');
  }, [props.type, props.options]);

  useEffect(() => {
    if (!props.value?.type || selectOptions.findIndex((item) => item.value === props.value?.type) === -1) {
      if (props.onChange) {
        const val = selectOptions[0].value as string;
        props.onChange(val, selectOptions);
      }
    }
  }, [selectOptions]);

  const onValueChange = (ranges: CustomItemType) => {
    const _val = transformToLayer(ranges);
    // @ts-ignore
    props?.onChange({
      type: 'threshold',
      ..._val,
    });
    setOpen(false);
  };

  const onClose = () => {
    setCustomOpen(false);
  };

  const onTypeChange = (type: string) => {
    setType(type);
    if (type === 'threshold') {
      setCustomOpen(true);
    } else {
      setOpen(false);
      props?.onChange?.(type, []);
    }
  };

  useEffect(() => {
    if (type === 'threshold') {
      setCustomOpen(true);
    } else {
      setCustomOpen(false);
    }
  }, [type]);

  return wrapSSR(
    <Select
      value={type}
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            {!customOpen &&
              selectOptions.map((item) => {
                return (
                  <div
                    className={cls(`${prefixCls}-select-option`, hashId, {
                      [`${prefixCls}-select-option-selected`]: item.value === type,
                    })}
                    key={item?.value?.toString()}
                    onClick={() => onTypeChange(item.value as string)}
                  >
                    {item.label}
                  </div>
                );
              })}

            {customOpen && (
              <CustomContent
                fieldType={defaultType}
                dataset={dataset}
                customRanges={defaultValue}
                onChange={(ranges) => onValueChange(ranges)}
                onCancel={onClose}
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
