import { PlusOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import classnames from 'classnames';
import { uniqueId } from 'lodash-es';
import React from 'react';
import type { CustomMappingColorItem } from '../../type';
import CustomInput from './CustomInput';
import useStyle from './style';

type CustomStringProps = {
  customRanges: CustomMappingColorItem[];
  onChange: (value: CustomMappingColorItem[]) => void;
  className?: string;
};

const CustomString = (props: CustomStringProps) => {
  const { customRanges = [], onChange, className } = props;
  const prefixCls = usePrefixCls('formily-color-range-selector__custom-string');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const addPaletteRangeItem = () => {
    const addItem: CustomMappingColorItem = {
      id: uniqueId(),
      value: [],
      color: customRanges[customRanges.length - 1]?.color ?? '#5B8FF9',
    };

    const list: CustomMappingColorItem[] = [...customRanges, addItem];
    onChange(list);
  };

  const deletePaletteRangeItem = (index: number) => {
    const _ranges = customRanges.filter((_, _index) => _index !== index);
    onChange(_ranges);
  };

  const onChangePaletteRangeItem = (value: number[], color: string, index: number) => {
    const list = customRanges.map((item, _index) => {
      if (index === _index) {
        const _item: CustomMappingColorItem = {
          ...item,
          value,
          color,
        };
        return _item;
      }

      return item;
    });

    onChange(list);
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId, className)}>
      {customRanges.map((customItem: CustomMappingColorItem, index: number) => {
        return (
          <CustomInput
            key={`custom-input-cat${index}`}
            color={customItem.color}
            value={customItem.value}
            onDelete={() => deletePaletteRangeItem(index)}
            onChange={(value: number[], color: string) => onChangePaletteRangeItem(value, color, index)}
          />
        );
      })}

      <div onClick={addPaletteRangeItem} className={`${prefixCls}__add-range-item`}>
        <PlusOutlined /> 添加
      </div>
    </div>,
  );
};

export default CustomString;
