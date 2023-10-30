import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Select, Tag, theme } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import { isArray, isEmpty, isUndefined } from 'lodash-es';
import React, { useState } from 'react';
import { FilterDate } from '../FilterField/FilterDate';
import { DEFAULT_RANGE, FilterNumber } from '../FilterField/FilterNumber';
import { FilterString } from '../FilterField/FilterString';
import type { ColumnType, FilterNode, FilterType, Granularity } from '../types';
import { OperatorsOption } from './constants';
import './index.less';

const { useToken } = theme;
export const CLS_PREFIX = 'li-filter-item';

export type FilterItemProps = {
  showDeleteFilter: boolean;
  defaultValue: FilterNode;
  data: Record<string, any>[];
  columns: ColumnType[];
  selectedFields?: string[];
  onChange: (val: FilterNode) => void;
  onDelField: () => void;
  size?: 'small' | 'middle' | 'large';
};

export const FilterItem = (props: FilterItemProps) => {
  const { showDeleteFilter, defaultValue, data, columns, selectedFields = [], onDelField, size = 'small' } = props;
  const [filterNode, setFilterNode] = useState(defaultValue);
  const field = isEmpty(filterNode.field) ? undefined : filterNode.field;
  const { token } = useToken();

  // 过滤字段
  const fieldOptions: DefaultOptionType[] = columns
    .filter((column) => ['string', 'number', 'date'].includes(column.type))
    .map((colm) => ({
      label: (
        <span>
          <Tag color={colm.typeColor}>{isUndefined(colm.typeName) ? colm.type : colm.typeName}</Tag>
          {colm.displayName || colm.name}
        </span>
      ),
      title: colm.displayName || colm.name,
      value: colm.name,
      // 暂时启用可重复选择字段
      // disabled: selectedFields.includes(colm.name) && colm.name !== filterNode.field,
    }));

  const operatorsOption: DefaultOptionType[] = OperatorsOption[filterNode.type];

  const onValueChange = (val: FilterNode['value'], granularity?: Granularity) => {
    const _filterNode = { ...filterNode, value: val } as FilterNode;

    if (_filterNode.type === 'date' && granularity) {
      _filterNode.granularity = granularity;
    }

    setFilterNode(_filterNode);
    props.onChange(_filterNode);
  };

  const onFieldChange = (val: string) => {
    const type = columns.find((item) => item.name === val)?.type as FilterType;
    if (type === filterNode.field) return;

    let _filterNode: FilterNode;
    if (type === 'number') {
      _filterNode = { id: filterNode.id, type: 'number', field: val, operator: '>', value: 0 };
    } else if (type === 'date') {
      _filterNode = { id: filterNode.id, type: 'date', field: val, operator: '>', value: '', granularity: 'day' };
    } else {
      _filterNode = { id: filterNode.id, type: 'string', field: val, operator: 'IN', value: [] as string[] };
    }
    setFilterNode(_filterNode);
    props.onChange(_filterNode);
  };

  const onOperatorChange = (val: FilterNode['operator']) => {
    let _filterNodeValue: FilterNode['value'] = '';
    if (filterNode.type === 'number') {
      if (val === 'BETWEEN') {
        _filterNodeValue =
          isArray(filterNode.value) && filterNode.value.length === 2 ? filterNode.value : DEFAULT_RANGE;
      } else {
        _filterNodeValue = isArray(filterNode.value) ? filterNode.value[0] : filterNode.value;
      }
    } else if (filterNode.type === 'date') {
      if (val === 'BETWEEN') {
        _filterNodeValue = isArray(filterNode.value) && filterNode.value.length === 2 ? filterNode.value : [];
      } else {
        _filterNodeValue = isArray(filterNode.value) ? filterNode.value[0] : filterNode.value;
      }
    } else if (filterNode.type === 'string') {
      if (['IN', 'NOT_IN'].includes(val)) {
        _filterNodeValue = Array.isArray(filterNode.value) ? filterNode.value : [filterNode.value];
      } else {
        _filterNodeValue = Array.isArray(filterNode.value) ? '' : filterNode.value;
      }
    }
    const _filterNode = { ...filterNode, operator: val, value: _filterNodeValue } as FilterNode;
    setFilterNode(_filterNode);
    props.onChange(_filterNode);
  };

  return (
    <div className={`${CLS_PREFIX}`} style={{ borderColor: token.colorBorder }}>
      <div className={`${CLS_PREFIX}__filter-field`}>
        <span>过滤字段</span>
        {showDeleteFilter && (
          <div className={`${CLS_PREFIX}__del-filter`}>
            <Popconfirm title="确定要删除此筛选字段？" onConfirm={onDelField} okText="确定" cancelText="取消">
              <DeleteOutlined />
            </Popconfirm>
          </div>
        )}
      </div>

      <div className={`${CLS_PREFIX}__field-operator`}>
        <Select
          showSearch
          className={`${CLS_PREFIX}__select-field`}
          style={{ marginRight: 10 }}
          size="large"
          placeholder="请选择筛选字段"
          value={field}
          options={fieldOptions}
          popupMatchSelectWidth={false}
          filterOption={(input, option) => (option?.title ?? '').includes(input)}
          onChange={(val: string) => onFieldChange(val)}
        />
        <Select
          className={`${CLS_PREFIX}__select-operator`}
          size={size}
          placeholder="请选择筛选方式"
          options={operatorsOption}
          value={filterNode.operator}
          onChange={(val) => onOperatorChange(val)}
        />
      </div>

      {filterNode.field && (
        <>
          <div className={`${CLS_PREFIX}__filter-content-title`}>
            <span>过滤内容</span>
          </div>

          {/* 数值类型筛选 */}
          {filterNode.type === 'number' && (
            <FilterNumber
              size={size}
              field={filterNode.field}
              operator={filterNode.operator}
              value={filterNode.value}
              onChange={(val) => onValueChange(val)}
            />
          )}

          {/* 文本类型筛选 */}
          {filterNode.type === 'string' && (
            <FilterString
              size={size}
              field={filterNode.field}
              data={data}
              operator={filterNode.operator}
              value={filterNode.value}
              onChange={(val) => onValueChange(val)}
            />
          )}

          {/* 日期类型筛选 */}
          {filterNode.type === 'date' && (
            <FilterDate
              size={size}
              // 当缺失格式时，默认为最小粒度的格式
              format={columns.find((item) => item.name === filterNode.field)?.format ?? 'YYYY-MM-DD HH:mm:ss'}
              defaultGranularity={filterNode.granularity}
              operator={filterNode.operator}
              value={filterNode.value}
              onChange={(val, granularity) => onValueChange(val, granularity)}
            />
          )}
        </>
      )}
    </div>
  );
};
