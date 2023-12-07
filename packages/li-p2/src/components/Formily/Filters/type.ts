import type { DatasetField } from '@antv/li-sdk';

/**
 * 数据列表字段项
 */
export type OptionType = {
  /**
   * 值
   */
  value: string;
  /**
   * label
   */
  label: string;
  /**
   * 数据类型
   */
  type?: string;
  /**
   * 类型名
   */
  typeName?: string;
  /**
   * 类型颜色
   */
  typeColor?: string;
  /**
   * 日期格式
   */
  format?: string;
  /**
   * 更多数据
   */
  domain?: (string | number)[];
};

type FilterBase = {
  id: string;
  field: string;
  fieldMeta?: DatasetField;
  params?: Record<string, unknown>;
};

export type FilterString = FilterBase & {
  type: 'string';
  operator: 'IN';
  value: string[];
  params: {
    radioType: 'multip' | 'radio'; // 是否单选类
  };
};

export type FilterDate = FilterBase & {
  type: 'date';
  /** 日期粒度 */
  granularity?: 'minute' | 'hour' | 'day' | 'month' | 'year';
  operator: 'BETWEEN';
  value?: [string, string];
  params: {
    format: string;
  };
};

export type FilterNumnber = FilterBase &
  (
    | {
        type: 'number';
        operator: '>=' | '<=';
        value: number; // default 不限
      }
    | {
        type: 'number';
        operator: 'BETWEEN';
        value: [number, number]; // default 不限
      }
  );

export type FilterNodeItem = FilterDate | FilterNumnber | FilterString;
