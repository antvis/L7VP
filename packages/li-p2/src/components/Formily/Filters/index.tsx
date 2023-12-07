import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { connect } from '@formily/react';
import { Button } from 'antd';
import cls from 'classnames';
import React, { useState } from 'react';
import EditModal from './EditModal';
import useStyle from './style';
import type { FilterNodeItem, OptionType } from './type';
import Preview from './Preview';

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
  {
    id: '002',
    field: '名称',
    type: 'string',
    operator: 'IN',
    value: '',
    params: {
      radioType: 'radio',
    },
  },
  { id: '001', field: 'depth', type: 'number', operator: '>=', value: 0 },
  {
    id: '003',
    field: '开盘日期',
    type: 'date',
    operator: '>',
    granularity: 'day',
    value: ['2021-12-20 00:00:00', '2021-12-20 12:59:59'],
    params: {
      format: 'YYYY-MM-DD',
    },
  },
];

const InternalFilters: React.FC<FiltersProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { options, value, onChange } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterList, setFilterList] = useState<FilterNodeItem[]>(defaultFilter);

  console.log(props, '初始值---判断信心');

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // 获取所有数据变更信息
  const onfiltersChange = (val: any) => {
    console.log(val, 'sdfkljdkh');
  };

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter-list`, hashId)}>
        <Preview filters={filterList} />

        <Button size="small" className={`${prefixCls}__filter-list__btn`} onClick={() => setIsModalOpen(true)}>
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

const Filters = connect(InternalFilters);

export default Filters;
