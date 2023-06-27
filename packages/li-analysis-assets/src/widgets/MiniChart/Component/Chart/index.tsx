import classNames from 'classnames';
import React from 'react';
import { CLS_PREFIX } from '../../constant';
import IntervalLine from './IntervalLine';
import Pie from './Pie';
import useStyle from './style';
import type { ChartType } from './type';

type ChartProps = {
  className?: string;
  width: number;
  height: number;
  adaptive: boolean;
  name: string;
  data: Record<string, any>[];
  type: ChartType;
  xField?: string;
  yField?: string;
  colorField?: string;
  angleField?: string;
  showLegend: boolean;
  isCount: boolean;
};

const Chart = ({
  className,
  height,
  width,
  adaptive,
  name,
  data = [],
  type,
  xField,
  yField,
  colorField,
  angleField,
  showLegend,
  isCount,
}: ChartProps) => {
  const styles = useStyle();

  const containerStyle = adaptive
    ? {}
    : {
        width,
        maxWidth: width,
        height,
        maxHeight: height,
      };

  switch (type) {
    case 'line':
    case 'column':
      return (
        <>
          {xField && yField && (
            <div style={containerStyle} className={classNames(styles.miniChart, className, CLS_PREFIX)}>
              <p className={classNames(`${CLS_PREFIX}__title`, styles.miniChartTitle)}>{name}</p>
              <IntervalLine
                className={classNames(`${CLS_PREFIX}__plot`, styles.miniChartPlot)}
                data={data}
                xField={xField}
                yField={yField}
                showLegend={showLegend}
                isCount={isCount}
                type={type === 'column' ? 'interval' : type}
                width={width}
                height={height}
              />
            </div>
          )}
        </>
      );
    case 'pie':
      return (
        <>
          {colorField && angleField && (
            <div style={containerStyle} className={classNames(styles.miniChart, className, CLS_PREFIX)}>
              <p className={classNames(`${CLS_PREFIX}__title`, styles.miniChartTitle)}>{name}</p>
              <Pie
                className={classNames(`${CLS_PREFIX}__plot`, styles.miniChartPlot)}
                data={data}
                angleField={angleField}
                colorField={colorField}
                showLegend={showLegend}
                isCount={isCount}
                width={width}
                height={height}
              />
            </div>
          )}
        </>
      );
    default:
      return null;
  }
};

export default Chart;
