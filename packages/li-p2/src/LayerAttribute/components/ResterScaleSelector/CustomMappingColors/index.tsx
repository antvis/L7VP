import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React, { useEffect, useState } from 'react';
import CustomNumber from '../../ScaleSelector/CustomMappingColors/CustomNumber';
import type { CustomMappingColorItem, CustomMappingData } from '../type';
import CustomCat from './CustomCat';
import useStyle from './style';

type CustomMappingColorProps = {
  type: 'cat' | 'custom' | 'linear';
  domain: string[] | [number, number];
  value?: CustomMappingData;
  onChange: (value: CustomMappingData) => void;
  className?: string;
};

const CustomMappingColor = (props: CustomMappingColorProps) => {
  const { type = 'cat', domain, value, onChange, className } = props;
  const prefixCls = usePrefixCls('formily-rester-color-range-selector__custom-range');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [customRanges, setCustomRanges] = useState<CustomMappingColorItem[]>([]);

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

  const onSubmit = () => {
    const list = customRanges.map((item) => {
      return { value: item.value, color: item.color };
    });
    onChange({ type, list });
  };

  const onCustomRangesChange = (list: CustomMappingColorItem[]) => {
    setCustomRanges(list);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      <div className={classnames(`${prefixCls}_custom-content`, hashId, className)}>
        {['cat', 'linear'].includes(type) && <CustomCat value={customRanges} onChange={onCustomRangesChange} />}
        {type === 'custom' && (
          <CustomNumber
            domain={domain as [number, number]}
            value={customRanges}
            onChange={(list) => onCustomRangesChange(list as CustomMappingColorItem[])}
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
