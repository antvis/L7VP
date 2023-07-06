import { usePrefixCls } from '@formily/antd-v5/esm/__builtins__';
import type { SelectProps as AntdSelectProps } from 'antd';
import { Select } from 'antd';
import cls from 'classnames';
import { isUndefined } from 'lodash-es';
import React, { useEffect, useMemo, useState } from 'react';
import { getOptions } from './helper';
import useStyle from './style';

export type SelectProps = AntdSelectProps & {
  type: string;
};

const InternalSelect: React.FC<SelectProps> = (props) => {
  const { options: defaultOtion, value: defaultValue, type, ...prop } = props;
  const prefixCls = usePrefixCls('formily-time-granularity-select');
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const [value, setValue] = useState(defaultValue);

  const options = useMemo(() => {
    if (defaultOtion?.length) {
      return defaultOtion;
    }

    return getOptions(type);
  }, [defaultOtion, type]);

  useEffect(() => {
    const isValidGranularity = value && options.find((item) => item.value === value);
    if (isValidGranularity || isUndefined(type)) return;

    // 取数据的上一个粒度
    const granularity = options.length > 1 ? options[1].value : options[0].value;
    setValue(granularity);
    props.onChange?.(granularity, options);
  }, [options, type]);

  const onValueChange = (e: string) => {
    setValue(e);
    props.onChange?.(e, options);
  };

  return wrapSSR(
    <Select
      value={value}
      {...prop}
      popupClassName={cls(`${prefixCls}`, hashId)}
      options={options}
      onChange={onValueChange}
    />,
  );
};

export default InternalSelect;
