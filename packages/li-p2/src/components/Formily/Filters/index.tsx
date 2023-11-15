import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import EditModal from './EditModal';
import useStyle from './style';
import type { OptionType, FilterNodeItem } from './type';

export interface FiltersProps {
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * value
   */
  value?: FilterNodeItem;
  /**
   * 选择发生改变时
   */
  onChange?: (value: FilterNodeItem) => void;
}

const defaultFilter = [
  { id: '001', field: '001', type: 'number', operator: '>=', value: 0 },
  { id: '002', field: '002', type: 'string', operator: 'IN', value: '' },
  { id: '003', field: '003', type: 'date', operator: '>', granularity: 'day', value: '' },
] as FilterNodeItem[];

const InternalFilters: React.FC<FiltersProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(true);

  console.log(props, '展示细腻');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onfiltersChange = (val: any) => {
    console.log(val);
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter-list`, hashId)}>
        展示添加信息
        <Button className={`${prefixCls}__filter-list__btn`} onClick={() => setIsModalOpen(true)}>
          编辑
        </Button>
      </div>

      <EditModal
        open={isModalOpen}
        onCancel={handleCancel}
        onChange={onfiltersChange}
        value={defaultFilter}
        options={options}
      />
    </div>,
  );
};

const Filters: React.FC<FiltersProps> = connect(InternalFilters);

export default Filters;
