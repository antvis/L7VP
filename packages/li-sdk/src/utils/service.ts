import type { ImplementService, ImplementServiceOptions, ServiceParams } from '../types';

/**
 * 实现一个服务资产:
 * LI 资产研发教程 🔗 https://www.yuque.com/antv/l7vp/zqvk302x61qq2kcq
 */
export function implementService<
  Params extends ServiceParams = ServiceParams,
  DataType extends Record<string, unknown> = Record<string, unknown>
>(options: ImplementServiceOptions<Params, DataType>) {
  const result: ImplementService<any[], unknown> = options as ImplementService<any[], unknown>;

  return result;
}
