import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { useUpdateEffect } from 'ahooks';
import { Empty, Select, Tag } from 'antd';
import cls from 'classnames';
import { isUndefined } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { CloseOutlined, DownOutlined } from '@ant-design/icons';
import useStyle from './style';
import type { FieldSelectOptionType } from './types';

export interface FieldSelectProps {
  /**
   * value
   */
  value?: string | string[];
  /**
   * options
   */
  options?: FieldSelectOptionType[];
  /**
   * 打开
   */
  open?: boolean;
  /**
   * 多选
   */
  mode?: 'multiple' | 'tags';
  /**
   * 是否可清除
   */
  allowClear?: boolean;
  /**
   * 是否禁止操作
   */
  disable?: boolean;
  /**
   * 选择发生改变时
   */
  onChange?: (value?: string | string[]) => void;
  /**
   * 行内样式
   */
  style?: CSSProperties;
}

const InternalSelect = (props: FieldSelectProps) => {
  const { options, open: outerOpen = false, ...prop } = props;
  const prefixCls = usePrefixCls('formily-field-select');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [internalOpen, setInternalOpen] = useState(outerOpen);
  // Select 是否多选
  const isMultiple = prop.mode;

  useUpdateEffect(() => {
    setInternalOpen(outerOpen);
  }, [outerOpen]);

  const onOptionClick = (val: string) => {
    if (!props.onChange) return;
    // 单选
    if (!isMultiple) {
      props.onChange(val);
      setInternalOpen(false);
    } else {
      // 多选
      if (!props.value) {
        props.onChange([val]);
      } else if (Array.isArray(props.value)) {
        const selectValues = Array.from(new Set(props.value.concat(val)));
        props.onChange(selectValues);
      }
    }
  };

  const onClear = () => {
    if (!props.onChange) return;
    // 多选
    if (isMultiple) {
      props.onChange([]);
    } else {
      props.onChange(undefined);
    }
  };

  const suffixIcon = useMemo(() => {
    if (internalOpen || !props.value) {
      return <DownOutlined />;
    }

    if (!props.allowClear) {
      return '';
    }

    if (props.value) {
      return <CloseOutlined onClick={onClear} />;
    }
  }, [props.value, props.allowClear, internalOpen]);

  return wrapSSR(
    <Select
      {...prop}
      allowClear={false}
      popupClassName={cls(`${prefixCls}`, hashId)}
      open={internalOpen}
      onDropdownVisibleChange={(visible) => setInternalOpen(visible)}
      dropdownRender={() => {
        if (!options?.length) {
          return <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        }

        const dropdownHeight = 32 * options.length < 256 ? 32 * options.length + 14 : 256;
        return (
          <div className={`${prefixCls}-dropdown`} style={{ height: dropdownHeight }}>
            <div className={`${prefixCls}-dropdown-container`}>
              {options?.map((item, index) => {
                const isSelected = isMultiple ? props.value?.includes(item.value) : item.value === props.value;
                return (
                  <div
                    className={cls(`${prefixCls}-item`, hashId, {
                      [`${prefixCls}-item_selected`]: isSelected,
                    })}
                    key={index}
                    onClick={() => onOptionClick(item.value)}
                  >
                    {isUndefined(item.type) ? (
                      <Tag>未知</Tag>
                    ) : (
                      <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
                    )}

                    <span>{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }}
      suffixIcon={suffixIcon}
    >
      {options?.map((item, index) => {
        return (
          <Select.Option value={item.value} key={index}>
            <div className={cls(`${prefixCls}-item`, hashId)}>
              {isUndefined(item.type) ? (
                <Tag>未知</Tag>
              ) : (
                <Tag color={item.typeColor}>{isUndefined(item.typeName) ? item.type : item.typeName}</Tag>
              )}
              <span title={item.label}>{item.label}</span>
            </div>
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default InternalSelect;
