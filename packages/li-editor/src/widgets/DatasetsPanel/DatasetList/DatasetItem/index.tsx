import { DeleteOutlined, FormOutlined, InsertRowAboveOutlined, MoreOutlined } from '@ant-design/icons';
import type { DatasetSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import type { MenuProps } from 'antd';
import { Dropdown, message, Popconfirm, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import { downloadText } from 'download.js';
import React, { useState } from 'react';
import DatasetName from '../../../../components/EditName';
import { useEditorDataset, useEditorState } from '../../../../hooks';
import './index.less';

export type DatasetItemProps = {
  className?: string;
  onReplaceDataset: (datasetId: string) => void;
  onPreviewDataset: (datasetId: string) => void;
  dataset: DatasetSchema;
};

const DatasetItem = (props: DatasetItemProps) => {
  const { dataset: datasetSchema, onReplaceDataset, onPreviewDataset, className } = props;
  const { state, updateState } = useEditorState();
  const [isEditName, setIsEditName] = useState(false);
  const editorDataset = useEditorDataset(datasetSchema.id);
  const isLocalOrRemoteDataSource = editorDataset?.isLocalOrRemoteDataset;
  const [messageApi, messageContextHolder] = message.useMessage();

  const replaceDataset = () => {
    onReplaceDataset(datasetSchema.id);
  };

  const copyDataset = () => {
    const copyData: DatasetSchema = {
      ...datasetSchema,
      metadata: {
        ...datasetSchema.metadata,
        name: `${datasetSchema.metadata.name}copy`,
      },
      id: getUniqueId(datasetSchema.id),
    };
    updateState((draft) => {
      draft.datasets.push(copyData);
    });
    messageApi.success('复制成功');
  };

  const downloadDataset = () => {
    if (isLocalOrRemoteDataSource) {
      const { metadata } = editorDataset;
      downloadText(`${metadata.name}.json`, JSON.stringify(editorDataset.data));
    }
  };

  const onChangeName = (newName: string) => {
    updateState((draft) => {
      const findIndex = draft.datasets.findIndex((source) => source.id === datasetSchema.id);
      draft.datasets[findIndex].metadata.name = newName;
      setIsEditName(false);
    });
  };

  const getDelLayersCount = (dataSourceID: string) => {
    return state.layers.filter((layer) => layer.sourceConfig?.datasetId === dataSourceID).length;
  };

  const onDeleteDataset = () => {
    updateState((draft) => {
      const delDataIndex = draft.datasets.findIndex((source) => source.id === datasetSchema.id);
      draft.layers = draft.layers.filter((layer) => layer.sourceConfig?.datasetId !== datasetSchema.id);
      draft.datasets.splice(delDataIndex, 1);
    });
  };

  const dropDownItems: MenuProps['items'] = [
    {
      key: 'replaceDataset',
      label: <>替换数据集</>,
      onClick() {
        replaceDataset();
      },
    },
    {
      key: 'copyDataset',
      label: <>复制数据集</>,
      onClick() {
        copyDataset();
      },
    },
    {
      key: 'downloadDataset',
      label: <>导出数据集</>,
      onClick() {
        downloadDataset();
      },
    },
  ];

  return (
    <div className={classnames('li-dataset-list__card', className)}>
      <div className="li-dataset-list__info">
        <DatasetName
          name={datasetSchema.metadata.name}
          isEdit={isEditName}
          onChange={onChangeName}
          onCancel={() => {
            setIsEditName(false);
          }}
        />

        <div
          className="li-dataset-list__info-name"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isLocalOrRemoteDataSource ? (
            <>
              共<span className="li-dataset-list__info-count">{editorDataset.data.length}</span>行数据
            </>
          ) : (
            editorDataset?.metadata.description
          )}
        </div>
      </div>

      <Space className="li-dataset-list__actions" onClick={(e) => e.stopPropagation()}>
        <Tooltip title="点击修改数据集名称">
          <FormOutlined
            className={classnames('li-dataset-list__actions-item_hide', 'li-dataset-list__actions-item_show')}
            onClick={() => {
              setIsEditName(true);
            }}
          />
        </Tooltip>
        <Popconfirm
          title={
            <div>
              <span>你确定要删除{datasetSchema.metadata.name}吗</span>
              {getDelLayersCount(datasetSchema.id) ? (
                <p className="li-dataset-list__popconfirm-title">
                  删掉此数据集，会删除与此数据集关联的
                  <span className="li-dataset-list__popconfirm-layers-count">
                    {getDelLayersCount(datasetSchema.id)}
                  </span>
                  个图层
                </p>
              ) : null}
            </div>
          }
          placement="bottom"
          onConfirm={onDeleteDataset}
          okText="确定"
          cancelText="取消"
        >
          <Tooltip title="删除数据集" placement="top">
            <DeleteOutlined
              className={classnames('li-dataset-list__actions-item_hide', 'li-dataset-list__actions-item_show')}
              onClick={(e) => e.stopPropagation()}
            />
          </Tooltip>
        </Popconfirm>
        {isLocalOrRemoteDataSource && (
          <Tooltip title="点击查看数据集详情">
            <InsertRowAboveOutlined
              onClick={() => {
                onPreviewDataset(datasetSchema.id);
              }}
            />
          </Tooltip>
        )}
        <Dropdown menu={{ items: dropDownItems }}>
          <MoreOutlined />
        </Dropdown>
        {messageContextHolder}
      </Space>
    </div>
  );
};

export default DatasetItem;
