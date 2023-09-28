import { getUniqueId } from '@antv/li-sdk';
import MonacoEditor from '@monaco-editor/react';
import { Button, Form, Input, Space } from 'antd';
import React, { useState } from 'react';
import type { ImplementEditorAddDatasetWidgetProps } from '../../../types';
import { isValidTileUrl } from '../helper';
import type { MVTTilesetConfig } from '../types';

type MVTTileProps = ImplementEditorAddDatasetWidgetProps;

const MVTTile = (props: MVTTileProps) => {
  const { onSubmit, onCancel } = props;
  const [tilesetConfig, setTilesetConfig] = useState<MVTTilesetConfig>();
  const [metadata, setMetadata] = useState<string>();
  const [form] = Form.useForm();
  const canAddTileset =
    tilesetConfig && tilesetConfig.name && tilesetConfig.url && tilesetConfig.metadataUrl && metadata;

  const getMetadata = (metadataUrl: string) => {
    return fetch(metadataUrl)
      .then((res) => res.json())
      .then((data) => {
        const previewData = data;
        if (typeof previewData.json === 'string') {
          previewData.json = JSON.parse(previewData.json);
        }
        return JSON.stringify(previewData, null, 2);
      });
  };

  const onFormChange = (changedValues: any, allValues: MVTTilesetConfig) => {
    setTilesetConfig(allValues);
  };

  const onAddTileset = async () => {
    if (!tilesetConfig) return;
    try {
      await form.validateFields();
    } catch (error) {
      return;
    }

    const { name, url, metadataUrl } = tilesetConfig;
    const tilesetId = getUniqueId();
    const tileset = {
      id: tilesetId,
      type: 'vector-tile' as const,
      metadata: {
        name,
        description: 'MVT Tile',
      },
      properties: {
        type: 'mvt-tile' as const,
        url,
        metadataUrl,
      },
    };
    const layer = {
      id: getUniqueId(),
      type: 'MVTLayer',
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
      <div style={{ display: 'flex' }}>
        <Form
          layout="vertical"
          requiredMark={false}
          form={form}
          onValuesChange={onFormChange}
          style={{ minWidth: 500 }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true, message: '请填写服务名称' }]}>
            <Input placeholder="请输入服务名称" />
          </Form.Item>
          <Form.Item
            name="url"
            label="服务 URL"
            validateFirst={true}
            rules={[
              { required: true, message: '请输入服务地址' },
              {
                validator(_, value) {
                  if (isValidTileUrl(value)) {
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
            validateFirst={true}
            rules={[
              { required: true, message: '请输入服务元数据地址' },
              { type: 'url', message: '请输入有效的服务元数据地址' },
              {
                validator(_, value) {
                  return getMetadata(value)
                    .then((data) => {
                      setMetadata(data);
                      return Promise.resolve();
                    })
                    .catch((err) => {
                      return Promise.reject(new Error('获取元数据失败，请输入有效的服务元数据地址'));
                    });
                },
              },
            ]}
          >
            <Input placeholder="https://example.com/metadata.json" />
          </Form.Item>
          {/* <Form.Item name="zoom" label="层级" tooltip="指定服务的有效层级">
            <Zoom onChange={(zoom) => form.setFieldValue('zoom', zoom)} />
          </Form.Item> */}
        </Form>
        <div style={{ marginLeft: 20, marginTop: -70, height: 350, width: '100%', backgroundColor: '#1e1e1e' }}>
          {metadata && (
            <MonacoEditor
              language="json"
              options={{
                readOnly: true,
                minimap: { enabled: false },
                lineNumbers: 'off',
                overviewRulerBorder: false,
              }}
              theme="vs-dark"
              value={metadata}
            />
          )}
        </div>
      </div>
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
