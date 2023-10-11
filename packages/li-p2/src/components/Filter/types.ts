/**
 * 数据列字段项
 */
export type ColumnType = {
  name: string;
  id?: string;
  displayName?: string;
  /**
   * 数据类型
   */
  type: FilterType | string;
  /**
   * 类型名
   */
  typeName?: string;
  /**
   * 类型颜色
   */
  typeColor?: string;
  /**
   * 时间类型
   */
  format?: string;
};

export type FilterType = 'number' | 'string' | 'date';

export type FilterNumberOperator = '>' | '>=' | '=' | '<=' | '<' | 'BETWEEN';
export type FilterNumberValue = number | [number, number];

export type FilterStringOperator = 'LIKE' | 'NOT_LIKE' | 'IN' | 'NOT_IN';
export type FilterStringValue = string | string[];

export type FilterDateOperator = 'BETWEEN' | '>' | '<';
export type FilterDateValue = string | [string, string];

/** 筛选器子节点，单个筛选条件 */
export type FilterNode = {
  id: string;
  field: string;
  params?: Record<string, unknown>;
} & (
  | {
      type: 'number';
      operator: FilterNumberOperator;
      value: FilterNumberValue;
    }
  | {
      type: 'string';
      operator: FilterStringOperator;
      value: FilterStringValue;
    }
  | {
      type: 'date';
      operator: FilterDateOperator;
      value: FilterDateValue;
    }
);

// 筛选器逻辑运算符
export type FilterLogicalOperators = 'AND' | 'OR';
