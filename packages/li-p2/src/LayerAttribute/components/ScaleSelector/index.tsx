import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DEHAULT_OPTIONS } from './constants';
import CustomContent from './CustomContent';
import useStyle from './style';
import type { CustomItemType, DatasetType } from './type';
export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number' | 'custom';
  dataset?: DatasetType;
}

// 测试数据待删除
const defaultValue = {
  type: 'string', //选择的筛选字段的类型
  value: {
    type: 'string',
    list: [
      {
        value: ['M 5.2 - Sichuan-Gansu border region, China', 'M 5.0 - Sichuan-Gansu border region, China'],
        color: '#ff0',
      },
      { value: ['M 5.8 - Sichuan-Gansu border region, China', 'M 5.0 - eastern Sichuan, China'], color: '#f0f' },
      { value: ['M 5.6 - eastern Sichuan, China', 'M 5.4 - eastern Sichuan, China'], color: '#0ff' },
    ],
  },
  dataset: {
    list: [
      {
        label: 'M 5.2 - Sichuan-Gansu border region, China',
        value: 'M 5.2 - Sichuan-Gansu border region, China',
        count: 2,
      },
      {
        label: 'M 5.0 - Sichuan-Gansu border region, China',
        value: 'M 5.0 - Sichuan-Gansu border region, China',
        count: 6,
      },
      {
        label: 'M 5.8 - Sichuan-Gansu border region, China',
        value: 'M 5.8 - Sichuan-Gansu border region, China',
        count: 1,
      },
      { label: 'M 5.0 - eastern Sichuan, China', value: 'M 5.0 - eastern Sichuan, China', count: 11 },
      { label: 'M 5.6 - eastern Sichuan, China', value: 'M 5.6 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.1 - eastern Sichuan, China', value: 'M 5.1 - eastern Sichuan, China', count: 8 },
      { label: 'M 5.4 - eastern Sichuan, China', value: 'M 5.4 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.8 - eastern Sichuan, China', value: 'M 5.8 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.2 - eastern Sichuan, China', value: 'M 5.2 - eastern Sichuan, China', count: 2 },
      { label: 'M 5.3 - eastern Sichuan, China', value: 'M 5.3 - eastern Sichuan, China', count: 3 },
      { label: 'M 6.1 - eastern Sichuan, China', value: 'M 6.1 - eastern Sichuan, China', count: 1 },
      { label: 'M 5.5 - eastern Sichuan, China', value: 'M 5.5 - eastern Sichuan, China', count: 1 },
      {
        label: 'M 5.1 - Sichuan-Gansu border region, China',
        value: 'M 5.1 - Sichuan-Gansu border region, China',
        count: 1,
      },
      {
        label: 'M 5.3 - Sichuan-Gansu border region, China',
        value: 'M 5.3 - Sichuan-Gansu border region, China',
        count: 1,
      },
      { label: 'M 5.7 - eastern Sichuan, China', value: 'M 5.7 - eastern Sichuan, China', count: 2 },
      { label: 'M 7.9 - eastern Sichuan, China', value: 'M 7.9 - eastern Sichuan, China', count: 1 },
    ],
  },
};
// 测试数据待删除
const defaultValueNumber = {
  type: 'number', //选择的筛选字段的类型
  value: {
    type: 'string',
    list: [
      {
        value: [5, 5.6, 5.4],
        color: '#ff0',
      },
    ],
  },
  dataset: {
    min: 5,
    max: 7.9,
    list: [
      { label: 5, value: 5, count: 17 },
      { label: 5.2, value: 5.2, count: 4 },
      { label: 5.8, value: 5.8, count: 3 },
      { label: 5.6, value: 5.6, count: 2 },
      { label: 5.4, value: 5.4, count: 2 },
      { label: 5.3, value: 5.3, count: 4 },
      { label: 6.1, value: 6.1, count: 1 },
      { label: 5.5, value: 5.5, count: 1 },
      { label: 5.7, value: 5.7, count: 2 },
      { label: 7.9, value: 7.9, count: 1 },
    ],
  },
};

export type ScaleSelectorProps = SelectProps<string, ColorScaleSelectOptionType> & {
  type: 'string' | 'number';
  dataset?: DatasetType;
};

const Internal = (props: ScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector', props);
  const { type: defaultType, value, dataset } = defaultValueNumber;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [customOpen, setCustomOpen] = useState(false);

  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULT_OPTIONS;
    const type = ['string', 'number'].includes(defaultType) ? defaultType : 'string';
    return options.filter((item) => item.type === type || item.type === 'custom');
  }, [props.type, props.options]);

  useEffect(() => {
    if (!props.value || selectOptions.findIndex((item) => item.value === props.value) === -1) {
      if (props.onChange) {
        const val = selectOptions[0].value as string;
        props.onChange(val, selectOptions);
      }
    }
  }, [selectOptions]);

  const onValueChange = (ranges: CustomItemType) => {
    // @ts-ignore
    props?.onChange({
      value: 'custom',
      ...ranges,
    });
    setOpen(false);
  };

  const onClose = () => {
    setCustomOpen(false);
  };

  const onTypeChange = (type: string) => {
    setType(type);
    if (type === 'custom') {
      setCustomOpen(true);
    } else {
      setOpen(false);
      props?.onChange?.(type, []);
    }
  };

  useEffect(() => {
    if (type === 'custom') {
      setCustomOpen(true);
    } else {
      setCustomOpen(false);
    }
  }, [type]);

  return wrapSSR(
    <Select
      {...props}
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
                customRanges={value}
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
