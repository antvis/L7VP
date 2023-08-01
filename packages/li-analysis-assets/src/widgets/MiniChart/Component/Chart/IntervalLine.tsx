import { Chart } from '@antv/g2';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useRef } from 'react';
import { formatNumber, getChartTheme, numberFormatThousandsSeparator } from './helper';

type Props = {
  className?: string;
  width: number;
  height: number;
  theme: 'classic' | 'classicDark';
  data: Record<string, any>[];
  xField: string;
  yField: string;
  showLegend: boolean;
  isCount: boolean;
  type?: 'line' | 'interval';
};

const IntervalLine = ({
  className,
  height,
  width,
  data = [],
  theme = 'classicDark',
  xField,
  yField,
  showLegend = false,
  isCount,
  type = 'interval',
}: Props) => {
  const plotRef = useRef<Chart>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isNumberXField = !isEmpty(data) && typeof data[0][xField] === 'number';
    const isInterval = type === 'interval';

    const commConfig = {
      type,
      data: data,
      encode: { x: xField, y: yField },
      axis: {
        x: {
          labelAutoHide: true,
          title: false,
          labelFormatter: (datum: number) => (isNumberXField ? numberFormatThousandsSeparator(datum) : datum),
        },
        y: {
          title: false,
          labelAutoHide: true,
          labelAutoEllipsis: true,
          labelAutoRotate: true,
          labelFormatter: (datum: number) => formatNumber(datum),
        },
      },
      tooltip: {
        items: [
          {
            channel: 'y',
            name: isCount ? '数量' : yField,
            valueFormatter: (d: number) => formatNumber(d),
          },
        ],
      },
      slider: isNumberXField && {
        x: {
          values: [0, 1],
          label: false,
          handleLabelFontSize: 0,
          handleIconFill: '#39f',
          trackFill: '#39f',
        },
      },
      legend: showLegend,
    };

    if (!plotRef.current) {
      const chart = new Chart({
        container: containerRef.current!,
        autoFit: true,
        padding: 'auto',
        paddingTop: 20,
        paddingBottom: 30,
      });

      const themeCfg = getChartTheme(theme) as Record<string, any>;
      chart.theme(themeCfg);

      chart.options({
        type: 'view',
        children: [
          {
            animate: false,
            interaction: isInterval
              ? { elementHighlight: { background: true } }
              : { tooltip: { crosshairsStroke: '#6ba1e6' } },
            ...commConfig,
          },
        ],
      });

      plotRef.current = chart;
      plotRef.current.render();
      return;
    }

    plotRef.current?.options({
      type: 'view',
      children: [{ ...commConfig }],
    });
    plotRef.current?.render();
  }, [data, xField, yField, showLegend, type, isCount]);

  useEffect(() => {
    if (theme && plotRef.current) {
      const themeCfg = getChartTheme(theme) as Record<string, any>;
      plotRef.current.theme(themeCfg);

      plotRef.current.render();
    }
  }, [theme]);

  useEffect(() => {
    if (height && width && plotRef.current) {
      plotRef.current.forceFit();
    }
  }, [height, width]);

  useEffect(() => {
    // 组件销毁时销毁图表
    return () => {
      if (plotRef.current) {
        plotRef.current.destroy();
        plotRef.current = undefined;
      }
    };
  }, []);

  return <div className={classNames(className)} ref={containerRef} />;
};

export default IntervalLine;
