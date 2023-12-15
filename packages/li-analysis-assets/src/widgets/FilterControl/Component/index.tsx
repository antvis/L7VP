import { CustomControl } from '@antv/larkmap';
import type { FilterNodeItem } from '@antv/li-p2';
import type { ImplementWidgetProps, LocalOrRemoteDataset } from '@antv/li-sdk';
import { useDataset, useDatasetFilter } from '@antv/li-sdk';
import { default as classNames, default as cls } from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { max, min } from 'lodash-es';
import type { Properties } from '../registerForm';
import DateItem from './DateItem';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

const CLS_PREFIX = 'li-filter-control';
export interface LIFilterControlProps extends Properties, ImplementWidgetProps {}

const LIFilterControl: React.FC<LIFilterControlProps> = (props) => {
  const { filters, datasetId = '', position } = props;
  const styles = useStyle();
  // 获取数据源
  const [dataset] = useDataset<LocalOrRemoteDataset>(datasetId);
  const { data: tableData = [], columns: tableColumns = [] } = dataset || {};
  const [filterList, setFilterList] = useState(filters);
  // 筛选数据
  const [_, { clearFilter, updateFilter }] = useDatasetFilter(datasetId);

  // 默认添加筛选器
  useEffect(() => {
    if (filters.length) {
      clearFilter();
      // @ts-ignore
      updateFilter({ relation: 'AND', children: filters });
      setFilterList(filters);
    } else {
      clearFilter();
    }
  }, [filters]);

  const onValueChange = (val: FilterNodeItem) => {
    const _filterList = filterList.map((item) => {
      if (item.id === val.id) {
        return val;
      }
      return item;
    });

    setFilterList(_filterList);
    // @ts-ignore
    updateFilter({ relation: 'AND', children: _filterList });
  };

  if (!filters.length) {
    return null;
  }

  return (
    <CustomControl position={position}>
      <div className={cls(CLS_PREFIX, styles.filterControl)}>
        {filterList.map((item) => {
          const itemValue = tableData.map((_item: any) => _item[item.field]) || [];
          const domain = item.type === 'number' ? [min(itemValue), max(itemValue)] : [...new Set(itemValue)];

          return (
            <div className={classNames(`${CLS_PREFIX}__filter-item`, styles.filterItem)}>
              <div className={classNames(`${CLS_PREFIX}__filter-item__title`, styles.filterItemTitle)}>
                {item.field}:
              </div>
              <div className={classNames(`${CLS_PREFIX}__filter-item__content`, styles.filterItemContent)}>
                {item.type === 'string' && (
                  <StringItem value={item} domain={domain as string[]} onChange={onValueChange} />
                )}
                {item.type === 'number' && (
                  <NumberItem value={item} domain={domain as [number, number]} onChange={onValueChange} />
                )}
                {item.type === 'date' && <DateItem value={item} onChange={onValueChange} />}
              </div>
            </div>
          );
        })}
      </div>
    </CustomControl>
  );
};

export default LIFilterControl;
