import type { ReactFC } from '@formily/react';
import { connect, mapProps } from '@formily/react';
import type { IconSelectProps } from './Internal';
import Internal from './Internal';

const IconSelector: ReactFC<IconSelectProps> = connect(
  Internal,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props) => props,
  ),
);
export default IconSelector;
