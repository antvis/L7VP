import type { DatasetFilter, ServiceMetadata } from '../specs';

export interface ServiceParams {
  filter?: DatasetFilter;
  properties: Record<string, any>;
}

type ImplementServiceBaseOptions = {
  /**
   * 服务资产版本号
   */
  version: string;
};

export type ImplementServiceOptions<
  Params extends ServiceParams = ServiceParams,
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
