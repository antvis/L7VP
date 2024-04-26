import { EXTERNAL_RESOURCES } from '@/constants';

export const getAssetDepExternalEnv = () => {
  const env: Record<string, any> = {};

  for (const [, value] of EXTERNAL_RESOURCES) {
    if (Array.isArray(value.globals)) {
      value.globals.forEach((global) => {
        env[global] = (window as any)[global];
      });
    } else {
      const global = value.globals;
      env[global] = (window as any)[global];
    }
  }

  return env;
};
