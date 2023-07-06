import { COLOR_RANGES } from '../../../ColorRangeSelector/Internal/constants/color-ranges';

export const DEFAULT_RIBBON_LIST: string[][] = COLOR_RANGES.filter((item) => item.colors.length === 6).map(
  (item) => item.colors,
);
