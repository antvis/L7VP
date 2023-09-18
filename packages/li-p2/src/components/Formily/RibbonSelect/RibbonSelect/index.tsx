import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import cls from 'classnames';
import React, { useEffect, useState } from 'react';
import { DEFAULT_RIBBON_LIST } from './constants/ribbon-list';
import useStyle from './style';

export type RibbonSelectProps = SelectProps<string[], string[]>;

// 选择色带的自定义组件
const InternalRibbonSelect = (props: RibbonSelectProps) => {
  const prefixCls = usePrefixCls('formily-ribbon-select', props);
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [valueIndex, setValueIndex] = useState(0);
  const [colorReverse, setColorReverse] = useState(false);
  const ribbonList = props.options && props.options.length ? props.options : DEFAULT_RIBBON_LIST;

  useEffect(() => {
    if (props.value) {
      // 正序
      const index = ribbonList.findIndex((item) => {
        return item.toString() === props.value?.toString();
      });
      if (index !== -1) {
        setColorReverse(false);
        setValueIndex(index);
        return;
      }
      //倒叙
      const colorReverseIndex = ribbonList.findIndex((item) => {
        return [...item].reverse().toString() === props.value?.toString();
      });
      if (colorReverseIndex !== -1) {
        setColorReverse(true);
        setValueIndex(colorReverseIndex);
        return;
      }
      // 正向查找与反向查找均没有默认选择
      setValueIndex(0);
    }
  }, [props.value]);

  return wrapSSR(
    <Select
      showArrow={false}
      className={cls(`${prefixCls}`, hashId)}
      popupClassName={`${prefixCls}`}
      onChange={(index) => {
        const value = colorReverse ? [...ribbonList[index]].reverse() : ribbonList[index];
        props.onChange?.(value, value);
      }}
      value={valueIndex}
    >
      {ribbonList.map((item, index) => {
        const colorList = colorReverse ? [...item].reverse() : item;
        return (
          <Select.Option key={index} value={index}>
            {colorList.map((color) => (
              <span
                key={color}
                style={{
                  backgroundColor: color,
                  height: '24px',
                  width: `${100 / colorList.length}%`,
                  display: 'inline-block',
                }}
              />
            ))}
          </Select.Option>
        );
      })}
    </Select>,
  );
};

export default InternalRibbonSelect;
