import { LoadingOutlined } from '@ant-design/icons';
import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import React from 'react';
import InternalSelect from './Select';
import type { FieldSelectProps } from './Select';

const FieldSelect: ReactFC<FieldSelectProps> = connect(
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
