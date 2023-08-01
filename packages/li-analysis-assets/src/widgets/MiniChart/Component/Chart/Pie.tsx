import { Chart } from '@antv/g2';
import classNames from 'classnames';
import React, { useEffect, useRef } from 'react';
import { formatNumber, getChartTheme } from './helper';

type PieProps = {
  className?: string;
  width: number;
  height: number;
  data: Record<string, any>[];
  angleField: string;
  colorField: string;
  showLegend: boolean;
  isCount: boolean;
  theme: 'classic' | 'classicDark';
};

const Pie = ({ className, theme, height, width, data = [], angleField, colorField, showLegend, isCount }: PieProps) => {
  const plotRef = useRef<Chart>();
  const containerRef = useRef<HTMLDivElement | any>();

  useEffect(() => {
    const commConfig = {
      data: data,
      encode: { y: angleField, color: colorField },
      tooltip: {
        title: colorField,
        items: [
          {
            channel: 'y',
            name: isCount ? '数量' : angleField,
            valueFormatter: (d: number) => formatNumber(d),
          },
        ],
      },
      legend: showLegend,
      labels: [
        {
          text: (d: Record<string, number>) => {
            return `${d[colorField]}: ${formatNumber(d[angleField])}`;
          },
          position: 'outside',
          style: { fontSize: 9 },
          transform: [{ type: 'overlapHide' }],
        },
      ],
    };

    const themeCfg = getChartTheme(theme) as Record<string, any>;

    if (!plotRef.current) {
      const chart = new Chart({
        container: containerRef.current!,
        autoFit: true,
        style: { lineWidth: 2 },
        padding: 30,
      });

      chart.theme(themeCfg);

      chart.options({
        type: 'view',
        children: [
          {
            type: 'interval',
            coordinate: { type: 'theta' },
            transform: [{ type: 'stackY' }],
            animate: { enter: { type: 'waveIn' } },
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

    plotRef.current?.theme(themeCfg);
    plotRef.current?.render();
  }, [data, angleField, colorField, showLegend, isCount, theme]);

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

export default Pie;
