import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { FilterNode, ImplementWidgetProps } from '@antv/li-sdk';
import { getUniqueId, isLocalOrRemoteDataset, useDataset, useDatasetFilter } from '@antv/li-sdk';
import { useThrottleFn } from 'ahooks';
import { Tooltip } from 'antd';
import classNames from 'classnames';
import { isEmpty } from 'lodash-es';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Properties } from '../registerForm';
import { CLS_PREFIX, EMPTY_DATASET_FILTER, TimeAxisSvg as TimeLineSvg } from './constants';
import useStyle from './style';
import TimeLinePanel from './TimeLinePanel';
import type { TimeLineFilter } from './types';

const isTimeLineFilter = (item: FilterNode, dateField: string, widgetId: string) => {
  return (
    item.field === dateField && item.type === 'date' && item.operator === 'BETWEEN' && item?.params?.owner === widgetId
  );
};

export interface TimeLineControlType extends ImplementWidgetProps, Properties {}

const TimeLineControl: React.FC<TimeLineControlType> = (props) => {
  const { 'data-widget-id': dataWidgetId, datasetId = '', dateField = '', dateGranularity = '' } = props;

  const styles = useStyle();
  const [open, setOpenPopover] = useState(true);

  const [filter, { addFilterNode, updateFilterNode, removeFilterNode }] = useDatasetFilter(datasetId);
  const { run: runUpdateFilterNode } = useThrottleFn(updateFilterNode, { wait: 100 });
  const previousFilterRef = useRef<{
    filterNodeId: string;
    datasetId: string;
    removeFilterNode: (filterId: string) => void;
  } | null>(null);

  const dataSetFilter = useMemo(() => {
    if (isEmpty(filter) || isEmpty(dateField)) {
      return EMPTY_DATASET_FILTER;
    }

    const filterList = {
      ...filter,
      children: filter.children.filter((item) => !isTimeLineFilter(item, dateField, dataWidgetId)),
    };
    return filterList;
  }, [filter, dateField, dataWidgetId]);

  // 获取数据源
  const [dataset] = useDataset(datasetId, { filter: dataSetFilter });
  const dateFilterNodeRef = useRef(null);

  // 数据源和数据字段配置发生更新时，如果有配置筛选条件，需要清空筛选条件
  useEffect(() => {
    if (!previousFilterRef.current) return;
    const { filterNodeId, datasetId: _datasetId, removeFilterNode: _removeFilterNode } = previousFilterRef.current;
    // 数据字段配置发生更新时，如果有配置筛选条件，需要清空筛选条件
    if (_datasetId === datasetId) {
      removeFilterNode(filterNodeId);
    } else {
      _removeFilterNode?.(filterNodeId);
    }

    previousFilterRef.current = null;
  }, [datasetId, dateField]);

  if (
    isEmpty(datasetId) ||
    isEmpty(dateField) ||
    isEmpty(dataset) ||
    !isLocalOrRemoteDataset(dataset) ||
    isEmpty(dataset.data) ||
    isEmpty(dateGranularity)
  ) {
    return null;
  }

  const fieldType = dataset.columns.find((item: Record<string, any>) => item.name === dateField)?.type;
  const filterNode = filter?.children?.find((item): item is TimeLineFilter =>
    isTimeLineFilter(item, dateField, dataWidgetId),
  );

  if (filterNode?.id) {
    dateFilterNodeRef.current = filterNode.id;
  }

  const selectedRange = filterNode?.value;
  const isTimeXField = fieldType === 'date';

  if (filterNode?.id) {
    previousFilterRef.current = {
      filterNodeId: filterNode.id,
      datasetId,
      removeFilterNode,
    };
  }

  const onFilterNodeChange = (value: Selection | any) => {
    // 更新筛选
    if (dateFilterNodeRef.current) {
      runUpdateFilterNode(dateFilterNodeRef.current, { value });
      return;
    }

    dateFilterNodeRef.current = getUniqueId();
    // 添加筛选
    const _filterNode: TimeLineFilter = {
      id: dateFilterNodeRef.current,
      type: fieldType as 'date',
      field: dateField,
      operator: 'BETWEEN',
      granularity: 'second',
      params: { owner: dataWidgetId },
      value,
    };

    addFilterNode(_filterNode);
  };

  // 删除筛选条件
  const delFilterNode = () => {
    if (dateFilterNodeRef.current) {
      removeFilterNode(dateFilterNodeRef.current);
      dateFilterNodeRef.current = null;
    }
  };

  const isOpenTimeLinePanel = () => {
    setOpenPopover((isOpen) => !isOpen);
  };

  return (
    <>
      {!open && (
        <CustomControl position="bottomright" className={CLS_PREFIX}>
          <Tooltip placement="leftBottom" title="显示时间轴">
            <div
              className={classNames(
                `${CLS_PREFIX}__time-axis-btn`,
                styles.timeAxisBtn,
                selectedRange ? styles.timeAxisBtnActive : styles.timeAxisBtnDefault,
              )}
              onClick={isOpenTimeLinePanel}
            >
              <Icon component={TimeLineSvg} />
            </div>
          </Tooltip>
        </CustomControl>
      )}

      {open && (
        <TimeLinePanel
          field={dateField}
          dateGranularity={dateGranularity}
          onClose={isOpenTimeLinePanel}
          data={dataset.data}
          defaultSelection={selectedRange}
          isTimeXField={isTimeXField}
          onChangeTimeRange={onFilterNodeChange}
          onClear={delFilterNode}
        />
      )}
    </>
  );
};

export default TimeLineControl;
