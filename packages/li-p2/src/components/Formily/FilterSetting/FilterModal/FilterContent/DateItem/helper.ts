import { isEmpty } from 'lodash-es';
import { DEFAULT_OPTIONS } from '../../../components/FilterDateSetting/contents';

export const getOptions = (format: string) => {
  const isDiagonalLineSplit = format.indexOf('/') === -1;
  const options = DEFAULT_OPTIONS.map((item) => ({
    picker: item.picker,
    granularity: item.granularity,
    label: isDiagonalLineSplit ? item.label : item.otherLabel,
    value: isDiagonalLineSplit ? item.value : item.other,
  }));

  const formatIndex = options.findIndex((item) => item.value === format);

  if (!isEmpty(formatIndex)) {
    return options;
  }

  return options.slice(formatIndex);
};
