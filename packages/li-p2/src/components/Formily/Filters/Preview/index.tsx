import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { isEmpty } from 'lodash-es';
import { isTimeInterval } from '../EditModal/EditContent/DateItem/helper';
import type { FilterNodeItem } from '../type';
import useStyle from './style';

export interface PreviewProps {
  /**
   * 筛选数组
   */
  filters: FilterNodeItem[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-preview');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { filters = [] } = props;

  const list: { field: string; value: string }[] = useMemo(() => {
    if (!filters.length) {
      return [];
    }

    const _options = filters.map((item) => {
      if (isEmpty(item.value)) {
        return {
          field: item.field,
          value: '不限',
        };
      }

      if (item.type === 'date') {
        const { isInterval, time } = isTimeInterval(item.value as [string, string], item.params.format);

        return {
          field: item.field,
          value: (isInterval ? `${time?.[0]} 至 ${time?.[1]}` : time) as string,
        };
      }

      if (item.type === 'number') {
        if (item.operator === 'BETWEEN') {
          return {
            field: item.field,
            value: `<=${item.value?.[1]} 且 >=${item.value?.[0]}`,
          };
        }
        return {
          field: item.field,
          value: `${item.operator}${item.value}`,
        };
      }

      return {
        field: item.field,
        value: `包含：${item.value.toString()}`,
      };
    });

    return _options;
  }, [filters]);

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      {list.map((item) => {
        return (
          <div>
            {item.field} : {item.value}
          </div>
        );
      })}
    </div>,
  );
};

export default Preview;
