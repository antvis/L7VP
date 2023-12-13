import dayjs from 'dayjs';
import { uniqueId } from 'lodash-es';
import type { FilterDate, FilterNumber, FilterString, OptionType } from '../type';
import { getTimeFormat } from './FilterContent/DateItem/helper';

export const UNSELECTED_FIELD_ID = 'UNSELECTED_FIELD_ID';

export const getDefaultValue = (field: OptionType) => {
  if (field.type === 'string') {
    const _filter: FilterString = {
      id: uniqueId(UNSELECTED_FIELD_ID),
      field: field.value,
      type: 'string',
      operator: 'IN',
      value: field.domain as string[],
      params: {
        radioType: 'radio',
        domain: field.domain as string[],
      },
    };
    return _filter;
  }

  if (field.type === 'date') {
    const _filter: FilterDate = {
      id: uniqueId(UNSELECTED_FIELD_ID),
      field: field.value,
      type: 'date',
      operator: 'BETWEEN',
      granularity: 'day',
      value: getTimeFormat(dayjs(new Date()).format('YYYY-MM-DD'), 'YYYY-MM-DD'),
      params: {
        format: field.format ?? 'YYYY-MM-DD',
        domain: field.domain,
        type: 'date',
      },
    };
    return _filter;
  }

  const _filter: FilterNumber = {
    id: uniqueId(UNSELECTED_FIELD_ID),
    field: field.value,
    type: 'number',
    operator: '>=',
    value: 0,
    params: {
      domain: field.domain,
    },
  };
  return _filter;
};
