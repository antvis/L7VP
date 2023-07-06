import { useLIContext } from './useLIContext';

export const useRegistryManager = () => {
  const { registryManager } = useLIContext();

  return registryManager;
};
