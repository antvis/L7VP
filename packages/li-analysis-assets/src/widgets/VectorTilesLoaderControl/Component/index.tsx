import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useMemo, useState } from 'react';
import type { Properties } from '../registerForm';
import { CLS_PREFIX, POPOVER_PLACEMENT_LEGEND, VectorTileSvg } from './constants';
import PopoverContent from './PopoverContent';
import useStyle from './style';

export interface VectorTilesLoaderControlType extends ImplementWidgetProps, Properties {}

const VectorTilesLoaderControl: React.FC<VectorTilesLoaderControlType> = (props) => {
  const { position } = props;
  const [openPopover, setOpenPopover] = useState(false);
  const styles = useStyle();

  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  return (
    <CustomControl position={position}>
      <Popover
        overlayClassName={classNames(`${CLS_PREFIX}__popover`)}
        arrow={false}
        open={openPopover}
        placement={onPlacement}
        content={<PopoverContent />}
        trigger={'click'}
      >
        <Tooltip placement={onPlacement} title="显示矢量瓦片配置">
          <div
            className={classNames(`${CLS_PREFIX}__tiles-btn`, styles.tilesBtn, {
              [styles.tilesBtnSelected]: openPopover,
            })}
            onClick={() => {
              setOpenPopover((isOpen) => !isOpen);
            }}
          >
            <Icon component={VectorTileSvg} />
          </div>
        </Tooltip>
      </Popover>
    </CustomControl>
  );
};

export default VectorTilesLoaderControl;
