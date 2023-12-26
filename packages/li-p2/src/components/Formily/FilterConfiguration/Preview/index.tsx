import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { DescriptionsProps } from 'antd';
import { Descriptions } from 'antd';
import cls from 'classnames';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import React, { useMemo } from 'react';
import type { FilterConfigType } from '../type';
import useStyle from './style';

export interface PreviewProps {
  /**
   * 筛选数组
   */
  filters: FilterConfigType[];
}

const Preview: React.FC<PreviewProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filter-setting-preview');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { filters = [] } = props;

  const items: DescriptionsProps['items'] = useMemo(() => {
    if (!filters.length) {
      return [];
    }

    const _options = filters.map((item, index) => {
      // 时间类型
      if (item.type === 'date') {
        if (isEmpty(item.value)) {
          return {
            key: index,
            label: item.title,
            children: '不限',
          };
        }

        const time =
          item.params.dateType === 'date'
            ? dayjs(item.value?.[0]).format(item.params.format)
            : `${dayjs(item.value?.[0]).format(item.params.format)} 至 ${dayjs(item.value?.[1]).format(
                item.params.format,
              )}`;

        return {
          key: index,
          label: item.title,
          children: time as string,
        };
      }

      // 数值类型
      if (item.type === 'number') {
        if (item.operator === 'BETWEEN') {
          return {
            key: index,
            label: item.title,
            children: `${item.value?.[0]} ~ ${item.value?.[1]}`,
          };
        }

        return {
          key: index,
          label: item.title,
          children: !item.value ? '不限' : `${item.operator}${item.value}`,
        };
      }

      // 文本类型
      return {
        key: index,
        label: item.title,
        children: !item.value
          ? '不限'
          : item.value && item.value.includes('all')
          ? '全部'
          : `包含：${item.value.toString()}`,
      };
    });

    return _options;
  }, [filters]);

  if (!filters.length) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <p>默认筛选：</p>
      <Descriptions items={items} column={1} />
    </div>,
  );
};

export default Preview;
