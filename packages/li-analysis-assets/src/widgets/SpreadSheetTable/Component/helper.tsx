import { DarkTheme, LightTheme } from './constant';

export const getThemeCfg = (theme?: 'dark' | 'light') => {
  switch (theme) {
    case 'dark':
      return DarkTheme;
    case 'light':
    default:
      return LightTheme;
  }
};
