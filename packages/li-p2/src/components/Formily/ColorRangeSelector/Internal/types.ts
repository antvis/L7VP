export type ColorRange = {
  name?: string;
  /**
   * 色带类型
   * 连续 ｜ 分类 ｜ 发散 ｜ 单色
   */
  type?: 'sequential' | 'qualitative' | 'diverging' | 'singlehue';
  category?: string;
  colors: string[];
};

export type SelectorValue = {
  colors: string[];
  isReversed?: boolean;
};
