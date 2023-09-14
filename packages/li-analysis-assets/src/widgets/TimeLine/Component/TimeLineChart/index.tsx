import { Chart } from '@antv/g2';
import React, { useEffect, useRef } from 'react';
import type { Selection } from '../TimeLinePanel/types';

const createPathRender = (compute: any) => {
  return (group: any, options: any, document: any) => {
    if (!group.handle) {
      const path = document.createElement('path');
      group.handle = path;
      group.appendChild(group.handle);
    }
    const { handle } = group;
    const { width, height, ...rest } = options;
    if (width === undefined || height === undefined) return handle;
    handle.attr({ ...compute(width, height), ...rest });
    return handle;
  };
};

export type TimeLineChartProps = {
  className?: string;
  data: Record<string, any>[];
  xField: string;
  yField?: string;
  // x 轴是否为时间字段类型
  isTimeXField?: boolean;
  // 用于同步图表高亮选择区域
  selection?: Selection;
  // 图表选中高亮事事件
  onSelection: (start: string, end: string) => void;
  // 图表取消高亮事件
  onReset: () => void;
};

export const TimeLineChart = (props: TimeLineChartProps) => {
  const { className, data = [], xField, yField, isTimeXField = true, selection, onSelection, onReset } = props;
  const chartRef = useRef<Chart>();
  const containerRef = useRef<HTMLDivElement>(null);

  const syncBrush = (_selection?: Selection) => {
    if (!chartRef.current || !_selection || !_selection[0] || !_selection[1]) return;

    if (_selection[0] === _selection[1] || (_selection[0] === -Infinity && _selection[1] === Infinity)) {
      chartRef.current?.emit('brush:remove');
    } else {
      chartRef.current?.emit('brush:highlight', {
        data: {
          selection: [[..._selection], [-Infinity, Infinity]],
        },
      });
    }
  };

  useEffect(() => {
    const onRendered = () => {
      syncBrush(selection);
    };

    if (!chartRef.current) {
      const chart = new Chart({
        container: containerRef.current!,
        theme: 'classicDark',
        autoFit: true,
        style: { viewFill: 'transparent' },
      });

      const commConfig = {
        type: 'interval',
        data: data,
        axis: { x: { labelAutoHide: true, title: false }, y: false },
        state: { inactive: { fill: 'rgb(105 116 131)' } },
        animate: false,
        interaction: {
          brushXHighlight: {
            maskOpacity: 0.3,
            maskFill: '#777',
            maskHandleWRender: createPathRender((width: number, height: number) => ({
              d: 'M-0.5,31.5c-2.5,0,-4.5,2,-4.5,4.5v30c0,2.5,2,4.5,4.5,4.5V31.5z',
              transform: `translate(${width / 2}, -5)`,
            })),
            maskHandleERender: createPathRender((width: number, height: number) => ({
              d: 'M0.5,31.5c2.5,0,4.5,2,4.5,4.5v30c0,2.5,-2,4.5,-4.5,4.5V31.5z',
              transform: `translate(${width / 2}, -5)`,
            })),
            maskHandleEFill: '#D3D8E0',
            maskHandleWFill: '#D3D8E0',
          },
        },
      };

      // yField 求均值统计
      if (yField) {
        chart.options({
          type: 'view',
          children: [
            {
              ...commConfig,
              transform: [{ type: 'groupX', y: 'mean' }],
              encode: { x: xField, y: yField },
            },
          ],
        });
      } else {
        // 分箱求和统计
        chart.options({
          type: 'view',
          children: [
            {
              ...commConfig,
              transform: [{ type: 'groupX', y: 'count' }],
              encode: { x: xField },
            },
          ],
        });
      }

      chartRef.current = chart;
      chartRef.current.render().then(() => onRendered());

      return;
    }

    if (yField) {
      chartRef.current?.options({
        type: 'view',
        children: [{ data: data, encode: { x: xField, y: yField } }],
      });
    } else {
      chartRef.current?.options({
        type: 'view',
        children: [{ data: data, encode: { x: xField } }],
      });
    }
    chartRef.current?.render().then(() => onRendered());
  }, [data, xField, yField]);

  // 同步更新高亮滑块
  useEffect(() => {
    // TODO: _rendering 状态可能有问题
    //@ts-ignore
    if (!chartRef.current?._rendering) {
      syncBrush(selection);
    }
  }, [selection]);

  // 绑定事件
  useEffect(() => {
    if (!chartRef.current) {
      return () => null;
    }
    const onHighlight = (e: any) => {
      const { nativeEvent, data } = e;
      if (!nativeEvent) return;
      const [selectionX] = data.selection;
      const start = selectionX[0];
      const end = selectionX[selectionX.length - 1];
      // 选择的区间没有变化
      if (start === selection?.[0] && end === selection?.[1]) return;
      onSelection(start, end);
    };
    const onBrushRemove = (e: any) => {
      if (!e?.nativeEvent) return;
      onReset();
    };

    chartRef.current.on('brush:highlight', onHighlight);
    chartRef.current.on('brush:remove', onBrushRemove);

    return () => {
      if (chartRef.current) {
        chartRef.current.off('brush:highlight', onHighlight);
        chartRef.current.off('brush:remove', onBrushRemove);
      }
    };
  }, [onSelection, onReset]);

  useEffect(() => {
    // 组件销毁时销毁图表
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = undefined;
      }
    };
  }, []);

  return <div className={className} ref={containerRef} />;
};
