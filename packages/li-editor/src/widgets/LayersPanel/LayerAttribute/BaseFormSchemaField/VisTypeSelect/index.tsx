import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { SelectProps } from 'antd';
import Select from './VisTypeSelect';

const VisTypeSelect: ReactFC<SelectProps<any, any>> = connect(
  Select,
  mapProps({ dataSource: 'options' }, (props) => props),
);

export default VisTypeSelect;
