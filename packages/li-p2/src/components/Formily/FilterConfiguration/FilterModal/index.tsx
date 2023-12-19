import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Modal } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { getUniqueId } from '@antv/li-sdk';
import type { FilterConfig, OptionType } from '../type';
import FilterContent from './FilterContent';
import FilterItem from './FilterItem';
import useStyle from './style';

export interface FilterModalProps {
  /**
   * 是否打开
   */
  open?: boolean;
  value: FilterConfig[];
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
  onChange: (value: FilterConfig[]) => void;
}

const FilterModal: React.FC<FilterModalProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-modal');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { open = false, value = [], options = [], onCancel, onChange } = props;
  const [filterList, setFilterList] = useState<FilterConfig[]>([]);
  const [selectedFilterNode, setSelectedFilterNode] = useState<FilterConfig>();

  const selectedOptions = useMemo(() => {
    if (filterList.length) {
      return filterList.map((item) => item.field);
    }
    return [];
  }, [filterList]);

  const delFilterItem = (id: string) => {
    const _filter = filterList.filter((item) => item.id !== id);
    setSelectedFilterNode(_filter[0]);
    setFilterList(_filter);
  };

  const onFilterChange = (val: FilterConfig) => {
    setSelectedFilterNode(val);
    const list = filterList.map((item) => {
      if (item.id === val.id) {
        return val;
      }
      return item;
    });

    setFilterList(list);
  };

  const onChangeSort = (dragIndex: string | number, hoverIndex: string | number) => {
    const data = filterList.slice();
    const temp = data[Number(dragIndex)];
    data[Number(dragIndex)] = data[Number(hoverIndex)];
    data[Number(hoverIndex)] = temp;
    setFilterList(data);
  };

  const addFilterItem = () => {
    const DEFAULTITEM = ({
      id: getUniqueId(),
      field: undefined,
    } as unknown) as FilterConfig;

    const _filterList = [...filterList, DEFAULTITEM];
    setFilterList(_filterList);
    setSelectedFilterNode(DEFAULTITEM);
  };

  // 提交到外部
  const onSubmit = () => {
    onChange(filterList);
  };

  const validOptions = useMemo(() => {
    if (!selectedFilterNode) return [];
    const selected = selectedOptions.filter((item) => item !== selectedFilterNode.field);
    return options.filter((item) => !selected.includes(item.value));
  }, [selectedFilterNode]);

  useEffect(() => {
    if (open) {
      if (value.length) {
        setFilterList(value);
        setSelectedFilterNode(value?.[0] || []);
      } else {
        const DEFAULTITEM = ({
          id: getUniqueId(),
          field: undefined,
        } as unknown) as FilterConfig;

        setFilterList([DEFAULTITEM]);
        setSelectedFilterNode(DEFAULTITEM);
      }
    }
  }, [open]);

  return wrapSSR(
    <Modal
      title="筛选器设置"
      cancelText="取消"
      okText="确定"
      className={cls(`${prefixCls}`, hashId)}
      open={open}
      onOk={onSubmit}
      onCancel={onCancel}
      destroyOnClose={true}
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
              {filterList.map((item: FilterConfig, index: string | number) => (
                <div
                  key={`filters_drag_card${index}`}
                  className={cls(
                    `${prefixCls}__content__left-item`,
                    {
                      [`${prefixCls}__content__left-selected`]: selectedFilterNode?.id === item.id,
                    },
                    hashId,
                  )}
                >
                  <FilterItem
                    index={index}
                    id={item.id}
                    field={item.title}
                    key={`filter_drag_card${index}`}
                    onChange={(title: string) => onFilterChange({ ...item, title })}
                    onChangeSort={onChangeSort}
                    onClickItem={() => setSelectedFilterNode(item)}
                    onDelete={() => delFilterItem(item.id)}
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

          {selectedFilterNode && (
            <FilterContent value={selectedFilterNode} onChange={onFilterChange} options={validOptions} />
          )}
        </div>
      </div>
    </Modal>,
  );
};

export default FilterModal;
