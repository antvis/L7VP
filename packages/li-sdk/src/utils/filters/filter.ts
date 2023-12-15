import type { DatasetField, DatasetFilter, FilterLogicalOperators, FilterNode } from '../../specs';
import { filterFunctions } from './filter-types';

const LOGICAL_OPERATOR_METHODS: Record<FilterLogicalOperators, 'every' | 'some'> = {
  AND: 'every',
  OR: 'some',
};

function passesFilter(
  value: Record<string, unknown>,
  filterNodes: FilterNode[],
  filtersLogicalOperator: FilterLogicalOperators,
) {
  const method = LOGICAL_OPERATOR_METHODS[filtersLogicalOperator];
  const columns = filterNodes.map((child) => child.field);

  return columns[method]((column, index) => {
    // 过滤掉空值
    if (!value || value[column] === null || value[column] === undefined) {
      return false;
    }
    const filterNode = filterNodes[index];
    const filterType = filterFunctions[filterNode.type];
    const filterOperator = filterNode.operator;
    // @ts-ignore
    const filterFunction = filterType[filterOperator];

    if (!filterFunction) {
      throw new Error(`"${filterNode.operator}" filter is not implemented.`);
    }

    try {
      const result = filterFunction(value[column], filterNode.value, filterNode.params);
      return result;
    } catch (error) {
      console.warn(error);
      return false;
    }
  });
}

function buildDatasetFilter(filter: DatasetFilter) {
  const { children: filterNodes, relation: filtersLogicalOperator } = filter;

  return (value: Record<string, unknown>) => {
    return passesFilter(value, filterNodes, filtersLogicalOperator);
  };
}

export function applyDatasetFilter(values: Record<string, unknown>[], filter: DatasetFilter) {
  const _filter = filterFalsyDatasetFilter(filter);
  return Object.keys(_filter.children).length ? values.filter(buildDatasetFilter(_filter)) : values;
}

export function filterFalsyDatasetFilter(filter: DatasetFilter) {
  const _filter = {
    ...filter,
    children: filter.children.filter((item) => {
      // 过滤掉条件空值
      if (['string', 'number', 'date'].includes(item.type)) {
        if (item.value === '') return false;
        if (Array.isArray(item.value) && item.value.length === 0) return false;
      }

      return true;
    }),
  };

  return _filter;
}

export function getValidFilterWithMeta(filter: DatasetFilter, columns: DatasetField[]) {
  const filterChildren = filterFalsyDatasetFilter(filter).children.map((child) => {
    const column = columns.find((item) => item.name === child.field);
    // 给 filter 添加 fieldMeta，Remote 数据集可能会用到
    return Object.assign({}, child, column && { fieldMeta: column });
  });
  const filterWithMeta = { ...filter, children: filterChildren };

  return filterWithMeta;
}
