import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import type { CustomMappingColorItem, CustomMappingData } from '../type';
import CustomNumber from './CustomNumber';
import CustomString from './CustomString';
import useStyle from './style';

type CustomMappingColorProps = {
  dataType: 'string' | 'number';
  domain: string[] | [number, number];
  value?: CustomMappingData;
  unknown?: string;
  onChange: (value: CustomMappingData) => void;
  className?: string;
};

const CustomMappingColor = (props: CustomMappingColorProps) => {
  const { dataType = 'string', domain, value, unknown = '#f000', onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomMappingColorItem[]>([]);
  const [unknownColor, setUnknownColor] = useState<string>(unknown);

  useEffect(() => {
    if (value?.list?.length) {
      const list = value.list.map((item: CustomMappingColorItem) => {
        return {
          id: uniqueId(),
          ...item,
        };
      });
      setCustomRanges(list);
    }
  }, [value]);

  const onCustomRangesChange = (list: CustomMappingColorItem[]) => {
    setCustomRanges(list);
  };

  const onSubmit = () => {
    const list = customRanges.map((item) => {
      return { value: item.value, color: item.color };
    });
    onChange({ type: dataType, list, unknown: unknownColor });
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      <div className={classnames(`${prefixCls}_custom-content`, hashId, className)}>
        {dataType === 'number' && (
          <CustomNumber value={customRanges} domain={domain as [number, number]} onChange={onCustomRangesChange} />
        )}

        {dataType === 'string' && (
          <CustomString
            domain={domain as string[]}
            value={customRanges}
            onChange={onCustomRangesChange}
            unknown={unknownColor}
            onUnknownColorChange={(color: string) => {
              setUnknownColor(color);
            }}
          />
        )}
      </div>

      <div className={`${prefixCls}__btn`}>
        <span onClick={onSubmit}>应用</span>
      </div>
    </div>,
  );
};

export default CustomMappingColor;
