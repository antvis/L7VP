import { ArrowLeftOutlined, FullscreenExitOutlined, MoreOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import LayerName from '../../../components/EditName';
import { useEditorService, useEditorState, usePrefixCls } from '../../../hooks';
import useStyle from './style';
import type { LayerFormValue } from './LayerForm';
import LayerForm from './LayerForm';

type LayerAttributeProps = {
  className?: string;
  config: LayerSchema;
  onBack: () => void;
};

const LayerAttribute: React.FC<LayerAttributeProps> = (props) => {
  const { className, onBack, config } = props;
  const prefixCls = usePrefixCls('layer-attribute');
  const styles = useStyle();
  const { updateState } = useEditorState();
  const service = useEditorService().appService;
  const layerIdRef = useRef(config.id);
  const [isEditName, setIsEditName] = useState(false);
  const [layerName, setLayerName] = useState<string>(config?.metadata?.name);

  const handleFitBoundLayer = () => {
    service.handleLayerFitBounds(layerIdRef.current);
  };

  const changeLayerName = (newName: string) => {
    updateState((draft) => {
      const findIndex = draft.layers.findIndex((item) => item.id === layerIdRef.current);
      if (findIndex !== -1) {
        draft.layers[findIndex].metadata!.name = newName;
        setLayerName(newName);
        setIsEditName(false);
      }
    });
  };

  const handleDeleteLayer = () => {
    updateState((draft) => {
      const index = draft.layers.findIndex((item) => item.id === layerIdRef.current);
      if (index !== -1) {
        draft.layers.splice(index, 1);
      }
    });
    onBack();
  };

  const handleValuesChange = useCallback((layerConfig: LayerFormValue) => {
    updateState((draft) => {
      const index = draft.layers.findIndex((item) => item.id === layerIdRef.current);
      if (index !== -1) {
        // 改变可视化类型更新 ID 值
        if (draft.layers[index].type !== layerConfig.type) {
          layerIdRef.current = getUniqueId(layerConfig.type);
        }
        // 更新时，显示可见图层
        if (!layerConfig.visConfig.visible) {
          layerConfig.visConfig.visible = true;
        }

        draft.layers[index].id = layerIdRef.current;
        draft.layers[index].type = layerConfig.type;
        draft.layers[index].sourceConfig = layerConfig.sourceConfig;
        draft.layers[index].visConfig = layerConfig.visConfig;
      }
    });
  }, []);

  const dropDownItems: MenuProps['items'] = [
    {
      key: 'editLayerName',
      label: '修改名称',
      onClick: () => {
        setIsEditName(true);
      },
    },
    { key: 'deleteLayerName', label: '删除图层', onClick: handleDeleteLayer },
  ];

  return (
    <div className={classNames(prefixCls, className)}>
      <div className={classNames(`${prefixCls}__header`, styles.attributeHeader)}>
        <div className={classNames(`${prefixCls}__title`, styles.attributeTitle)}>
          <ArrowLeftOutlined
            className={classNames(`${prefixCls}__back-icon`, styles.attributeBackIcon)}
            onClick={onBack}
          />
          <LayerName
            name={layerName}
            onChange={changeLayerName}
            onCancel={() => setIsEditName(false)}
            isEdit={isEditName}
          />
        </div>
        <Space>
          <Tooltip title="定位到图层">
            <Button
              type="text"
              size="middle"
              shape="circle"
              icon={<FullscreenExitOutlined style={{ fontSize: '14px' }} />}
              onClick={handleFitBoundLayer}
            />
          </Tooltip>
          <Dropdown menu={{ items: dropDownItems }}>
            <MoreOutlined className={classNames(`${prefixCls}__dropdown-icon`, styles.dropdownIcon)} />
          </Dropdown>
        </Space>
      </div>
      <LayerForm
        className={classNames(`${prefixCls}__layer-form`, styles.layerForm)}
        config={config}
        onChange={handleValuesChange}
      />
    </div>
  );
};

export default LayerAttribute;
