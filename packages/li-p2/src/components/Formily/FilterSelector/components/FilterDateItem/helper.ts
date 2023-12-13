import dayjs from 'dayjs';
import { DEFAULT_OPTIONS, DateGranularity } from './contents';

export const getTimeFormat = (
  times: [string, string] | string,
  dateGranularity: string,
): [string, string] | undefined => {
  const _format = DateGranularity[dateGranularity];
  const _times =
    typeof times === 'string'
      ? dayjs(times).format(dateGranularity)
      : [dayjs(times[0]).format(dateGranularity), dayjs(times[1]).format(dateGranularity)];

  if (!_format) {
    return undefined;
  }

  if (typeof _times === 'string') {
    const _timer: [string, string] = [
      dayjs(_times).format(_format.format),
      dayjs(_times).endOf(_format.granularity).format(_format.format),
    ];

    return _timer;
  }

  const _item: [string, string] = [
    dayjs(_times[0]).format(_format.format),
    dayjs(_times[1]).endOf(_format.granularity).format(_format.format),
  ];

  return _item;
};

export const getGranularityOptions = (format: string) => {
  const isDiagonalLineSplit = format.indexOf('/') === -1;
  const options = DEFAULT_OPTIONS.map((item) => ({
    picker: item.picker,
    granularity: item.granularity,
    label: isDiagonalLineSplit ? item.label : item.otherLabel,
    value: isDiagonalLineSplit ? item.value : item.other,
    key: isDiagonalLineSplit ? item.value : item.other,
  }));

  return options;
};
