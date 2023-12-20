import type { DateConfig, NumberConfig, StringConfig, OptionType } from '../type';

export const getDefaultValue = (field: OptionType, id: string) => {
  if (field.type === 'string') {
    const _filter: StringConfig = {
      id,
      title: field.value,
      field: field.value,
      type: 'string',
      operator: 'IN',
      value: undefined,
      params: {
        filterType: 'single',
      },
    };
    return _filter;
  }

  if (field.type === 'date') {
    const _filter: DateConfig = {
      id,
      title: field.value,
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

  const _filter: NumberConfig = {
    id,
    title: field.value,
    field: field.value,
    type: 'number',
    operator: '>=',
    value: undefined,
  };
  return _filter;
};
