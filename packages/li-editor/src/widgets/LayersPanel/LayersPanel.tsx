import { PlusOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { Button, Popover } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import { useEditorState } from '../../hooks';
import type { ImplementEditorWidgetProps } from '../../types';
import AddLayer from './AddLayer';
import { getDefaultLayerAttr } from './helper';
import LayerAttributes from './LayerAttribute';
import LayerList from './LayerList';
import './LayersPanel.less';

interface LayersPanelProps extends ImplementEditorWidgetProps {
  className?: string;
}

const LayersPanel: React.FC<LayersPanelProps> = (props) => {
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
    <div className={classNames('li-layers-panel', props.className)}>
      <div
        className={classNames('li-layers-panel__content', {
          'li-layers-panel__content_hidden': visibleAttribute,
        })}
      >
        <div className="li-layers-panel__header">图层</div>
        <div className="li-layers-panel__add-layer">
          图层({state.layers.length})
          <Popover
            placement="bottomLeft"
            trigger="click"
            open={addLayerPanelOpen}
            onOpenChange={(open) => setAddLayerPanelOpen(open)}
            overlayClassName="li-layers-panel__add-layer-popver"
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
        <LayerList className="li-layers-panel__layer-list" onClickLayer={onAttributesOpen} />
      </div>

      {visibleAttribute && layerConfig && (
        <LayerAttributes className="li-layers-panel__layer-attribute" onBack={onAttributesClose} config={layerConfig} />
      )}
    </div>
  );
};

export default LayersPanel;
