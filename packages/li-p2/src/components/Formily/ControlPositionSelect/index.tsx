import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { SelectProps } from 'antd';
import PositionSelect from './Select';

const ControlPositionSelect: ReactFC<SelectProps> = connect(
  PositionSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props) => ({ ...props }),
  ),
);

export default ControlPositionSelect;
