import { CustomControl } from '@antv/larkmap';
import type { FilterNodeItem } from '@antv/li-p2';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { default as classNames, default as cls } from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';
import StringItem from './StringItem';
import NumberItem from './NumberItem';

const CLS_PREFIX = 'li-filter-app';
export interface LILayerPopupProps extends Properties, ImplementWidgetProps {}

const LIFilterApp: React.FC<LILayerPopupProps> = (props) => {
  const { filters } = props;
  const styles = useStyle();

  console.log(props, '初始状态 options');

  const onValueChange = (val: FilterNodeItem) => {
    console.log(val, 'val');
  };

  if (!filters.length) {
    return;
  }

  return (
    <CustomControl position="topleft">
      <div className={cls(CLS_PREFIX, styles.filterApp)}>
        {filters.map((item) => {
          return (
            <div className={classNames(`${CLS_PREFIX}__filter-item`, styles.filterItem)}>
              <div className={classNames(`${CLS_PREFIX}__filter-item__title`, styles.filterItemTitle)}>
                {item.field}:
              </div>
              <div className={classNames(`${CLS_PREFIX}__filter-item__content`, styles.filterItemContent)}>
                {item.type === 'string' && <StringItem value={item} onChange={onValueChange} />}
                {item.type === 'number' && <NumberItem value={item} onChange={onValueChange} />}
                {/* {item.type === 'date' && <StringItem value={item} onChange={onValueChange} />} */}
              </div>
            </div>
          );
        })}
      </div>
    </CustomControl>
  );
};

export default LIFilterApp;
