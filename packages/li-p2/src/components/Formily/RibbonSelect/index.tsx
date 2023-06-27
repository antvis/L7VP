import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { RibbonSelectProps } from './RibbonSelect';
import InternalRibbonSelect from './RibbonSelect';

const RibbonSelect: ReactFC<RibbonSelectProps> = connect(
  InternalRibbonSelect,
  mapProps({
    dataSource: 'options',
    loading: true,
  }),
);

export default RibbonSelect;
