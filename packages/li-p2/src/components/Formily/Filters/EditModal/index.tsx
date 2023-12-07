import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Modal } from 'antd';
import cls from 'classnames';
import React, { useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { FilterNodeItem, OptionType } from '../type';
import EditContent from './EditContent';
import EditItem from './EditItem';
import { getDefaultValue } from './helper';
import useStyle from './style';

export interface EditModalProps {
  /**
   * 是否打开
   */
  open?: boolean;
  value: FilterNodeItem[];
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * 取消
   */
  onCancel: () => void;
  /**
   * 选择发生改变时
   */
  onChange: (value: any) => void;
}

const EditModal: React.FC<EditModalProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-edit-modal');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { open = false, value = [], options = [], onCancel, onChange } = props;
  const [filters, setFilters] = useState<FilterNodeItem[]>(value);
  const [selectedFilter, setSelectedFilter] = useState<FilterNodeItem>(value[0]);

  const selectedOptions = useMemo(() => {
    return filters.map((item) => item.field);
  }, [filters]);

  const delFilterItem = (id: string) => {
    setFilters((pre) => pre.filter((item) => item.id !== id));
  };

  const onFilterChange = (val: FilterNodeItem) => {
    const list = filters.map((item) => {
      if (item.id === val.id) {
        return val;
      }
      return item;
    });

    setFilters(list);
  };

  const onChangeSort = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = filters.slice();
    const temp = data[Number(dragIndex)];
    data[Number(dragIndex)] = data[Number(hoverIndex)];
    data[Number(hoverIndex)] = temp;
    setFilters(data);
  };

  const addFilterItem = () => {
    const _field = options.filter((item) => !selectedOptions.includes(item.value))[0];
    const _filterItem = getDefaultValue(_field);
    setFilters([...filters, _filterItem]);
    setSelectedFilter(_filterItem);
  };

  // 提交到外部
  const onSubmit = () => {
    onChange(filters);
  };

  const validOptions = useMemo(() => {
    const selected = selectedOptions.filter((item) => item !== selectedFilter.field);
    return options.filter((item) => !selected.includes(item.value));
  }, [selectedFilter]);

  return wrapSSR(
    <Modal
      title="筛选器设置"
      cancelText="取消"
      okText="确定"
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
    >
      <div className={cls(`${prefixCls}__content`, hashId)}>
        <div className={cls(`${prefixCls}__content__left`, hashId)}>
          <div className={cls(`${prefixCls}__content__left__add-filter`, hashId)}>
            <div>筛选和参数项</div>
            <div
              className={cls(
                `${prefixCls}__content__left__add-filter-btn`,
                {
                  [`${prefixCls}__content__left__add-filter-btn_disabled`]: selectedOptions.length === options.length,
                },
                hashId,
              )}
            >
              <PlusOutlined onClick={addFilterItem} />
            </div>
          </div>
          <div>
            <DndProvider backend={HTML5Backend}>
              {filters.map((item: FilterNodeItem, index: string | number) => (
                <div
                  key={`filters_drag_card${index}`}
                  onClick={() => {
                    setSelectedFilter(item);
                  }}
                  className={cls(
                    `${prefixCls}__content__left-item`,
                    {
                      [`${prefixCls}__content__left-selected`]: selectedFilter?.id === item.id,
                    },
                    hashId,
                  )}
                >
                  <EditItem
                    index={index}
                    id={item.id}
                    field={item.field}
                    key={`filter_drag_card${index}`}
                    onChangeSort={onChangeSort}
                    onDelete={() => delFilterItem(item.id)}
                    onChange={(field: string) => onFilterChange({ ...item, field })}
                  />
                </div>
              ))}
            </DndProvider>
          </div>
        </div>

        <div className={cls(`${prefixCls}__content__right`, hashId)}>
          <div className={cls(`${prefixCls}__content__left__add-filter`, hashId)}>
            <div>筛选配置</div>
          </div>
          <EditContent value={selectedFilter} onChange={onFilterChange} options={validOptions} />
        </div>
      </div>
    </Modal>,
  );
};

export default EditModal;
