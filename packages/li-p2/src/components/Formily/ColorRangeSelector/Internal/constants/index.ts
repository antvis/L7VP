import type { ColorRange } from '../types';

export const DEFAULT_VALUE = {
  colors: ['#ffffe5', '#f7fcb9', '#d9f0a3', '#addd8e', '#78c679', '#41ab5d', '#238443', '#006837', '#004529'],
  isReversed: false,
};

export const getColorGroupByName = (colorRange: ColorRange): string | null => {
  if (!colorRange || typeof colorRange.name !== 'string') {
    return null;
  }

  return colorRange.name.replace(/\b[^a-zA-Z]+$/, '');
};
