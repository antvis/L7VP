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
   * 更多数据
   */
  domain?: string[] | [number, number];
};

export type FilterSettingString = {
  id: string;
  field: string;
  type: 'string';
  operator: 'IN';
  value?: string[];
  params: {
    // 筛选方式
    filterType: 'multiple' | 'radio';
  };
};

export type FilterSettingDate = {
  id: string;
  field: string;
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

export type FilterSettingNumber =
  | {
      id: string;
      field: string;
      type: 'number';
      operator: '>=' | '<=';
      value?: number;
    }
  | {
      id: string;
      field: string;
      type: 'number';
      operator: 'BETWEEN';
      value?: [number, number];
    };

export type FilterSettingItem = FilterSettingDate | FilterSettingNumber | FilterSettingString;
