import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { SelectProps } from 'antd';
import InternalSelect from './Select';

const TimeGranularitySelect: ReactFC<SelectProps> = connect(
  InternalSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      return {
        ...props,
        field,
      };
    },
  ),
);

export default TimeGranularitySelect;
