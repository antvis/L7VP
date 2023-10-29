import type { DatasetFilter, ServiceMetadata } from '../specs';

export interface DatasetServiceParams<Properties extends Record<string, any> = Record<string, any>> {
  filter?: DatasetFilter;
  properties: Properties;
  signal: AbortSignal;
}

/**
 * 兼容旧的类型名称
 * @deprecated 不建议使用
 */
export type ServiceParams = DatasetServiceParams;

type ImplementServiceBaseOptions = {
  /**
   * 服务资产版本号
   */
  version: string;
};

export type ImplementServiceOptions<
  Params extends DatasetServiceParams = DatasetServiceParams,
  DataType extends Record<string, unknown> = Record<string, unknown>
> =
  | (ImplementServiceBaseOptions & {
      /**
       * 服务资产元属性信息
       */
      metadata: Omit<ServiceMetadata, 'type'> & { type: 'Dataset' };
      /**
       * 数据集查询服务实现
       */
      service: (params: Params) => Promise<DataType[]>;
    })
  | (ImplementServiceBaseOptions & {
      /**
       * 服务资产元属性信息
       */
      metadata: Omit<ServiceMetadata, 'type'> & { type: 'Custom' };
      /**
       * 自定义服务实现
       */
      service: (...params: any[]) => Promise<unknown>;
    });

export type ImplementService<Params extends any[] = any, DataType = any> = ImplementServiceBaseOptions & {
  metadata: ServiceMetadata;
  service: (...params: Params) => Promise<DataType>;
};
