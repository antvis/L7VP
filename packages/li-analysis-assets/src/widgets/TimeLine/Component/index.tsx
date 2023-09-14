import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
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
import type { FilterNode } from './types';

export interface TimeLineControlType extends ImplementWidgetProps, Properties {}

const TimeLineControl: React.FC<TimeLineControlType> = (props) => {
  const { datasetId = '', dateField = '', dateGranularity = '' } = props;
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
      children: filter.children.filter(
        (item) => item.field !== dateField && item.type !== 'date' && item.operator !== 'BETWEEN',
      ),
    };
    return filterList;
  }, [filter, dateField]);

  // 获取数据源
  const [dataset] = useDataset(datasetId, { filter: dataSetFilter });

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
  const filterNode = filter?.children?.find(
    (item): item is FilterNode => item.field === dateField && item.type === fieldType && item.operator === 'BETWEEN',
  );
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
    if (filterNode?.id) {
      runUpdateFilterNode(filterNode?.id, { value });
      return;
    }

    // 添加筛选
    const _filterNode: FilterNode = {
      id: getUniqueId(),
      type: fieldType as 'date',
      field: dateField,
      operator: 'BETWEEN',
      value,
    };

    addFilterNode(_filterNode);
  };

  // 删除筛选条件
  const delFilterNode = () => {
    if (filterNode?.id) {
      removeFilterNode(filterNode?.id);
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
