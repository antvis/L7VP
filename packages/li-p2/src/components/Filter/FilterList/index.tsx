import { PlusCircleOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash-es';
import React, { useState } from 'react';
import { getUId } from '../../../utils';
import { FilterItem } from '../FilterItem';
import type { ColumnType, FilterLogicalOperators, FilterNode } from '../types';
import './index.less';

export const CLS_PREFIX = 'li-filter-list';

export type FilterListProps = {
  data: Record<string, any>[];
  showDeleteFilter: boolean;
  showAddFilter: boolean;
  columns: ColumnType[];
  filterNodes: FilterNode[];
  addFilterNode: (filterNode: FilterNode, filterLogicalOperator?: FilterLogicalOperators) => void;
  updateFilterNode: (filterId: string, filterNode: Partial<Omit<FilterNode, 'id'>>) => void;
  removeFilterNode: (filterId: string) => void;
};

export const FilterList = ({
  data,
  showDeleteFilter = true,
  showAddFilter = true,
  columns,
  filterNodes,
  addFilterNode,
  updateFilterNode,
  removeFilterNode,
}: FilterListProps) => {
  const [filterFields, setFilterFields] = useState(filterNodes);
  // 暂时启用可重复选择字段
  // const selectedFields = filterNodes.map((item) => item.field);

  const onFilterFieldChange = (val: FilterNode, id: string) => {
    setFilterFields((pre) => {
      const list = pre.map((item) => (item.id === id ? val : item));
      return list;
    });
    if (isEmpty(val.field)) return;

    if (filterNodes.find((item) => item.id === id)) {
      updateFilterNode(id, val);
    } else {
      addFilterNode(val);
    }
  };

  const addFilterField = () => {
    setFilterFields([...filterFields, { id: getUId(), type: 'string', field: '', operator: 'IN', value: [] }]);
  };

  const delFilterField = (id: string) => {
    if (!isEmpty(filterFields.find((item) => item.id === id)?.field)) {
      removeFilterNode(id);
    }
    setFilterFields(filterFields.filter((item: FilterNode) => item.id !== id));
  };

  return (
    <>
      {filterFields.map((item) => {
        return (
          <FilterItem
            key={item.id}
            showDeleteFilter={showDeleteFilter}
            defaultValue={item}
            data={data}
            columns={columns}
            onChange={(val) => onFilterFieldChange(val, item.id)}
            onDelField={() => delFilterField(item.id)}
            size="small"
          />
        );
      })}

      {showAddFilter && (
        <div className={`${CLS_PREFIX}__add-btn`}>
          <PlusCircleOutlined className={`${CLS_PREFIX}__add-icon`} onClick={addFilterField} />
        </div>
      )}
    </>
  );
};
