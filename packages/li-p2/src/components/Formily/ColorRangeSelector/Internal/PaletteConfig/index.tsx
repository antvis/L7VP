import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { Select, Switch } from 'antd';
import cls from 'classnames';
import React from 'react';
import useStyle from './style';

export type PaletteConfigItemType = 'select' | 'switch';

export type PaletteConfigProps = {
  id: string;
  label: string;
  type: PaletteConfigItemType;
  config: { options?: { label: string | number; value: string | number }[] };
  value: string | number | boolean;
  onChange: (val: any) => void;
  className?: string;
};

// 选择色带的自定义组件
const PaletteConfig = (props: PaletteConfigProps) => {
  const prefixCls = usePrefixCls('formily-color-range-selector__palette-config-item');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const { id, label, type, config, value: defaultValue, onChange } = props;

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)} key={id}>
      <span className={`${prefixCls}__name`}> {label}</span>

      {type === 'select' && (
        <Select
          className={`${prefixCls}__select`}
          value={defaultValue}
          options={config.options}
          onChange={(value) => onChange({ [id]: value })}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        />
      )}

      {type === 'switch' && (
        <Switch checked={defaultValue as boolean} onChange={(value) => onChange({ [id]: value })} />
      )}
    </div>,
  );
};

export default PaletteConfig;
