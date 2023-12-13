import { CustomControl } from '@antv/larkmap';
import type { FilterNodeItem } from '@antv/li-p2';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useDatasetFilter } from '@antv/li-sdk';
import { default as classNames, default as cls } from 'classnames';
import React, { useEffect, useState } from 'react';
import type { Properties } from '../registerForm';
import DateItem from './DateItem';
import NumberItem from './NumberItem';
import StringItem from './StringItem';
import useStyle from './style';

const CLS_PREFIX = 'li-filter-control';
export interface LIFilterControlProps extends Properties, ImplementWidgetProps {}

const LIFilterControl: React.FC<LIFilterControlProps> = (props) => {
  const { filters, datasetId } = props;
  const styles = useStyle();
  const [filterList, setFilterList] = useState(filters);
  // 筛选数据
  const [_, { clearFilter, updateFilter }] = useDatasetFilter(datasetId);

  // 默认添加筛选器
  useEffect(() => {
    if (filters.length) {
      clearFilter();
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
    updateFilter({ relation: 'AND', children: _filterList });

    setFilterList(_filterList);
  };

  if (!filters.length) {
    return;
  }

  return (
    <CustomControl position="topleft">
      <div className={cls(CLS_PREFIX, styles.filterControl)}>
        {filterList.map((item) => {
          return (
            <div className={classNames(`${CLS_PREFIX}__filter-item`, styles.filterItem)}>
              <div className={classNames(`${CLS_PREFIX}__filter-item__title`, styles.filterItemTitle)}>
                {item.field}:
              </div>
              <div className={classNames(`${CLS_PREFIX}__filter-item__content`, styles.filterItemContent)}>
                {item.type === 'string' && <StringItem value={item} onChange={onValueChange} />}
                {item.type === 'number' && <NumberItem value={item} onChange={onValueChange} />}
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
