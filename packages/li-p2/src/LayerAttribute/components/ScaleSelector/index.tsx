import { connect } from '@formily/react';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React, { useEffect, useMemo, useState } from 'react';
import cls from 'classnames';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { DEHAULT_OPTIONS } from './constants';
import useStyle from './style';

export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number' | 'all';
}

export type ScaleSelectorProps = SelectProps<string, ColorScaleSelectOptionType> & { type: 'string' | 'number' };

const Internal = (props: ScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector', props);
  const [open, setOpen] = useState(true);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [value, setValue] = useState('');

  const selectOptions = useMemo(() => {
    const options = props.options ?? DEHAULT_OPTIONS;
    const type = ['string', 'number'].includes(props.type) ? props.type : 'string';
    return options.filter((item) => item.type === type || item.type === 'all');
  }, [props.type, props.options]);

  useEffect(() => {
    if (!props.value || selectOptions.findIndex((item) => item.value === props.value) === -1) {
      if (props.onChange) {
        const val = selectOptions[0].value as string;
        props.onChange(val, selectOptions);
      }
    }
  }, [selectOptions]);

  const onTypeChange = (type: string) => {
    setValue(type);
  };

  return wrapSSR(
    <Select
      {...props}
      open={open}
      className={cls(`${prefixCls}`, hashId)}
      // onDropdownVisibleChange={(visible) => setOpen(visible)}
      dropdownRender={() => {
        return (
          <div className={cls(`${prefixCls}-dropdown`, hashId)}>
            {value !== 'custom' && (
              <>
                {selectOptions.map((item) => {
                  return (
                    <div
                      className={cls(`${prefixCls}-select-option`, hashId, {
                        [`${prefixCls}-select-option-selected`]: item.value === value,
                      })}
                      key={item?.value?.toString()}
                      onClick={() => onTypeChange(item.value as string)}
                    >
                      {item.label}
                    </div>
                  );
                })}
              </>
            )}
            {value}
          </div>
        );
      }}
    />,
  );
};

const ScaleSelector = connect(Internal);

export default ScaleSelector;
