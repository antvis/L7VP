import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import EditModal from './EditModal';
import useStyle from './style';
import type { FilterNodeItem, OptionType } from './type';
import Preview from './Preview';

export interface FilterSelectorProps {
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * value
   */
  value?: FilterNodeItem[];
  /**
   * 选择发生改变时
   */
  onChange?: (value: FilterNodeItem[]) => void;
}

const InternalFilters: React.FC<FilterSelectorProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-selector');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value = [], onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterList, setFilterList] = useState<FilterNodeItem[]>(value);

  useEffect(() => {
    setFilterList(value);
  }, [value]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 获取所有数据变更信息
  const onfiltersChange = (val: FilterNodeItem[]) => {
    if (onChange) {
      onChange(val);
    }

    setFilterList(val);
    setIsModalOpen(false);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__list`, hashId)}>
        <Preview filters={filterList} options={options} />
        <Button className={`${prefixCls}__list__btn`} onClick={() => setIsModalOpen(true)}>
          编辑
        </Button>
      </div>

      <EditModal
        open={isModalOpen}
        onCancel={handleCancel}
        onChange={onfiltersChange}
        value={filterList}
        options={options}
      />
    </div>,
  );
};

const FilterSelector = connect(InternalFilters);

export default FilterSelector;
