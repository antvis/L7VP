import { DeleteOutlined } from '@ant-design/icons';
import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import { ColorPicker, Select } from 'antd';
import type { Color } from 'antd/es/color-picker';
import classnames from 'classnames';
import React, { useMemo } from 'react';
import useStyle from './style';

type UnknownItemProps = {
  color: string;
  onChange: (color: string) => void;
};

const UnknownItem = ({ color: defaultColor, onChange }: UnknownItemProps) => {
  const prefixCls = usePrefixCls('formily-scale-selector__custom-string-unknown');
  const [wrapSSR, hashId] = useStyle(prefixCls);

  const colorChange = (color: Color) => {
    onChange?.(color.toHexString());
  };

  return wrapSSR(
    <div className={classnames(`${prefixCls}`, hashId)}>
      <div className={`${prefixCls}__infor`}>
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <ColorPicker value={defaultColor ? defaultColor : '#5B8FF9'} onChange={colorChange}>
            <div className={`${prefixCls}__infor__color`} style={{ background: defaultColor }} />
          </ColorPicker>
        </div>

        <div className={`${prefixCls}__infor__content`}>
          <Select size="small" style={{ width: '100%' }} disabled placeholder="其他" />
        </div>

        <div className={`${prefixCls}__infor__delete-icon`} />
      </div>
    </div>,
  );
};

export default UnknownItem;
