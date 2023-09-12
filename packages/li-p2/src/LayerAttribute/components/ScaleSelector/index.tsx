import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useMemo } from 'react';
import { DEHAULT_OPTIONS } from './constants';

export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number';
}

export type ScaleSelectorProps = SelectProps<string, ColorScaleSelectOptionType> & { type: 'string' | 'number' };

const Internal = (props: ScaleSelectorProps) => {
  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULT_OPTIONS;
    const type = ['string', 'number'].includes(props.type) ? props.type : 'string';
    return options.filter((item) => item.type === type);
  }, [props.type, props.options]);

  useEffect(() => {
    if (!props.value || selectOptions.findIndex((item) => item.value === props.value) === -1) {
      if (props.onChange) {
        const val = selectOptions[0].value as string;
        props.onChange(val, selectOptions);
      }
    }
  }, [selectOptions]);

  return (
    <Select {...props}>
      {selectOptions?.map((item, index) => {
        return (
          <Select.Option value={item.value} key={index.toString()}>
            {item.label}
          </Select.Option>
        );
      })}
    </Select>
  );
};

const ScaleSelector = connect(Internal);

export default ScaleSelector;
