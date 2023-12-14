import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio } from 'antd';
import cls from 'classnames';
import React from 'react';
import { FilterStringItem } from '../../../components';
import type { FilterString } from '../../../type';
import useStyle from './style';
export interface StringItemProps {
  value: FilterString;
  onChange: (value: FilterString) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector-modal-string-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaluValue, onChange } = props;

  // 类型变化
  const onTypeChange = (type: 'radio' | 'multiple') => {
    onChange({
      ...defaluValue,
      params: {
        ...defaluValue.params,
        radioType: type,
      },
      value: defaluValue.params.domain,
    });
  };

  const onValueChange = (val: string[]) => {
    onChange({
      ...defaluValue,
      value: val,
    });
  };

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>筛选方式</div>
        <Radio.Group value={defaluValue.params?.radioType} onChange={(e) => onTypeChange(e.target.value)}>
          <Radio value="radio">单选</Radio>
          <Radio value="multiple">多选</Radio>
        </Radio.Group>
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
        <FilterStringItem
          value={defaluValue.value}
          domain={defaluValue.params.domain}
          radioType={defaluValue.params.radioType}
          onChange={onValueChange}
        />
      </div>
    </>,
  );
};

export default StringItem;
