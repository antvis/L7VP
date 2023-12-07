import { uniqueId } from 'lodash-es';
import type { FilterDate, FilterNumnber, FilterString, OptionType } from '../type';

export const getDefaultValue = (field: OptionType) => {
  if (field.type === 'string') {
    const _filter: FilterString = {
      id: uniqueId(),
      field: field.value,
      type: 'string',
      operator: 'IN',
      value: field.domain as string[],
      params: {
        radioType: 'radio',
      },
    };
    return _filter;
  }

  if (field.type === 'date') {
    const _filter: FilterDate = {
      id: uniqueId(),
      field: field.value,
      type: 'date',
      operator: 'BETWEEN',
      granularity: 'day',
      value: undefined,
      params: {
        format: field.format ?? 'YYYY-MM-DD',
      },
    };
    return _filter;
  }

  const _filter: FilterNumnber = { id: uniqueId(), field: field.value, type: 'number', operator: '>=', value: 0 };
  return _filter;
};
