export enum AggregationTypes {
  COUNT = 'count',
  AVG = 'avg',
  MIN = 'min',
  MAX = 'max',
  SUM = 'sum',
}

type AggregationFunction = (
  values: number[] | Record<string, unknown>[],
  keys?: string | string[],
  joinOperation?: AggregationTypes,
) => number;

type AggregationFunctions = Record<AggregationTypes, AggregationFunction>;

// 求和
// function sum(values: number[]): number;
// function sum(values: Record<string, unknown>[], keys: string): number;
// function sum(values: Record<string, unknown>[], keys: string[], joinOperation: AggregationTypes): number;
const sum = (
  values: number[] | Record<string, unknown>[],
  keys?: string | string[],
  joinOperation?: AggregationTypes,
) => {
  const normalizedKeys = normalizeKeys(keys || []);

  if (normalizedKeys.length) {
    const sumFn = (a: number, b: Record<string, unknown>) => a + aggregate(b, normalizedKeys, joinOperation);
    return (values as Record<string, unknown>[]).reduce(sumFn, 0);
  }

  const sumFn: (a: number, b: number) => number = (a: number, b: number) => a + b;
  return (values as number[]).reduce(sumFn, 0);
};

// 求平均值

const avg = (
  values: number[] | Record<string, unknown>[],
  keys?: string | string[],
  joinOperation?: AggregationTypes,
) => {
  return sum(values, keys, joinOperation) / (values.length || 1);
};

// 求最小值
const min: AggregationFunction = (values, keys, operation) => {
  const normalizedKeys = normalizeKeys(keys || []);

  if (normalizedKeys.length) {
    return (values as Record<string, unknown>[]).reduce(
      (a, b) => Math.min(a, aggregate(b, normalizedKeys, operation)),
      Infinity,
    );
  }

  return Math.min(...(values as number[]));
};

// 求最大值
const max: AggregationFunction = (values, keys, operation) => {
  const normalizedKeys = normalizeKeys(keys || []);

  if (normalizedKeys.length) {
    return (values as Record<string, unknown>[]).reduce(
      (a, b) => Math.max(a, aggregate(b, normalizedKeys, operation)),
      -Infinity,
    );
  }

  return Math.max(...(values as number[]));
};

const applyAggregationFunction = (
  aggFn: AggregationFunction,
  values: number[] | Record<string, unknown>[],
  keys?: string | string[],
  joinOperation?: AggregationTypes,
) => {
  const normalizedKeys = normalizeKeys(keys || []);
  const elements = normalizedKeys.length <= 1 ? filterFalsyElements(values, normalizedKeys) : values;
  return aggFn(elements, keys, joinOperation);
};

/**
 * 聚合函数
 * @example
 * const values = [{ m: 1 }, { m: 2 }, { m: 3 }, { m: 4 }, { m: 5 }];
 * const avgFn = aggregationFunctions[AggregationTypes.AVG];
 * console.log(avgFn(values, "m")); // 3
 */
export const aggregationFunctions: AggregationFunctions = {
  [AggregationTypes.COUNT]: (values: any[]) => values.length,
  [AggregationTypes.MIN]: (
    values: number[] | Record<string, unknown>[],
    keys?: string | string[],
    joinOperation?: AggregationTypes,
  ) => applyAggregationFunction(min, values, keys, joinOperation),
  [AggregationTypes.MAX]: (
    values: number[] | Record<string, unknown>[],
    keys?: string | string[],
    joinOperation?: AggregationTypes,
  ) => applyAggregationFunction(max, values, keys, joinOperation),
  [AggregationTypes.SUM]: (
    values: number[] | Record<string, unknown>[],
    keys?: string | string[],
    joinOperation?: AggregationTypes,
  ) => applyAggregationFunction(sum, values, keys, joinOperation),
  [AggregationTypes.AVG]: (
    values: number[] | Record<string, unknown>[],
    keys?: string | string[],
    joinOperation?: AggregationTypes,
  ) => applyAggregationFunction(avg, values, keys, joinOperation),
};

function aggregate(value: Record<string, unknown>, keys: string[], operation?: AggregationTypes): number {
  if (keys.length === 1) {
    return value[keys[0]] as number;
  }

  if (!operation) {
    throw new Error(`${operation} isn't a valid`);
  }

  const aggregationFn = aggregationFunctions[operation];

  if (!aggregationFn) {
    throw new Error(`${operation} isn't a valid aggregation function`);
  }

  return aggregationFn(keys.map((column) => value[column] as number));
}

function filterFalsyElements(values: any[], keys: string[]) {
  const filterFn = (value: any) => value !== null && value !== undefined;

  if (!keys.length) {
    return values.filter(filterFn);
  }

  return values.filter((v) => filterFn(v[keys[0]]));
}

function normalizeKeys(keys: string | string[]) {
  return Array.isArray(keys) ? keys : [keys];
}
