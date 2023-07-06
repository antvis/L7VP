import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { ReactFC } from '@formily/react';
import { connect } from '@formily/react';
import { ColorPicker as AntdColorPicker } from 'antd';
import type { Color } from 'antd/es/color-picker';
import cls from 'classnames';
import React, { useCallback } from 'react';
import useStyle from './style';

export interface ColorPickerProps {
  /**
   * 颜色值
   */
  value?: string;
  /**
   * 是否禁止操作
   */
  disable?: boolean;
  /**
   * 选择发生改变时
   */
  onChange?: (color: string) => void;
}

const Preset_Colors = [
  '#5B8FF9',
  '#5AD8A6',
  '#5D7092',
  '#F6BD16',
  '#E8684A',
  '#6DC8EC',
  '#9270CA',
  '#FF9D4D',
  '#269A99',
  '#FF99C3',
  '#A9ABB1',
];

const InternalColorPicker = React.memo((props: ColorPickerProps) => {
  const { onChange, value, disable = false } = props;
  const prefixCls = usePrefixCls('formily-color-picker');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const onChangeComplete = useCallback(
    (color: Color) => {
      onChange?.(color.toHexString());
    },
    [onChange],
  );

  return wrapSSR(
    <div className={cls(`${prefixCls}`, hashId)} style={{ pointerEvents: disable ? 'none' : 'auto' }}>
      <AntdColorPicker
        value={value ? value : Preset_Colors[0]}
        onChange={onChangeComplete}
        presets={[{ label: '推荐', colors: Preset_Colors }]}
      >
        <div className={`${prefixCls}__color-block`} style={{ background: value ? value : Preset_Colors[0] }} />
      </AntdColorPicker>
    </div>,
  );
});

const ColorPicker: ReactFC<ColorPickerProps> = connect(InternalColorPicker);

export default ColorPicker;
