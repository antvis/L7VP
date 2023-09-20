import { DeleteOutlined } from '@ant-design/icons';
import { Popconfirm, Select, Tag, theme, Empty } from 'antd';
import { isArray, isEmpty, isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import cls from 'classnames';
import { DEFAULT_RANGE, FilterNumber } from '../FilterField/FilterNumber';
import { FilterString } from '../FilterField/FilterString';
import type { ColumnType, FilterNode, FilterType } from '../types';
import { NumberOperatorsOption, StringOperatorsOption } from './constants';
import './index.less';
import useStyle from './style';

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
};

export const FilterItem = (props: FilterItemProps) => {
  const { showDeleteFilter, defaultValue, data, columns, selectedFields = [], onDelField } = props;
  const [filterNode, setFilterNode] = useState(defaultValue);
  const field = isEmpty(filterNode.field) ? undefined : filterNode.field;
  const { token } = useToken();
  const [open, setOpen] = useState(false);
  const styles = useStyle();

  // 过滤字段
  // const fieldOptions: DefaultOptionType[] = columns
  //   .filter((column) => ['string', 'number'].includes(column.type))
  //   .map((colm) => ({
  //     label: (
  //       <span>
  //         <Tag color={colm.typeColor}>{isUndefined(colm.typeName) ? colm.type : colm.typeName}</Tag>
  //         {colm.displayName || colm.name}
  //       </span>
  //     ),
  //     title: colm.displayName || colm.name,
  //     value: colm.name,
  //     // 暂时启用可重复选择字段
  //     // disabled: selectedFields.includes(colm.name) && colm.name !== filterNode.field,
  //   }));

  const fieldOptions = useMemo(() => {
    return columns.filter((column) => ['string', 'number'].includes(column.type));
  }, [columns]);

  const onValueChange = (val: FilterNode['value']) => {
    const _filterNode = { ...filterNode, value: val } as FilterNode;
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
      _filterNode = { id: filterNode.id, type: 'date', field: val, operator: '>', value: '' };
    } else {
      _filterNode = { id: filterNode.id, type: 'string', field: val, operator: 'IN', value: [] as string[] };
    }
    setFilterNode(_filterNode);
    props.onChange(_filterNode);
    setOpen(false);
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
          size="small"
          placeholder="请选择筛选字段"
          value={field}
          open={open}
          onDropdownVisibleChange={(visible) => setOpen(visible)}
          dropdownRender={() => {
            if (!fieldOptions?.length) {
              return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
            }

            const dropdownHeight = 32 * fieldOptions.length < 256 ? 32 * fieldOptions.length + 14 : 256;
            return (
              <div className={`${CLS_PREFIX}-dropdown`} style={{ height: dropdownHeight }}>
                <div className={`${CLS_PREFIX}-dropdown-container`}>
                  {fieldOptions?.map((item, index) => {
                    return (
                      <div
                        className={cls(`${CLS_PREFIX}-item`, styles.selectItem, {
                          [styles.selectedItem]: item.name === field,
                        })}
                        key={index}
                        onClick={() => onFieldChange(item.name)}
                      >
                        <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
                        <span>{item.displayName || item.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }}
        >
          {fieldOptions?.map((item, index) => {
            return (
              <Select.Option value={item.name} key={index}>
                <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
                <span>{item.displayName || item.name}</span>
              </Select.Option>
            );
          })}
        </Select>

        <Select
          className={`${CLS_PREFIX}__select-operator`}
          size="small"
          placeholder="请选择筛选方式"
          options={(filterNode.type === 'string' ? StringOperatorsOption : NumberOperatorsOption) as any[]}
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
              field={filterNode.field}
              operator={filterNode.operator}
              value={filterNode.value}
              onChange={(val) => onValueChange(val)}
            />
          )}

          {/* 文本类型筛选 */}
          {filterNode.type === 'string' && (
            <FilterString
              field={filterNode.field}
              data={data}
              operator={filterNode.operator}
              value={filterNode.value}
              onChange={(val) => onValueChange(val)}
            />
          )}
        </>
      )}
    </div>
  );
};
