import { PlusOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useEditorState, usePrefixCls } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';
import AddLayer from './AddLayer';
import { getDefaultLayerAttr } from './helper';
import LayerAttributes from './LayerAttribute';
import LayerList from './LayerList';
import useStyle from './style';

interface LayersPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const LayersPanel: React.FC<LayersPanelProps> = (props) => {
  const prefixCls = usePrefixCls('layers-panel');
  const styles = useStyle();
  const [visibleAttribute, setVisibleAttribute] = useState(false);
  const [layerConfig, setLayerConfig] = useState<LayerSchema>();
  const { state, updateState } = useEditorState();
  const [addLayerPanelOpen, setAddLayerPanelOpen] = useState(false);

  const onAttributesOpen = (layer: LayerSchema) => {
    setLayerConfig(layer);
    setVisibleAttribute(true);
  };

  const onAttributesClose = () => {
    setVisibleAttribute(false);
  };

  const handleSubmit = (name: string, datasetId: string) => {
    const config = getDefaultLayerAttr(name, datasetId);
    updateState((draft) => {
      draft.layers.push(config);
    });
    setAddLayerPanelOpen(false);
    onAttributesOpen(config);
  };

  return (
    <div className={classNames(prefixCls, props.className, styles.layerPanel)}>
      <div
        className={classNames(`${prefixCls}__content`, styles.panelContent, {
          [`${prefixCls}__content_hidden`]: visibleAttribute,
          [styles.panelContentHidden]: visibleAttribute,
        })}
      >
        <div className={classNames(`${prefixCls}__header`, styles.panelHeader)}>图层</div>
        <div className={classNames(`${prefixCls}__add-layer`, styles.addLayer)}>
          图层({state.layers.length})
          <Popover
            placement="bottomLeft"
            trigger="click"
            open={addLayerPanelOpen}
            onOpenChange={(open) => setAddLayerPanelOpen(open)}
            overlayClassName={classNames(`${prefixCls}l__add-layer-popver`, styles.addLayerPopover)}
            content={
              <AddLayer
                onSubmit={handleSubmit}
                onClose={() => {
                  setAddLayerPanelOpen(false);
                }}
              />
            }
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setAddLayerPanelOpen(true);
              }}
              id="LITourAddVisualLayer"
            >
              新增图层
            </Button>
          </Popover>
        </div>
        <LayerList
          className={classNames(`${prefixCls}__layer-list`, styles.layerList)}
          onClickLayer={onAttributesOpen}
        />
      </div>

      {visibleAttribute && layerConfig && (
        <LayerAttributes
          className={classNames(`${prefixCls}__layer-attribute`, styles.layerAttribute)}
          onBack={onAttributesClose}
          config={layerConfig}
        />
      )}
    </div>
  );
};

export default LayersPanel;
