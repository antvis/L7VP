import type { ImplementWidgetProps, LocalOrRemoteDataset } from '@antv/li-sdk';
import { useDataset } from '@antv/li-sdk';
import type { PivotSheet } from '@antv/s2';
import type { SheetComponentOptions } from '@antv/s2-react';
import { SheetComponent } from '@antv/s2-react';
import { useSize } from 'ahooks';
import classNames from 'classnames';
import { mapValues } from 'lodash-es';
import React, { useEffect, useMemo, useRef } from 'react';
import { CLS_PREFIX } from '../constant';
import type { Properties } from '../registerForm';
import { getThemeCfg } from './helper';
import useStyle from './style';

const DefaultSize = {
  width: 360,
  height: 260,
};

export interface MiniChartProps extends ImplementWidgetProps, Properties {}

const SpreadSheetTable: React.FC<MiniChartProps> = ({
  'data-widget-name': dataWidgetName,
  datasetId = '',
  rowHeader = [],
  colHeader = [],
  numberValue = [],
  valueInCols = 'col',
  sheetType = 'table',
  theme = 'dark',
  showSeriesNumber = false,
  layoutWidthType = 'colAdaptive',
  tableWidth = DefaultSize.width,
  tableHeight = DefaultSize.height,
  adaptive = true,
  frozenCol = false,
  showPagination = false,
}) => {
  // 获取数据源
  const [dataset] = useDataset<LocalOrRemoteDataset>(datasetId);
  const styles = useStyle();
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<PivotSheet>();
  const { data: tableData = [], columns: tableColumns = [] } = dataset || {};
  const size = useSize(containerRef);

  const columns = tableColumns.map((item) => ({ ...item, field: item.name }));

  const data = tableData.map((item: Record<any, string>) => {
    return mapValues(item, (value) => {
      if (typeof value !== 'object') {
        return value;
      }
      return JSON.stringify(value);
    });
  });

  const dataConfig = useMemo(() => {
    let fields = {};
    if (sheetType === 'table') {
      fields = {
        columns: [...rowHeader, ...colHeader, ...numberValue],
      };
    } else {
      fields = {
        rows: rowHeader,
        columns: colHeader,
        values: numberValue,
        valueInCols: valueInCols && valueInCols === 'col',
      };
    }

    return {
      fields,
      meta: columns,
      data,
    };
  }, [tableData, colHeader, data]);

  const s2Options = useMemo(() => {
    const _config = {
      showSeriesNumber,
      frozenColCount: !frozenCol ? 0 : showSeriesNumber ? 2 : 1, // 冻结首列
      style: {
        layoutWidthType,
      },
      pagination: showPagination && {
        pageSize: 10,
        current: 1,
      },

      tooltip: {
        showTooltip: true,
        col: {
          content: null,
        },
        data: {
          showTooltip: false,
        },
        getContainer: () => containerRef.current,
      },
    };

    return _config;
  }, [showSeriesNumber, layoutWidthType, showPagination]);

  useEffect(() => {
    if (tableRef.current && size) {
      tableRef.current.changeSheetSize(size?.width, size?.height);
      tableRef.current.render(false);
    }
  }, [size]);

  if (!dataset) {
    return;
  }

  return (
    <div
      style={adaptive ? {} : { maxWidth: tableWidth, width: tableWidth, maxHeight: tableHeight, height: tableHeight }}
      className={classNames(CLS_PREFIX, styles.spreadSheet)}
    >
      <p className={(classNames(`${CLS_PREFIX}__title`), styles.spreadSheetTitle)}>{dataWidgetName}</p>
      <div ref={containerRef} className={classNames(styles.spreadSheetContent)}>
        <SheetComponent
          ref={tableRef}
          sheetType={sheetType === 'table' ? 'table' : undefined}
          options={s2Options as SheetComponentOptions}
          dataCfg={dataConfig}
          themeCfg={{
            theme: getThemeCfg(theme),
          }}
          adaptive={false}
          showPagination={showPagination}
        />
      </div>
    </div>
  );
};

export default SpreadSheetTable;
