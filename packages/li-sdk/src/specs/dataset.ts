import type { Metadata } from './metadata';

/** 筛选器基础类型 */
type FilterBase = {
  id: string;
  field: string;
  fieldMeta?: DatasetField;
  params?: Record<string, unknown>;
};

/** 文本型筛选器 */
export type FilterString = FilterBase & {
  type: 'string';
} & (
    | {
        // 精准匹配
        operator: 'IN' | 'NOT_IN';
        value: string[];
      }
    | {
        // 模糊匹配
        operator: 'LIKE' | 'NOT_LIKE';
        value: string;
      }
  );

/** 数值型筛选器 */
export type FilterNumber = FilterBase & {
  type: 'number';
} & (
    | {
        // 大于 | 大于等于 | 等于 | 小于等于 | 小于
        operator: '>' | '>=' | '=' | '<=' | '<';
        value: number;
      }
    | {
        // 在范围内
        operator: 'BETWEEN';
        value: [number, number];
      }
  );

/** 日期型筛选器 */
export type FilterDate = FilterBase & {
  type: 'date';
  /** 日期粒度 */
  granularity?: 'second' | 'minute' | 'hour' | 'day' | 'month' | 'year';
} & (
    | {
        operator: 'BETWEEN';
        value: [string, string];
      }
    | {
        operator: '>' | '<';
        value: string;
      }
  );

/** 筛选器子节点，单个筛选条件 */
export type FilterNode = FilterString | FilterNumber | FilterDate;

// 筛选器逻辑运算符
export type FilterLogicalOperators = 'AND' | 'OR';

/** 筛选器组 */
export type FilterGroup = {
  relation: FilterLogicalOperators;
  children: FilterNode[];
};

/**
 * 数据筛选器配置项
 */
export type DatasetFilter = FilterGroup;

/** 列字段配置项 */
export type DatasetField = {
  name: string;
  id?: string;
  displayName?: string;
  /** 字段类型
   * number: 数值型
   * string: 文本型
   * boolean: 布尔型
   * geo: 地理型
   * h3: h3 型
   * date: 日期型
   *
   * @geo：'GeoPoint' | 'GeoPolygon' | 'GeoLineString' | 'GeoMultiLineString' | 'GeoMultiPolygon' | 'GeoMultiPoint';
   */
  type: 'number' | 'string' | 'boolean' | 'geo' | 'h3' | 'date';
  /**
   * 数据格式，用于日期类型指定日期格式，仅在 type 为 date 时有效，支持的格式有：
   * 'YYYY-MM-DD HH:mm:ss' 'YYYY/MM/DD HH:mm:ss'
   * 'YYYY-MM-DD' 'YYYY/MM/DD'
   * 'YYYY-MM' 'YYYY/MM'
   */
  format?: string;
};

/** 数据集基础类型 */
type BaseDataset = {
  /** 数据集 ID */
  id: string;
  /** 数据集信息 */
  metadata: Metadata;
};

/**
 * 静态数据源类型
 */
export type LocalDatasetSchema<T extends Record<string, any> = Record<string, any>> = BaseDataset & {
  /** 数据类型 */
  type: 'local';
  /** 数据 */
  data: T[];
  /** 列字段 */
  columns: DatasetField[];
  /** 筛选器 */
  filter?: DatasetFilter;
};

/**
 * XYZ 栅格瓦片服务配置项
 */
export type XYZRasterTileProperties = {
  // 栅格瓦片服务类型
  type: 'xyz-tile';
  // 瓦片服务地址
  url: string;
  minZoom?: number;
  maxZoom?: number;
  tileSize?: number;
  zoomOffset?: number;
  extent?: [number, number, number, number];
};

/**
 * 栅格瓦片数据源类型
 */
export type RasterTileDatasetSchema = BaseDataset & {
  type: 'raster-tile';
  // 瓦片服务配置
  properties: XYZRasterTileProperties;
};

/**
 * MVT 矢量瓦片服务配置项
 */
export type MVTVectorTileProperties = {
  // 矢量瓦片服务类型
  type: 'mvt-tile';
  // 瓦片服务地址
  url: string;
  // 矢量瓦片元数据地址
  metadataUrl: string;
  minZoom?: number;
  maxZoom?: number;
  tileSize?: number;
  zoomOffset?: number;
  extent?: [number, number, number, number];
};

/**
 * 矢量瓦片数据源类型
 */
export type VectorTileDatasetSchema = BaseDataset & {
  type: 'vector-tile';
  // 瓦片服务配置
  properties: MVTVectorTileProperties;
};

/**
 * 动态数据源类型
 */
export type RemoteDatasetSchema = BaseDataset & {
  /** 数据类型 */
  type: 'remote';
  /** 关联的服务类型 */
  serviceType: string;
  /** 服务属性配置 */
  properties: Record<string, any>;
  /** 列字段 */
  columns?: DatasetField[];
  /** 筛选器 */
  filter?: DatasetFilter;
};

export type DatasetSchema =
  | LocalDatasetSchema
  | VectorTileDatasetSchema
  | RasterTileDatasetSchema
  | RemoteDatasetSchema;
