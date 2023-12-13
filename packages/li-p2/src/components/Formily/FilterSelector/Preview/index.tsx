import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';
import cls from 'classnames';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
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
  const prefixCls = usePrefixCls('formily-filter-selector-preview');
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
        const time =
          item.params.type === 'date'
            ? dayjs(item.value?.[0]).format(item.params.format)
            : `${dayjs(item.value?.[0]).format(item.params.format)} 至 ${dayjs(item.value?.[1]).format(
                item.params.format,
              )}`;

        return {
          key: index,
          label: item.field,
          children: time as string,
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
