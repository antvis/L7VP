import { useLIContext } from './useLIContext';

export const useEventBus = () => {
  const { eventBus } = useLIContext();

  return eventBus;
};
