import type { DatasetField, LocalOrRemoteDataset } from '@antv/li-sdk';
import { isNumber, isString } from 'lodash-es';
import type { AggregationMethodType } from '../constants';

const sortItem = ({
  start,
  end,
  sortType,
  orderBy,
}: {
  start: any;
  end: any;
  sortType: DatasetField['type'];
  orderBy: 'ASC' | 'DESC';
}) => {
  switch (sortType) {
    case 'number':
      return orderBy === 'ASC' ? Number(start) - Number(end) : Number(end) - Number(start);
    case 'string':
      return orderBy === 'ASC' ? start.localeCompare(end, 'zh-CN') : end.localeCompare(start, 'zh-CN');
    default:
      return 0;
  }
};

// 排序
export const getSortData = ({
  dataset,
  xField,
  yField,
  sortBy = 'default',
  orderBy = 'ASC',
}: {
  dataset: LocalOrRemoteDataset;
  xField?: string;
  yField?: string;
  sortBy: 'default' | 'x' | 'y';
  orderBy: 'ASC' | 'DESC';
}) => {
  let sortField: DatasetField | undefined;
  if (sortBy === 'x' && xField) {
    sortField = dataset.columns.find((item: DatasetField) => item.name === xField);
  } else if (sortBy === 'y' && yField) {
    sortField = dataset.columns.find((item: DatasetField) => item.name === yField);
  }

  const dataList: Record<string, any>[] = dataset.data.slice();

  if (sortField && ['number', 'string'].includes(sortField.type)) {
    return dataList.sort((a, b) => {
      return sortItem({ start: a[sortField!.name], end: b[sortField!.name], sortType: sortField!.type, orderBy });
    });
  } else {
    return orderBy === 'ASC' ? dataList : dataList.reverse();
  }
};

// 统计统计字段数据
export const dataFormatProcessing = ({
  dataset,
  xField,
  yField,
}: {
  dataset: Record<string, any>[];
  xField: string;
  yField: string;
}) => {
  const result: Record<string, any> = {};

  for (let i = 0; i < dataset.length; i++) {
    const item = dataset[i];

    // 判断 xField 值存在 ,yField 值合法
    const isXValid = (isString(item[`${xField}`]) && item[`${xField}`] !== '') || isNumber(item[`${xField}`]);
    const isYValid = isNumber(item[`${yField}`]);
    if (!isXValid || !isYValid) {
      continue;
    }

    if (result[item[`${xField}`]]) {
      result[item[`${xField}`]] = [...result[item[`${xField}`]], item[`${yField}`]];
    } else {
      result[item[`${xField}`]] = [item[`${yField}`]];
    }
  }

  return Object.keys(result).map((key) => ({
    [`${xField}`]: key,
    [`${yField}`]: result[key],
  }));
};

// 统计字段计算
export const dataToFormat = ({
  dataSource,
  aggregationMethod = 'sum',
  xAxis,
  yAxis,
}: {
  dataSource: Record<string, any>[];
  aggregationMethod: AggregationMethodType;
  xAxis: string;
  yAxis: string;
}) => {
  switch (aggregationMethod) {
    case 'sum':
      return dataSource.map((item: Record<string, any>) => {
        return {
          ...item,

          [`${yAxis}`]: item[`${yAxis}`].reduce((old: number, nex: number) => {
            return old + nex;
          }, 0),
        };
      });
    case 'avel':
      return dataSource.map((item: Record<string, any>) => {
        return {
          ...item,
          [`${yAxis}`]:
            item[`${yAxis}`].reduce((old: number, nex: number) => {
              return old + nex;
            }, 0) / item[`${yAxis}`].length,
        };
      });
    case 'max':
      return dataSource.map((item: Record<string, any>) => {
        return {
          ...item,
          [`${yAxis}`]: Math.max.apply(null, item[`${yAxis}`]),
        };
      });
    case 'min':
      return dataSource.map((item: Record<string, any>) => {
        return {
          ...item,
          [`${yAxis}`]: Math.min.apply(null, item[`${yAxis}`]),
        };
      });
    case 'count':
    default:
      return dataSource.map((item: Record<string, any>) => {
        return {
          ...item,
          [`${yAxis}`]: item[`${yAxis}`].length,
        };
      });
  }
};
