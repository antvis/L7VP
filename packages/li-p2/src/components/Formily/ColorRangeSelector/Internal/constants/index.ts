import type { ColorRange } from '../types';
export { COLOR_RANGES } from './color-ranges';

export const DEFAULT_VALUE = {
  colors: ['#ffffcc', '#c2e699', '#78c679', '#31a354', '#006837'],
  isReversed: false,
};

export const getColorGroupByName = (colorRange: ColorRange): string | null => {
  if (!colorRange || typeof colorRange.name !== 'string') {
    return null;
  }

  return colorRange.name.replace(/\b[^a-zA-Z]+$/, '');
};
