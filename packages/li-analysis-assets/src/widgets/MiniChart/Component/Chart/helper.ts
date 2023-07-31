import { Classic, ClassicDark } from '@antv/g2/esm/theme';
import { isInteger } from 'lodash-es';

export const numberFormatThousandsSeparator = (value: number) => {
  return value.toString().replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
};

const formatTrillion = (value: number) => {
  const format = value / 1000000000000;
  return isInteger(format)
    ? `${numberFormatThousandsSeparator(format)}万亿`
    : `${numberFormatThousandsSeparator(Number(format.toFixed(2)))}万亿`;
};

const formatHundredMillion = (value: number) => {
  const format = value / 100000000;
  return isInteger(format)
    ? `${numberFormatThousandsSeparator(format)}亿`
    : `${numberFormatThousandsSeparator(Number(format.toFixed(2)))}亿`;
};

const formatMillions = (value: number) => {
  const format = value / 1000000;
  return isInteger(format)
    ? `${numberFormatThousandsSeparator(format)}百万`
    : `${numberFormatThousandsSeparator(Number(format.toFixed(2)))}百万`;
};

const formatTenThousand = (value: number) => {
  const format = value / 10000;
  return isInteger(format)
    ? `${numberFormatThousandsSeparator(format)}万`
    : `${numberFormatThousandsSeparator(Number(format.toFixed(2)))}万`;
};

export const formatNumber = (
  value: number,
  unit?: 'auto' | 'tenThousand' | 'millions' | 'hundredMillion' | 'trillion',
) => {
  switch (unit) {
    case 'tenThousand':
      return formatTenThousand(value);
    case 'millions':
      return formatMillions(value);
    case 'hundredMillion':
      return formatHundredMillion(value);
    case 'trillion':
      return formatTrillion(value);
    case 'auto':
    default:
      if (value / 10000 < 1) {
        return isInteger(value)
          ? numberFormatThousandsSeparator(value)
          : numberFormatThousandsSeparator(Number(value.toFixed(2)));
      } else if (value / 1000000 < 1) {
        return formatTenThousand(value);
      } else if (value / 100000000 < 1) {
        return formatMillions(value);
      } else if (value / 1000000000000 < 1) {
        return formatHundredMillion(value);
      } else {
        return formatTrillion(value);
      }
  }
};

export const getChartTheme = (theme: 'classic' | 'classicDark') => {
  const BACKGROUND_COLOR = 'transparent';

  const defaultOptions =
    theme === 'classicDark'
      ? Object.assign(ClassicDark(), {
          viewFill: BACKGROUND_COLOR,
        })
      : Classic();

  return defaultOptions;
};
