import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio } from 'antd';
import cls from 'classnames';
import React from 'react';
import { FilterStringConfig } from '../../../components';
import type { StringConfig } from '../../../type';
import useStyle from './style';
export interface StringItemProps {
  value: StringConfig;
  options: string[];
  onChange: (value: StringConfig) => void;
}

const StringItem: React.FC<StringItemProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal-string-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value: defaluValue, options = [], onChange } = props;

  // 类型变化
  const onTypeChange = (type: 'radio' | 'multiple') => {
    onChange({
      ...defaluValue,
      params: {
        ...defaluValue.params,
        filterType: type,
      },
      value: undefined,
    });
  };

  const onValueChange = (val: string[] | undefined) => {
    onChange({
      ...defaluValue,
      value: val,
    });
  };

  return wrapSSR(
    <>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>筛选方式</div>
        <Radio.Group value={defaluValue.params?.filterType} onChange={(e) => onTypeChange(e.target.value)}>
          <Radio value="radio">单选</Radio>
          <Radio value="multiple">多选</Radio>
        </Radio.Group>
      </div>

      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
        <FilterStringConfig
          value={defaluValue.value}
          domain={options}
          filterType={defaluValue.params.filterType}
          onChange={onValueChange}
        />
      </div>
    </>,
  );
};

export default StringItem;
