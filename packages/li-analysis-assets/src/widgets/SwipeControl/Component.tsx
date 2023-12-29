import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { Layer } from '@antv/larkmap/es/types';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useLayerList } from '@antv/li-sdk';
import { useUpdateEffect } from 'ahooks';
import { Button, Divider, Popover, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import useStyle from './ComponenStyle';
import { ClosureSvg, CLS_PREFIX, OpenSvg, POPOVER_PLACEMENT_LEGEND, SwipeSvg } from './constants';
import type { Properties } from './registerForm';
import { Swipe } from './Swipe';

export interface SwipeControlProps extends ImplementWidgetProps, Properties {}

const SwipeControl: React.FC<SwipeControlProps> = (props) => {
  const { defaultOpen, position, orientation, defaultLeftLayers, defaultRightLayers } = props;
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const styles = useStyle();
  const layerList = useLayerList();

  const [swipeLayers, setSwipeLayers] = useState<{ layers: Layer[]; rightLayers: Layer[] }>({
    layers: [],
    rightLayers: [],
  });

  useUpdateEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  const placement = POPOVER_PLACEMENT_LEGEND.get(position);

  const PopoverContent = () => (
    <>
      <div className={classNames(`${CLS_PREFIX}__popover__header-title`, styles.popoverHeaderTitle)}>对比图层列表</div>
      {layerList.map((item) => {
        const isInLfet = swipeLayers.layers.includes(item);
        const isInRight = swipeLayers.rightLayers.includes(item);

        return (
          <div key={item.id} className={classNames(styles.layerItem)}>
            <div className={classNames(styles.layerName)}>{item.name}</div>
            <div className={classNames(styles.layerActions)}>
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setSwipeLayers((pre) => ({
                    ...pre,
                    layers: isInLfet ? pre.layers.filter((layer) => layer !== item) : pre.layers.concat(item),
                  }));
                }}
                icon={<Icon component={isInLfet ? ClosureSvg : OpenSvg} />}
              />
              <Divider type="vertical" />
              <Button
                type="text"
                size="small"
                onClick={() => {
                  setSwipeLayers((pre) => ({
                    ...pre,
                    rightLayers: isInLfet
                      ? pre.rightLayers.filter((layer) => layer !== item)
                      : pre.rightLayers.concat(item),
                  }));
                }}
                icon={<Icon component={isInRight ? ClosureSvg : OpenSvg} />}
              />
            </div>
          </div>
        );
      })}
    </>
  );

  return (
    <CustomControl position={position} className={classNames(styles.swipeControl, CLS_PREFIX)}>
      <Popover
        overlayClassName={classNames(`${CLS_PREFIX}__popover`, styles.popover)}
        arrow={false}
        open={isOpen}
        content={<PopoverContent />}
        placement={placement}
        trigger={'click'}
      >
        <Tooltip title={isOpen ? '关闭' : '开启卷帘对比'}>
          <div
            className={classNames(`${CLS_PREFIX}__swipe-btn`, styles.swipeBtn, {
              [styles.swipeBtnSelected]: isOpen,
            })}
            onClick={() => {
              setIsOpen((isOpen) => !isOpen);
            }}
          >
            <Icon component={SwipeSvg} />
          </div>
        </Tooltip>
      </Popover>
      {isOpen && <Swipe orientation={orientation} layers={[]} rightLayers={[]} />}
    </CustomControl>
  );
};

export default SwipeControl;
