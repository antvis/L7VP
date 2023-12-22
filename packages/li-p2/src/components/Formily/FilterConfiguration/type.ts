export type Granularity = 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';

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
   * 字段数值范围
   */
  domain?: string[] | [number, number];
};

// FilterConfiguration

type FilterConfigBase = {
  id: string;
  title: string;
  field: string;
};

export type FilterStringConfigType = FilterConfigBase & {
  type: 'string';
  operator: 'IN';
  value?: string[];
  params: {
    // 筛选方式
    filterType: 'multiple' | 'single';
  };
};

export type FilterDateConfigType = FilterConfigBase & {
  type: 'date';
  /** 日期粒度 */
  granularity: Granularity;
  operator: 'BETWEEN';
  value?: [string, string];
  params: {
    // 日期格式
    format: string;
    // 筛选方式
    dateType: 'date' | 'range';
  };
};

export type FilterNumberConfigType = FilterConfigBase &
  (
    | {
        type: 'number';
        operator: '>=' | '<=';
        value?: number;
      }
    | {
        type: 'number';
        operator: 'BETWEEN';
        value?: [number, number];
      }
  );

export type FilterConfig = FilterDateConfigType | FilterNumberConfigType | FilterStringConfigType;
