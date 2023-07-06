export type H3HexagonLayerSource = {
  /** 数据 */
  data: Record<string, any>[];
  parser: {
    type: 'json';
    /** hexagonId 字段 */
    hexagonId: string;
  };
};
