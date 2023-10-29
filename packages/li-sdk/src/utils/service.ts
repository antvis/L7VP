import type { QueryClientConfig } from '@tanstack/query-core';
import { QueryClient } from '@tanstack/query-core';
import type { DatasetServiceParams, ImplementService, ImplementServiceOptions } from '../types';

/**
 * 实现一个服务资产:
 * LI 资产研发教程 🔗 https://www.yuque.com/antv/l7vp/zqvk302x61qq2kcq
 */
export function implementService<
  Params extends DatasetServiceParams = DatasetServiceParams,
  DataType extends Record<string, unknown> = Record<string, unknown>
>(options: ImplementServiceOptions<Params, DataType>) {
  const result: ImplementService<any[], unknown> = options as ImplementService<any[], unknown>;

  return result;
}

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      //  Defaults is  0 milliseconds
      staleTime: 0,
      // Defaults is 5 * 60 * 1000 (5 minutes)
      gcTime: 5 * 60 * 1000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retryOnMount: false,
    },
  },
};
export const queryServiceClient = new QueryClient(queryClientConfig);

type Listener = () => void;

export class Subscribable<TListener extends Function = Listener> {
  protected listeners: Set<TListener>;

  constructor() {
    this.listeners = new Set();
    this.subscribe = this.subscribe.bind(this);
  }

  subscribe(listener: TListener): () => void {
    this.listeners.add(listener);

    this.onSubscribe();

    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }

  hasListeners(): boolean {
    return this.listeners.size > 0;
  }

  protected onSubscribe(): void {
    // Do nothing
  }

  protected onUnsubscribe(): void {
    // Do nothing
  }
}
