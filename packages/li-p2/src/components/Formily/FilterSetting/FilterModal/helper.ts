import type { FilterDate, FilterNumber, FilterString, OptionType } from '../type';

export const getDefaultValue = (field: OptionType, id: string) => {
  if (field.type === 'string') {
    const _filter: FilterString = {
      id,
      field: field.value,
      type: 'string',
      operator: 'IN',
      value: undefined,
      params: {
        filterType: 'radio',
      },
    };
    return _filter;
  }

  if (field.type === 'date') {
    const _filter: FilterDate = {
      id,
      field: field.value,
      type: 'date',
      operator: 'BETWEEN',
      granularity: 'day',
      params: {
        format: field.format ?? 'YYYY-MM-DD',
        dateType: 'date',
      },
    };
    return _filter;
  }

  const _filter: FilterNumber = {
    id,
    field: field.value,
    type: 'number',
    operator: '>=',
    value: undefined,
  };
  return _filter;
};
