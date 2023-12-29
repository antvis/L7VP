import Icon from '@ant-design/icons';
import { CustomControl } from '@antv/larkmap';
import type { Layer } from '@antv/larkmap/es/types';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useLayerList } from '@antv/li-sdk';
import { useUpdateEffect } from 'ahooks';
import { Button, Checkbox, Divider, Popover, Tooltip } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import classNames from 'classnames';
import React, { useState } from 'react';
import useStyle from './ComponenStyle';
import { CheckedSvg, CLS_PREFIX, POPOVER_PLACEMENT_LEGEND, SwipeSvg, UncheckedSvg } from './constants';
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
      {layerList
        .filter((layer) => layer.isVisible())
        .map((item) => {
          const isInLfet = swipeLayers.layers.includes(item);
          const isInRight = swipeLayers.rightLayers.includes(item);
          const isAllVisible = !isInLfet && !isInRight;

          return (
            <div key={item.id} className={classNames(styles.layerItem)}>
              <Checkbox
                checked={!isAllVisible}
                style={{ marginRight: 5 }}
                onChange={(e: CheckboxChangeEvent) => {
                  const checked = e.target.checked;
                  if (checked) {
                    setSwipeLayers((pre) => ({
                      ...pre,
                      rightLayers: pre.rightLayers.concat(item),
                    }));
                  } else {
                    setSwipeLayers((pre) => ({
                      ...pre,
                      layers: pre.layers.filter((layer) => layer !== item),
                      rightLayers: pre.rightLayers.filter((layer) => layer !== item),
                    }));
                  }
                }}
              />
              <div className={classNames(styles.layerName)}>{item.name}</div>
              <div className={classNames(styles.layerActions)}>
                <Button
                  type="text"
                  size="small"
                  disabled={isAllVisible}
                  onClick={() => {
                    // 当前状态是：✕ | ✕
                    if (!isInLfet && !isInRight) {
                      setSwipeLayers((pre) => ({
                        ...pre,
                        layers: pre.layers.concat(item),
                      }));
                    } else if (!isInLfet && isInRight) {
                      // 当前状态是：✕ | ✔
                      // 单选为左侧显示
                      setSwipeLayers((pre) => ({
                        ...pre,
                        layers: pre.layers.concat(item),
                        rightLayers: pre.rightLayers.filter((layer) => layer !== item),
                      }));
                    } else if (isInLfet && !isInRight) {
                      // 当前状态是：✔ | ✕
                      // 单选为右侧侧显示
                      setSwipeLayers((pre) => ({
                        ...pre,
                        layers: pre.layers.filter((layer) => layer !== item),
                        rightLayers: pre.rightLayers.concat(item),
                      }));
                    } else if (isInLfet && isInRight) {
                      // 当前状态是：✔ | ✔，不会存在这种情况
                    }
                  }}
                  icon={<Icon component={isInLfet ? CheckedSvg : UncheckedSvg} />}
                />
                <Divider type="vertical" />
                <Button
                  type="text"
                  size="small"
                  disabled={isAllVisible}
                  onClick={() => {
                    // 当前状态是：✕ | ✕
                    if (!isInLfet && !isInRight) {
                      setSwipeLayers((pre) => ({
                        ...pre,
                        rightLayers: pre.rightLayers.concat(item),
                      }));
                    } else if (!isInLfet && isInRight) {
                      // 当前状态是：✕ | ✔
                      // 单选为左侧显示
                      setSwipeLayers((pre) => ({
                        ...pre,
                        layers: pre.layers.concat(item),
                        rightLayers: pre.rightLayers.filter((layer) => layer !== item),
                      }));
                    } else if (isInLfet && !isInRight) {
                      // 当前状态是：✔ | ✕
                      // 单选为右侧侧显示
                      setSwipeLayers((pre) => ({
                        ...pre,
                        layers: pre.layers.filter((layer) => layer !== item),
                        rightLayers: pre.rightLayers.concat(item),
                      }));
                    } else if (isInLfet && isInRight) {
                      // 当前状态是：✔ | ✔，不会存在这种情况
                    }
                  }}
                  icon={<Icon component={isInRight ? CheckedSvg : UncheckedSvg} />}
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
      {isOpen && <Swipe orientation={orientation} layers={swipeLayers.layers} rightLayers={swipeLayers.rightLayers} />}
    </CustomControl>
  );
};

export default SwipeControl;
