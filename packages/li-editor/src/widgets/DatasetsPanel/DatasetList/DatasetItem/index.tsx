import { DeleteOutlined, FormOutlined, InsertRowAboveOutlined, MoreOutlined } from '@ant-design/icons';
import type { DatasetSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import type { MenuProps } from 'antd';
import { Dropdown, message, Popconfirm, Space, Tooltip } from 'antd';
import classnames from 'classnames';
import { downloadText } from 'download.js';
import React, { useState } from 'react';
import DatasetName from '../../../../components/EditName';
import { useEditorDataset, useEditorState, usePrefixCls } from '../../../../hooks';
import useStyle from './style';

export type DatasetItemProps = {
  className?: string;
  onReplaceDataset: (datasetId: string) => void;
  onPreviewDataset: (datasetId: string) => void;
  dataset: DatasetSchema;
};

const DatasetItem = (props: DatasetItemProps) => {
  const { dataset: datasetSchema, onReplaceDataset, onPreviewDataset, className } = props;
  const { state, updateState } = useEditorState();
  const prefixCls = usePrefixCls('dataset-list');
  const styles = useStyle();
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
    return state.layers.filter((layer) => layer.sourceConfig.datasetId === dataSourceID).length;
  };

  const onDeleteDataset = () => {
    updateState((draft) => {
      const delDataIndex = draft.datasets.findIndex((source) => source.id === datasetSchema.id);
      draft.layers = draft.layers.filter((layer) => layer.sourceConfig.datasetId !== datasetSchema.id);
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
    <div className={classnames(`${prefixCls}__card`, styles.listCard, className)}>
      <div className={classnames(`${prefixCls}__info`, styles.listInfo)}>
        <DatasetName
          name={datasetSchema.metadata.name}
          isEdit={isEditName}
          onChange={onChangeName}
          onCancel={() => {
            setIsEditName(false);
          }}
        />

        <div
          className={classnames(`${prefixCls}__info-name`, styles.infoName)}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {isLocalOrRemoteDataSource ? (
            <>
              共
              <span className={classnames(`${prefixCls}__info-count`, styles.infoCount)}>
                {editorDataset.data.length}
              </span>
              行数据
            </>
          ) : (
            editorDataset?.metadata.description
          )}
        </div>
      </div>

      <Space className={classnames(`${prefixCls}__actions`, styles.listActions)} onClick={(e) => e.stopPropagation()}>
        <Tooltip title="点击修改数据集名称">
          <FormOutlined
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
                <p className={classnames(`${prefixCls}__popconfirm-title`, styles.popconfirmTitle)}>
                  删掉此数据集，会删除与此数据集关联的
                  <span className={classnames(`${prefixCls}__popconfirm-layers-count`, styles.popconfirmLayersCount)}>
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
            <DeleteOutlined onClick={(e) => e.stopPropagation()} />
          </Tooltip>
        </Popconfirm>
        {isLocalOrRemoteDataSource && (
          <Tooltip title="点击查看数据集详情">
            <InsertRowAboveOutlined
              className={classnames(`${prefixCls}__actions-item_show`)}
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
