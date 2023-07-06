import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import { Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { CLS_PREFIX, DrawSvg, POPOVER_PLACEMENT_LEGEND } from './constants';
import PopoverContent from './PopoverContent';
import useStyle from './style';
import type { MeasureControlProps } from './typings';

const MeasureControl: React.FC<MeasureControlProps> = (props) => {
  const { position, color } = props;
  const styles = useStyle();
  const [openPopover, setOpenPopover] = useState(false);
  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  return (
    <CustomControl position={position} className={classNames(styles.measureControl, CLS_PREFIX)}>
      <Popover
        overlayInnerStyle={{ padding: '0 8px' }}
        open={openPopover}
        placement={onPlacement}
        content={<PopoverContent color={color} />}
        trigger={'click'}
        arrow={false}
      >
        <Tooltip placement={'topLeft'} title="距离/面积测量">
          <div
            className={classNames(`${CLS_PREFIX}__measure-btn`, styles.measureBtn, {
              [styles.measureBtnSelected]: openPopover,
            })}
            onClick={() => {
              setOpenPopover((isOpen) => !isOpen);
            }}
          >
            <Icon component={DrawSvg} />
          </div>
        </Tooltip>
      </Popover>
    </CustomControl>
  );
};

export default MeasureControl;
