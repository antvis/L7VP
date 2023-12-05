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
   * 更多数据
   */
  domain?: (string | number)[];
};

type Filter = {
  id: string;
  field: string;
  fieldMeta?: DatasetField;
  params?: Record<string, unknown>;
};

export type FilterString = Filter & {
  type: 'string';
  operator: 'IN';
  value: string[]; // 选择默认筛选值，需要筛选项添加 --全部 选项
  otherParams: {
    radioType: 'multip' | 'radio'; // 是否单选类
  };
};

export type FilterNumnber =
  | (Filter & {
      type: 'number';
    } & {
      operator: 'BETWEEN';
      value: [number, number]; // default 不限
    })
  | {
      operator: '>=' | '<=';
      value: number; // default 不限
    };

// 时间显示的都是一个区间，如何判断二次回填信息
export type FilterDate = Filter & {
  type: 'date';
  /** 日期粒度 */
  granularity?: 'minute' | 'hour' | 'day' | 'month' | 'year';
  operator: 'BETWEEN';
  value: [string, string];
};

export type FilterNodeItem = FilterDate | FilterNumnber | FilterString;
