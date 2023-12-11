import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import cls from 'classnames';
import React, { useMemo } from 'react';
import { isEmpty } from 'lodash-es';
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';
import { isTimeInterval } from '../EditModal/EditContent/DateItem/helper';
import type { FilterNodeItem, OptionType } from '../type';
import useStyle from './style';

export interface PreviewProps {
  /**
   * 筛选数组
   */
  filters: FilterNodeItem[];
  /**
   * 筛选字段
   */
  options: OptionType[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-preview');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { filters = [], options = [] } = props;

  const items: DescriptionsProps['items'] = useMemo(() => {
    if (!filters.length) {
      return [];
    }

    const _options = filters.map((item, index) => {
      if (isEmpty(item.value)) {
        return {
          key: index,
          label: item.field,
          children: '不限',
        };
      }

      if (item.type === 'date') {
        const { isInterval, time } = isTimeInterval(item.value as [string, string], item.params.format);

        return {
          key: index,
          label: item.field,
          children: (isInterval ? `${time?.[0]} 至 ${time?.[1]}` : time) as string,
        };
      }

      if (item.type === 'number') {
        if (item.operator === 'BETWEEN') {
          return {
            key: index,
            label: item.field,
            children: `<=${item.value?.[1]} 且 >=${item.value?.[0]}`,
          };
        }
        return {
          key: index,
          label: item.field,
          children: `${item.operator}${item.value}`,
        };
      }

      const _domain = options.find((_item) => _item.value === item.field)?.domain;

      return {
        key: index,
        label: item.field,
        children: _domain?.length === item.value.length ? '全部' : `包含${item.value.toString()}`,
      };
    });

    return _options;
  }, [filters]);

  if (!filters.length) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <Descriptions items={items} column={1} />
    </div>,
  );
};

export default Preview;
