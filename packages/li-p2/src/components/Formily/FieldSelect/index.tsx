import { LoadingOutlined } from '@ant-design/icons';
import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { SelectProps } from 'antd';
import React from 'react';
import InternalSelect from './Select';
import type { FieldSelectOptionType } from './Select/types';

const FieldSelect: ReactFC<SelectProps<string | string[], FieldSelectOptionType>> = connect(
  InternalSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        suffixIcon:
          // @ts-ignore
          field?.loading || field?.validating ? <LoadingOutlined /> : props.suffixIcon,
      };
    },
  ),
);

export default FieldSelect;
