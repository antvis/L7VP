import type { ImplementWidgetProps, LocalOrRemoteDataset } from '@antv/li-sdk';
import { useDataset } from '@antv/li-sdk';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
import type { Properties } from '../register-form';
import Chart from './Chart';
import { dataFormatProcessing, dataToFormat, getSortData } from './helper';

export interface MiniChartProps extends ImplementWidgetProps, Properties {}

const DefaultSize = {
  width: 360,
  height: 260,
};

const Theme: Record<'dark' | 'light', 'classic' | 'classicDark'> = {
  dark: 'classicDark',
  light: 'classic',
};

const MiniChart: React.FC<MiniChartProps> = ({
  'data-widget-name': dataWidgetName,
  datasetId = '',
  chartType = 'line',
  showLegend = false,
  xField,
  yField,
  aggregationMethod = 'sum',
  sortBy = 'default',
  orderBy = 'ASC',
  angleField,
  colorField,
  adaptive = true,
  theme = 'dark',
  chartWidth = DefaultSize.width,
  chartHeight = DefaultSize.height,
}) => {
  // 获取数据源
  const [dataset] = useDataset<LocalOrRemoteDataset>(datasetId);

  const xAxis = chartType === 'pie' ? colorField : xField;
  const yAxis = chartType === 'pie' ? angleField : yField;

  // 数据源
  const dataSource = useMemo(() => {
    if (!dataset || !xAxis || !yAxis || isEmpty(dataset.data)) {
      return [];
    }

    return dataFormatProcessing({
      dataset: dataset.data,
      xField: xAxis,
      yField: yAxis,
    });
  }, [dataset, xAxis, yAxis]);

  // 选中统计字段数据格式化
  const dataFormat = useMemo(() => {
    if (isEmpty(dataSource) || !xAxis || !yAxis) {
      return [];
    }

    return dataToFormat({
      dataSource,
      aggregationMethod,
      xAxis,
      yAxis,
    });
  }, [dataSource, xAxis, yAxis, aggregationMethod]);

  // 折线图与柱状图排序
  const dataList = useMemo(() => {
    if (!dataset || isEmpty(dataFormat)) {
      return [];
    }
    if (chartType === 'pie') {
      return dataFormat;
    }

    return getSortData({
      dataset: { ...dataset, data: dataFormat },
      xField,
      yField,
      sortBy,
      orderBy,
    });
  }, [sortBy, orderBy, dataFormat]);

  if (isEmpty(datasetId) || isEmpty(chartType) || isEmpty(dataList) || !xAxis || !yAxis) {
    return null;
  }

  return (
    <Chart
      name={dataWidgetName}
      data={dataList}
      type={chartType}
      xField={xField}
      yField={yField}
      colorField={colorField}
      angleField={angleField}
      showLegend={showLegend}
      isCount={aggregationMethod === 'count'}
      width={chartWidth}
      height={chartHeight}
      adaptive={adaptive}
      theme={Theme[theme]}
    />
  );
};

export default MiniChart;
