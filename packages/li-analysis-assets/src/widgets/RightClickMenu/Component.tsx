import { ContextMenu } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import cls from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';
import { CLS_PREFIX } from './constants';

export interface RightClickMenuProps extends ImplementWidgetProps, Properties {}

const RightClickMenu: React.FC<RightClickMenuProps> = (props) => {
  const { showRightMenu } = props;
  const styles = useStyle();
  const [scene] = useScene();

  const handleMenu = (type: string) => {
    if (scene) {
      switch (type) {
        case 'zoomIn':
          scene.zoomIn();
          break;
        case 'zoomOut':
          scene.zoomOut();
          break;
      }
    }
  };

  if (!showRightMenu) {
    return null;
  }

  return (
    <ContextMenu className={cls(CLS_PREFIX, styles.rightClickMenu)}>
      {ContextMenu.Item && (
        <>
          <ContextMenu.Item
            text="放大一级"
            onClick={() => {
              handleMenu('zoomIn');
            }}
          />
          <ContextMenu.Item text="缩小一级" onClick={() => handleMenu('zoomOut')} />
        </>
      )}
    </ContextMenu>
  );
};

export default RightClickMenu;
