import { getUniqueId } from '@antv/li-sdk';
import { Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import type { ImplementEditorAddDatasetWidgetProps } from '../../../types';
import { isValidTileUrl } from '../helper';
import type { MVTTilesetConfig } from '../types';
import Zoom from '../Zoom';

type MVTTileProps = ImplementEditorAddDatasetWidgetProps;

const MVTTile = (props: MVTTileProps) => {
  const { onSubmit, onCancel } = props;
  const [tilesetConfig, setTilesetConfig] = useState<MVTTilesetConfig>();
  const [form] = Form.useForm();
  const canAddTileset = tilesetConfig && tilesetConfig.name && tilesetConfig.url && tilesetConfig.metadataUrl;

  const onFormChange = (_: any, allValues: MVTTilesetConfig) => {
    setTilesetConfig(allValues);
  };

  const onAddTileset = async () => {
    if (!tilesetConfig) return;
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    const { name, url, zoom } = tilesetConfig;
    const tilesetId = getUniqueId();
    const tileset = {
      id: tilesetId,
      type: 'raster-tile' as const,
      metadata: {
        name,
        description: 'MVT Tile',
        serviceType: 'MVT Tile',
      },
      properties: {
        url,
        parser: { type: 'mvt', tileSize: 256, minZoom: zoom.minZoom, maxZoom: zoom.maxZoom },
      },
    };
    const layer = {
      id: getUniqueId(),
      type: 'TileLayer',
      metadata: { name },
      sourceConfig: {
        datasetId: tilesetId,
        parser: { type: 'mvt' },
      },
      visConfig: {
        visible: true,
      },
    };
    onSubmit([tileset], [layer]);
  };

  return (
    <>
      <Form layout="vertical" requiredMark={false} form={form} onValuesChange={onFormChange} style={{ maxWidth: 500 }}>
        <Form.Item name="name" label="名称" rules={[{ required: true, message: '请填写服务名称' }]}>
          <Input placeholder="请输入服务名称" />
        </Form.Item>
        <Form.Item
          name="url"
          label="服务 URL"
          rules={[
            { required: true, message: '请输入服务地址' },
            {
              validator(_, value) {
                if (!value) {
                  return Promise.reject();
                }
                if (value && isValidTileUrl(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('请输入有效的服务地址'));
              },
            },
          ]}
        >
          <Input placeholder="https://example.com/{z}/{x}/{y}.pbf" />
        </Form.Item>
        <Form.Item
          name="metadataUrl"
          label="服务 Meatadata URL"
          rules={[
            { required: true, message: '请输入服务元数据地址' },
            { type: 'url', message: '请输入有效的服务元数据地址' },
          ]}
        >
          <Input placeholder="https://example.com/metadata.json" />
        </Form.Item>
        <Form.Item name="zoom" label="层级" tooltip="指定服务的有效层级">
          <Zoom onChange={(zoom) => form.setFieldValue('zoom', zoom)} />
        </Form.Item>
      </Form>
      <div className="ant-modal-footer">
        <Space>
          <Button onClick={onCancel}>返回</Button>
          <Button disabled={!canAddTileset} type="primary" onClick={onAddTileset}>
            添加
          </Button>
        </Space>
      </div>
    </>
  );
};

export default MVTTile;
