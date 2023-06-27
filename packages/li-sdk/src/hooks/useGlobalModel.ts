import { useCallback, useEffect, useState } from 'react';
import { GlobalStoreEvent } from '../state/constants';
import type { GlobalModel } from '../state/global';
import { useStateManager } from './internal';

export function useGlobalModel<T = GlobalModel>(): [T, (value: Partial<T> | ((prevState: T) => Partial<T>)) => void] {
  const { globalStore } = useStateManager();
  const [globalData, setGlobal] = useState<T>(globalStore.getGlobal() as T);

  useEffect(() => {
    const update = (global: T) => {
      setGlobal(global);
    };
    globalStore.on(GlobalStoreEvent.UPDATE_GLOBAL, update);

    return () => {
      globalStore.off(GlobalStoreEvent.UPDATE_GLOBAL, update);
    };
  }, [globalStore]);

  const setGlobalData = useCallback(
    (value: Partial<T> | ((prevState: T) => Partial<T>)) => {
      if (value instanceof Function) {
        const data = value(globalData);
        if (typeof data !== 'object') {
          throw new Error("setGlobalData: return data is't object");
        }
        globalStore.setGlobal(data);
      } else {
        globalStore.setGlobal(value);
      }
    },
    [globalData, globalStore],
  );

  return [globalData, setGlobalData];
}
