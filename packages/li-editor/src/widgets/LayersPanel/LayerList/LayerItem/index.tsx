import Icon, { CopyOutlined, EyeInvisibleOutlined, EyeOutlined, FormOutlined, MoreOutlined } from '@ant-design/icons';
import type { LayerSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import type { MenuProps } from 'antd';
import { Dropdown, message, Popconfirm, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { useState } from 'react';
import LayerName from '../../../../components/EditName';
import { useEditorService, useEditorState, usePrefixCls } from '../../../../hooks';
import useStyle from './style';

const defaultVis = { icon: () => <span />, color: 'gray' };

type LayerItemProps = {
  layer: LayerSchema;
  dragIcon?: JSX.Element;
  onClickLayer: (layerConfig: LayerSchema) => void;
};

const LayerItem = ({ layer, dragIcon, onClickLayer }: LayerItemProps) => {
  const prefixCls = usePrefixCls('layer-item');
  const styles = useStyle();
  const { updateState } = useEditorState();
  const { appService } = useEditorService();
  const implementLayer = appService.getImplementLayer(layer.type);
  const visLayer = implementLayer?.metadata ?? defaultVis;
  const [isEditName, setIsEditName] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const onChangeName = (newName: string) => {
    updateState((draft) => {
      const findIndex = draft.layers.findIndex((item) => item.id === layer.id);
      if (findIndex !== -1) {
        draft.layers[findIndex].metadata!.name = newName;
        setIsEditName(false);
      }
    });
  };

  const onVisibleChange = () => {
    updateState((draft) => {
      const index = draft.layers.findIndex((layerInfo) => layerInfo.id === layer.id);
      draft.layers[index].visConfig.visible = !layer.visConfig.visible;
    });
    messageApi.success(layer.visConfig.visible ? '图层已隐藏' : '图层已显示', 1);
  };

  const onDelete = (_layer: LayerSchema) => {
    updateState((draft) => {
      const index = draft.layers.findIndex((layerInfo) => layerInfo.id === _layer.id);
      if (index !== -1) draft.layers.splice(index, 1);
    });
  };

  const handleCopyLayer = (_layer: LayerSchema) => {
    const copyLayer = {
      ..._layer,
      metadata: {
        ..._layer.metadata,
        name: `复制 ${_layer.metadata.name}`,
      },
      id: getUniqueId(),
    };
    updateState((draft) => {
      const originalIndex = draft.layers.findIndex((l) => l.id === _layer.id);
      if (originalIndex !== -1) {
        // 复制的图层插入进去
        draft.layers.splice(originalIndex + 1, 0, copyLayer);
      } else {
        draft.layers.push(copyLayer);
      }
    });
    messageApi.success('复制成功');
  };

  const dropDownItems: MenuProps['items'] = [
    {
      key: 'edit',
      label: '编辑图层',
      onClick() {
        onClickLayer(layer);
      },
    },
    {
      key: 'delete',
      label: (
        <Popconfirm
          title="确认是否删除？"
          placement="bottom"
          okText="确定"
          cancelText="取消"
          onConfirm={() => {
            onDelete(layer);
          }}
        >
          删除图层
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className={classnames(prefixCls, styles.layerItem)} style={{ borderLeftColor: visLayer?.color }}>
      <div className={classnames(`${prefixCls}__drag-icon`, styles.dragIcon)}>{dragIcon}</div>
      <div className={classnames(`${prefixCls}__infor`, styles.itemInfor)} onClick={(e) => e.stopPropagation()}>
        <div
          className={classnames(`${prefixCls}__title`, styles.itemTitle)}
          onClick={() => {
            if (!isEditName) {
              onClickLayer(layer);
            }
          }}
        >
          <div className={classnames(`${prefixCls}__tag`, styles.itemTag)}>
            {typeof visLayer?.icon === 'function' ? <Icon component={visLayer.icon} /> : null}
          </div>
          <LayerName
            name={layer.metadata.name}
            onChange={onChangeName}
            onClick={() => {
              if (!isEditName) {
                onClickLayer(layer);
              }
            }}
            onCancel={() => setIsEditName(false)}
            isEdit={isEditName}
          />
        </div>

        {messageContextHolder}
        <Space className={classnames(`${prefixCls}__actions`, styles.itemActions)}>
          <Tooltip title="点击修改图层名称">
            <FormOutlined
              className={classnames(
                `${prefixCls}__actions_hide`,
                'li-layer-item__actions_show',
                styles.itemActionsHide,
              )}
              onClick={() => {
                setIsEditName(true);
              }}
            />
          </Tooltip>
          <Tooltip title="点击复制图层">
            <CopyOutlined
              className={classnames(
                `${prefixCls}__actions_hide`,
                'li-layer-item__actions_show',
                styles.itemActionsHide,
              )}
              onClick={() => handleCopyLayer(layer)}
            />
          </Tooltip>

          <Tooltip title={`点击${layer?.visConfig?.visible ? '隐藏' : '显示'}图层`}>
            {layer?.visConfig?.visible ? (
              <EyeOutlined onClick={onVisibleChange} />
            ) : (
              <EyeInvisibleOutlined onClick={onVisibleChange} />
            )}
          </Tooltip>

          <Dropdown menu={{ items: dropDownItems }}>
            <MoreOutlined />
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default LayerItem;
