import type { FilterDate, FilterNode, FilterNumber, FilterString } from '../../specs';
import { between } from './number-between';
import { stringSearch } from './string-search';

export type FilterTypes = FilterNode['type'];
export type FilterOperators = FilterString['operator'] | FilterNumber['operator'] | FilterDate['operator'];

type FilterFunction = (value: any, filterValue: any, params?: Record<string, unknown>) => boolean;

export type FilterFunctions = {
  string: Record<FilterString['operator'], FilterFunction>;
  number: Record<FilterNumber['operator'], FilterFunction>;
  date: Record<FilterDate['operator'], FilterFunction>;
};

const stringIn: FilterFunction = (value: string, filterValue: string[]) => filterValue.includes(value);

const stringNotIn: FilterFunction = (value: string, filterValue: string[]) => !filterValue.includes(value);

const stringLike: FilterFunction = (value: string, filterValue: string) => {
  return stringSearch([filterValue], value);
};

const stringNotLike: FilterFunction = (value: string, filterValue: string) => {
  return !stringSearch([filterValue], value);
};

const numberEqual: FilterFunction = (value: number, filterValue: number) => value === filterValue;

const numberGreaterThan: FilterFunction = (value: number, filterValue: number) => value > filterValue;

const numberGreaterThanOrEqual: FilterFunction = (value: number, filterValue: number) => value >= filterValue;

const numberLessThan: FilterFunction = (value: number, filterValue: number) => value < filterValue;

const numberLessThanOrEqual: FilterFunction = (value: number, filterValue: number) => value <= filterValue;

const numberBetween: FilterFunction = (value: number, filterValue: [number, number]) => {
  return between(value, [filterValue]);
};

const timeBetween: FilterFunction = (value: string, filterValue: [string, string]) => {
  const featureValueAsTimestamp = new Date(value).getTime();
  if (isFinite(featureValueAsTimestamp)) {
    const filterValues = filterValue.map((item) => new Date(item).getTime()) as [number, number];
    return between(featureValueAsTimestamp, [filterValues]);
  } else {
    // throw new Error(`Column ${value} used to filter by time isn't well formatted.`);
    return false;
  }
};

const timeGreaterThan: FilterFunction = (value: string, filterValue: string) => {
  const featureValueAsTimestamp = new Date(value).getTime();
  if (isFinite(featureValueAsTimestamp)) {
    const filterValueAsTimestamp = new Date(filterValue).getTime();
    return featureValueAsTimestamp > filterValueAsTimestamp;
  } else {
    // throw new Error(`Column ${value} used to filter by time isn't well formatted.`);
    return false;
  }
};

const timeLessThan: FilterFunction = (value: string, filterValue: string) => {
  const featureValueAsTimestamp = new Date(value).getTime();
  if (isFinite(featureValueAsTimestamp)) {
    const filterValueAsTimestamp = new Date(filterValue).getTime();
    return featureValueAsTimestamp < filterValueAsTimestamp;
  } else {
    // throw new Error(`Column ${value} used to filter by time isn't well formatted.`);
    return false;
  }
};

export const filterFunctions: FilterFunctions = {
  string: {
    IN: stringIn,
    NOT_IN: stringNotIn,
    LIKE: stringLike,
    NOT_LIKE: stringNotLike,
  },
  number: {
    '=': numberEqual,
    '>': numberGreaterThan,
    '>=': numberGreaterThanOrEqual,
    '<': numberLessThan,
    '<=': numberLessThanOrEqual,
    BETWEEN: numberBetween,
  },
  date: {
    BETWEEN: timeBetween,
    '>': timeGreaterThan,
    '<': timeLessThan,
  },
};
