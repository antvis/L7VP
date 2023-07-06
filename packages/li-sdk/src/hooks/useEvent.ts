import { useMemoizedFn } from 'ahooks';
import { useEffect } from 'react';
import { useEventBus } from './internal';

export const useEventSubscribe = (eventName: string, callback: (...args: any[]) => void, once?: boolean) => {
  const eventBus = useEventBus();
  const cb = useMemoizedFn(callback);

  useEffect(() => {
    eventBus.on(eventName, cb, once);
    return () => {
      eventBus.off(eventName, cb);
    };
  }, [eventBus, cb, eventName, once]);
};

export const useEventPublish = () => {
  const eventBus = useEventBus();

  return eventBus.emit.bind(eventBus);
};
