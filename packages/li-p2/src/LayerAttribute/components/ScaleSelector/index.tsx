import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select, Switch } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS, THRESHOLD } from './constants';
import CustomContent from './CustomContent';
import { getDefault, transformToLayer, transformToScale } from './helper';
import useStyle from './style';
import type { CustomItemType, DatasetType } from './type';
export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number' | 'threshold';
  dataset?: DatasetType;
}

export type ScaleSelectorProps = SelectProps<any, ColorScaleSelectOptionType> & {
  type: 'string' | 'number';
  dataset?: DatasetType;
  defaultColors?: string[];
};

const Internal = (props: ScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector', props);
  const {
    type: fieldType,
    value,
    dataset = { min: 0, max: 100, list: [] },
    defaultColors = ['#f00', '#ff0', '#00f', '#faa'],
  } = props;
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const defaultValue: CustomItemType = useMemo(() => {
    return transformToScale(fieldType, value) as CustomItemType;
  }, [value]);

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<string>();
  const [customOpen, setCustomOpen] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      const _type = (defaultValue?.type ? defaultValue.type : defaultValue) as string;
      setType(_type);
    }
  }, [defaultValue]);

  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULT_OPTIONS;
    const _type = ['string', 'number'].includes(fieldType) ? fieldType : 'string';
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
      ..._val,
    });
    setCustomOpen(false);
  };

  const onTypeChange = (type: string) => {
    if (props.onChange) {
      setType(type);
      setOpen(false);
      props.onChange(type, selectOptions);
    }
  };

  const onSwitchChange = (checked: boolean) => {
    if (checked) {
      setType(THRESHOLD);
      setCustomOpen(true);
      const _defaultValue = getDefault(fieldType, dataset, defaultColors);
      // @ts-ignore
      props?.onChange({
        ..._defaultValue,
      });
    } else {
      setCustomOpen(false);
      if (props.onChange) {
        const val = selectOptions[0].value as string;
        setType(val);
        props.onChange(val, selectOptions);
      }
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
                  if (item.value !== THRESHOLD) {
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
                  }
                })}
              </>
            )}

            <div className={`${prefixCls}-threshold`}>
              自定义 <Switch size="small" checked={customOpen} onChange={onSwitchChange} />
            </div>

            {customOpen && (
              <CustomContent
                className={`${prefixCls}-customcontent`}
                fieldType={fieldType}
                dataset={dataset}
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
