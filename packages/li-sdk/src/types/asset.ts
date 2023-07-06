import type { Metadata } from '../specs';
import type { ImplementLayer } from './layer';
import type { ImplementService } from './service';
import type { ImplementWidget } from './widget';

/**
 * 资产包
 */
export type AssetPackage = {
  /**
   * 资产包版本号
   */
  version: string;
  /**
   * 资产包信息，用于存储资产包元数据信息
   */
  metadata?: Metadata;
  /**
   * 图层资产列表
   */
  layers: ImplementLayer<any, any>[];
  /**
   * 组件资产列表
   */
  widgets: ImplementWidget<any, any>[];
  /**
   * 服务资产列表
   */
  services?: ImplementService<any, any>[];
};

/**
 * 资产 CDN 包，描述信息
 */
export type AssetPackageSpec = {
  /* 资产包名称，
   * eg: "LI 核心资产"
   */
  name: string;
  /* 资产包包名，
   * eg: "@antv/li-core-assets"
   */
  package: string;
  /* 资产包版本号，
   * eg: "0.18.0"
   */
  version: string;
  /* 资产包地址，
   * eg: ["https://unpkg.com/@antv/li-core-assets@0.18.0/dist/umd/li-core-assets.min.js"]
   */
  urls: string[];
  /* 资产包 UMD 命名空间，
   * eg: "LICoreAssets"
   */
  global: string;
  /** 描述，
   * eg: "LI 核心资产, 包含 LI 核心图层、组件、服务"
   */
  description?: string;
};

/**
 * 解析资产 CDN 包配置
 */
export type LoadAssetPackageSpecOptions = {
  /** 是否加载样式资源 */
  isLoadStyle?: boolean;
  /** 是否启用沙箱加载资源 */
  sandbox?:
    | boolean
    | {
        /** 沙箱注入环境变量 */
        injectEnv?: Record<string, any>;
      };
};
