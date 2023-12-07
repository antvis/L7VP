import { LayerPopup } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import cls from 'classnames';
import React from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

const CLS_PREFIX = 'li-fillter-app';
export interface LILayerPopupProps extends Properties, ImplementWidgetProps {}

const LIFilterApp: React.FC<LILayerPopupProps> = (props) => {
  const { isOpen = true, trigger, items = [] } = props;
  const styles = useStyle();
  const isClick = trigger === 'click';

  console.log(props, '展示原始数据');

  return (
    <>
      {isOpen && (
        <LayerPopup
          className={cls(CLS_PREFIX, styles.layerPopup)}
          closeButton={isClick}
          anchor="top-left"
          offsets={[10, -10]}
          items={[]}
          trigger={trigger}
        />
      )}
    </>
  );
};

export default LIFilterApp;
