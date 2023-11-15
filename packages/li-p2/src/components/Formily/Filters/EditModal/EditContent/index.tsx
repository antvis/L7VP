import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Radio, Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import type { FilterNodeItem, OptionType } from '../../type';
import FieldSelect from '../../../FieldSelect/Select';
import useStyle from './style';
import { GranularityOptions } from './contants';

export interface FiltersProps {
  /**
   * 偏移量
   */
  value?: FilterNodeItem;
  /**
   * 筛选字段
   */
  options: OptionType[];
  /**
   * 选择发生改变时
   */
  onChange?: (value: FilterNodeItem) => void;
}

const EditContent: React.FC<FiltersProps> = (props) => {
  const prefixCls = usePrefixCls('formily-filters-edit-modal-right');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { value, options, onChange } = props;
  const [filter, setFilter] = useState<FilterNodeItem>();

  const onFieldChange = (field: string) => {
    const _field = options.find((item) => item.value === field);
    setFilter({ field: _field?.value, type: _field?.type });
  };

  useEffect(() => {
    if (!filter) {
      const _field = options[0];
      setFilter({ field: _field?.value, type: _field?.type });
    }
  }, []);

  if (!filter) {
    return null;
  }

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)}>
      <div className={cls(`${prefixCls}__filter`, hashId)}>
        <div className={cls(`${prefixCls}__field`, hashId)}> 选择筛选字段</div>
        <FieldSelect value={filter.field} style={{ width: '100%' }} options={options} onChange={onFieldChange} />
      </div>

      {filter.type === 'string' && (
        <>
          <div className={cls(`${prefixCls}__filter`, hashId)}>
            <div className={cls(`${prefixCls}__field`, hashId)}>筛选方式</div>
            <Radio.Group value="radio">
              <Radio value="radio">单选</Radio>
              <Radio value="multip">多选</Radio>
            </Radio.Group>
          </div>

          <div className={cls(`${prefixCls}__filter`, hashId)}>
            <div className={cls(`${prefixCls}__field`, hashId)}>设定默认值</div>
          </div>
        </>
      )}

      {filter.type === 'number' && (
        <>
          <div className={cls(`${prefixCls}__filter`, hashId)}>
            <div className={cls(`${prefixCls}__field`, hashId)}>请选择聚合函数</div>
            <Select
              size="small"
              defaultValue="no"
              style={{ width: '100%' }}
              options={[{ value: 'no', label: '无聚合' }]}
              onChange={onFieldChange}
            />
          </div>
        </>
      )}

      {filter.type === 'date' && (
        <>
          <div className={cls(`${prefixCls}__filter`, hashId)}>
            <div className={cls(`${prefixCls}__field`, hashId)}>日期类型</div>
            <Radio.Group defaultValue="datePicker">
              <Radio value="datePicker">单日期</Radio>
              <Radio value="rangePicker">日期区间</Radio>
            </Radio.Group>
          </div>
          <div className={cls(`${prefixCls}__filter`, hashId)}>
            <div className={cls(`${prefixCls}__field`, hashId)}>时间粒度</div>
            <Select
              size="small"
              defaultValue={GranularityOptions[0].value}
              style={{ width: '100%' }}
              options={GranularityOptions}
              onChange={onFieldChange}
            />
          </div>
        </>
      )}
    </div>,
  );
};

export default EditContent;
