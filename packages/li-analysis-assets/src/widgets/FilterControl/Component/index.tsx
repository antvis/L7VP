import { CustomControl } from '@antv/larkmap';
import type { FilterConfigType } from '@antv/li-p2';
import type { ImplementWidgetProps, LocalOrRemoteDataset } from '@antv/li-sdk';
import { useDataset, useDatasetFilter } from '@antv/li-sdk';
import { useMount, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import type { Properties } from '../registerForm';
import DateItem from './DateItem';
import { getFilterNode, getFilterNodes } from './helper';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

const CLS_PREFIX = 'li-filter-control';
export interface LIFilterControlProps extends Properties, ImplementWidgetProps {}

const LIFilterControl: React.FC<LIFilterControlProps> = (props) => {
  const { defaultFilters, datasetId = '', position } = props;
  const styles = useStyle();
  const [filterList, setFilterList] = useState(defaultFilters);
  const [filter, { addFilterNode, updateFilterNode }] = useDatasetFilter(datasetId);
  // 排除自生产筛选条件
  const oimtSelfFilter = useMemo(() => {
    const filterIds = defaultFilters.map((item) => item.id);
    const children = filter?.children.filter((item) => !filterIds.includes(item.id)) || [];
    return { relation: 'AND' as const, children };
  }, []);
  const [dataset] = useDataset<LocalOrRemoteDataset>(datasetId, {
    filter: oimtSelfFilter,
  });
  const { data: tableData = [] } = dataset || {};

  // 首次挂载
  // TODO: 添加 FilterNode 需要在「初始化」消费数据过滤条件前执行，避免「初始化」多次消费数据过滤条件
  useMount(() => {
    const filterNodes = getFilterNodes(defaultFilters);
    filterNodes.forEach((item) => {
      addFilterNode(item);
    });
  });

  // TODO: 支持同步更新（在事件订阅之前）
  // const firstMountRef = useRef(false);
  // if (!firstMountRef.current) {
  //   const filterNodes = getFilterNodes(defaultFilters);
  //   filterNodes.forEach((item) => {
  //     addFilterNode(item);
  //   });
  //   firstMountRef.current = true;
  // }

  // 配置初始筛选条件变更，配置态运行
  useUpdateEffect(() => {
    const filterIds = filterList.map((item) => item.id);
    const filterNodes = getFilterNodes(defaultFilters);

    filterNodes.forEach((item) => {
      // 筛选条件已经存在进行更新 updateFilterNode，不存在添加 addFilterNode
      if (filterIds.includes(item.id)) {
        updateFilterNode(item.id, item);
      } else {
        addFilterNode(item);
      }
    });
    setFilterList(defaultFilters);
  }, [defaultFilters]);

  const onValueChange = (val: FilterConfigType) => {
    const updateNode = getFilterNode(val);
    updateFilterNode(val.id, updateNode);
  };

  if (!defaultFilters.length) {
    return null;
  }

  return (
    <CustomControl position={position}>
      <div className={classNames(CLS_PREFIX, styles.filterControl)}>
        {filterList.map((item) => {
          return (
            <div key={item.id} className={classNames(`${CLS_PREFIX}__filter-item`, styles.filterItem)}>
              <div className={classNames(`${CLS_PREFIX}__filter-item__title`, styles.filterItemTitle)}>
                {item.title}:
              </div>
              <div className={classNames(`${CLS_PREFIX}__filter-item__content`, styles.filterItemContent)}>
                {item.type === 'string' && (
                  <StringItem defaluValue={item} field={item.field} data={tableData} onChange={onValueChange} />
                )}
                {item.type === 'number' && <NumberItem defaluValue={item} onChange={onValueChange} />}
                {item.type === 'date' && <DateItem defaultValue={item} onChange={onValueChange} />}
              </div>
            </div>
          );
        })}
      </div>
    </CustomControl>
  );
};

export default LIFilterControl;
