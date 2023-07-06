import { isLocalOrRemoteDataset } from '@antv/li-sdk';
import { Modal, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { uniqueId } from 'lodash-es';
import React, { useState } from 'react';
import { useEditorDatasets } from '../../hooks';
import type { ImplementEditorPreviewDatasetWidgetProps } from '../../types';
import './DatasetPreview.less';
import TypeTag from './TypeTag';

type DatasetPreviewProps = ImplementEditorPreviewDatasetWidgetProps;

const DatasetPreview = (props: DatasetPreviewProps) => {
  const { datasetId, visible, onCancel } = props;
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });
  const [dataset] = useEditorDatasets([datasetId]);

  if (!isLocalOrRemoteDataset(dataset)) {
    return null;
  }

  const { data: tableData = [], columns: tableColumns = [] } = dataset;

  const columns = () => {
    const fieldLists: ColumnsType<any> = [
      {
        title: ' 序号 ',
        width: 70,
        fixed: 'left',
        render(_text: any, _record: any, index: number) {
          return `${(pagination.current - 1) * pagination.pageSize + (index + 1)}`;
        },
      },
    ];
    tableColumns?.forEach((item) => {
      fieldLists.push({
        key: item.name,
        dataIndex: item.name,
        width: 150,
        ellipsis: true,
        render(value: any) {
          if (typeof value === 'object') {
            return (
              <Tooltip title={JSON.stringify(value)}>
                <span className="li-dataset-preview__clamp">{JSON.stringify(value)}</span>
              </Tooltip>
            );
          } else if (typeof value === 'string') {
            return value.length > 20 ? (
              <Tooltip title={value}>
                <span className="li-dataset-preview__clamp">{value}</span>
              </Tooltip>
            ) : (
              <span className="li-dataset-preview__clamp">{value}</span>
            );
          } else {
            return <span className="li-dataset-preview__clamp">{value}</span>;
          }
        },
        title() {
          return (
            <div className="li-dataset-preview__column-title">
              <TypeTag type={item.type} />
              <span title={item.name}>{item.name}</span>
            </div>
          );
        },
      });
    });
    return fieldLists;
  };

  return (
    <Modal
      className="li-dataset-preview"
      title={`${dataset?.metadata.name}`}
      open={visible}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
      width={'calc(100vw - 200px)'}
      footer={false}
      onCancel={() => onCancel()}
    >
      <Table
        className="li-dataset-preview__table"
        dataSource={tableData}
        rowKey={(record) => uniqueId(`location-insight${record.id}`)}
        bordered
        sticky
        size="small"
        columns={columns()}
        scroll={{ x: 380, y: 'calc(80vh - 100px)' }}
        pagination={{
          showSizeChanger: false,
          showQuickJumper: true,
          showTitle: true,
          pageSize: pagination.pageSize,
          onChange: (current, pageSize) => {
            setPagination({ current, pageSize });
          },
          showTotal: (count) => {
            return <span>{count}条</span>;
          },
        }}
      />
    </Modal>
  );
};

export default DatasetPreview;
