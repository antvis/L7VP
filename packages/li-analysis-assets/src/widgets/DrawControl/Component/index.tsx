import Icons from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import { Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import { DrawIcon, POPOVER_PLACEMENT_LEGEND, CLS_PREFIX } from './contants';
import { DrawTool } from './DrawTool';
// eslint-disable-next-line import/order
import type { DrawWidgetProps } from '../types';
import useStyle from './style';

export default (props: DrawWidgetProps) => {
  const { position, ...rest } = props;
  const styles = useStyle();
  const [openPopover, setOpenPopover] = useState(false);

  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  return (
    <CustomControl position={position} className={CLS_PREFIX}>
      <Popover
        overlayInnerStyle={{ padding: 0 }}
        trigger={['click']}
        placement={onPlacement}
        open={openPopover}
        content={<DrawTool options={{ rest } as any} />}
        arrow={false}
      >
        <Tooltip title="在地图上绘制" placement="left">
          <div
            className={classNames(
              styles.popoverBtn,
              {
                selected: openPopover,
              },
              `${CLS_PREFIX}__popover-btn`,
            )}
            onClick={() => {
              setOpenPopover((isOpen) => !isOpen);
            }}
          >
            <Icons component={DrawIcon} />
          </div>
        </Tooltip>
      </Popover>
    </CustomControl>
  );
};
