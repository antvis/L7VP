import { useLIContext } from './useLIContext';

export const useStateManager = () => {
  const { stateManager } = useLIContext();

  return stateManager;
};
