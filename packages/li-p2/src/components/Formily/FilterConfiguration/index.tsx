import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import FilterModal from './FilterModal';
import Preview from './Preview';
import useStyle from './style';
import type { FilterConfigType, OptionType } from './type';

export interface FilterConfigurationProps {
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * value
   */
  value?: FilterConfigType[];
  /**
   * 选择发生改变时
   */
  onChange?: (value: FilterConfigType[]) => void;
}

const Internal: React.FC<FilterConfigurationProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value = [], onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterList, setFilterList] = useState<FilterConfigType[]>(value);

  useEffect(() => {
    setFilterList(value);
  }, [value]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 获取所有数据变更信息
  const onfiltersChange = (val: FilterConfigType[]) => {
    if (onChange) {
      onChange(val);
    }

    setFilterList(val);
    setIsModalOpen(false);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__list`, hashId)}>
        <Preview filters={filterList} />
        <Button className={`${prefixCls}__list__btn`} onClick={() => setIsModalOpen(true)}>
          {filterList.length ? '编辑' : '点击配置'}
        </Button>
      </div>

      <FilterModal
        open={isModalOpen}
        onCancel={handleCancel}
        onChange={onfiltersChange}
        value={filterList}
        options={options}
      />
    </div>,
  );
};

const FilterConfiguration = connect(Internal);

export default FilterConfiguration;
