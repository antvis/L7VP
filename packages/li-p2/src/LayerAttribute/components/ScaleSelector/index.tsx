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
import type { CustomItemType } from './type';
export interface ColorScaleSelectOptionType extends DefaultOptionType {
  type: 'string' | 'number' | 'all';
}

export type ScaleSelectorProps = SelectProps<string, ColorScaleSelectOptionType> & { type: 'string' | 'number' };

const demoList = [{ value: ['h', 's'], color: '#f0f' }];

const Internal = (props: ScaleSelectorProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [customOpen, setCustomOpen] = useState(false);

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

  const onValueChange = (ranges: CustomItemType[]) => {
    console.log(ranges, 'CustomItemType');
    // 提交到外部数据
    props.onChange(ranges);
  };

  const onClose = () => {
    setCustomOpen(false);
  };

  // ---------------------------------------------------

  const onTypeChange = (type: string) => {
    setType(type);
    if (type === 'custom') {
      setCustomOpen(true);
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
      // open={open}
      open={true}
      className={cls(`${prefixCls}`, hashId)}
      // onDropdownVisibleChange={(visible) => setOpen(visible)}
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
              <CustomContent customRanges={demoList} onChange={(ranges) => onValueChange(ranges)} onCancel={onClose} />
            )}
          </div>
        );
      }}
    />,
  );
};

const ScaleSelector = connect(Internal);

export default ScaleSelector;
