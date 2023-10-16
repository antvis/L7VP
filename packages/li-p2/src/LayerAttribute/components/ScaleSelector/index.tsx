import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select, Switch } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS, THRESHOLD } from './constants';
import CustomContent from './CustomContent';
import { transformToLayer, transformToScale, getDefault } from './helper';
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
  const [type, setType] = useState(defaultValue?.type ?? defaultValue);
  const [customOpen, setCustomOpen] = useState(defaultValue?.type === THRESHOLD ? true : false);

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
    // 传递参数到外部
    // @ts-ignore
    props?.onChange({
      ..._val,
    });
    setOpen(false);
  };

  const onTypeChange = (type: string) => {
    setType(type);
    setCustomOpen(false);
  };

  const onSwitchChange = (checked: boolean) => {
    if (checked) {
      onTypeChange(THRESHOLD);
      setCustomOpen(true);

      const _defaultValue = getDefault(fieldType, dataset, defaultColors);
      // @ts-ignore
      props?.onChange({
        ..._defaultValue,
      });
    } else {
      setCustomOpen(false);
      onTypeChange(selectOptions[0].value as 'string');
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

            <div className={`${prefixCls}-threshold`}>
              自定义 <Switch size="small" checked={type === THRESHOLD ? true : false} onChange={onSwitchChange} />
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
