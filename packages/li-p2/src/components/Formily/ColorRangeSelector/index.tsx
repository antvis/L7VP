import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { ColorRangeSelectorProps } from './Internal';
import Internal from './Internal';

const ColorRangeSelector: ReactFC<ColorRangeSelectorProps> = connect(
  Internal,
  mapProps({
    dataSource: 'options',
    loading: true,
  }),
);

export default ColorRangeSelector;
