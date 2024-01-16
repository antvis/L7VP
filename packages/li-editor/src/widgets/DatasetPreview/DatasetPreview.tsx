import { Modal, Table, Tooltip } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import { uniqueId } from 'lodash-es';
import React, { useState } from 'react';
import classNames from 'classnames';
import { useEditorDataset, usePrefixCls } from '../../hooks';
import type { ImplementEditorPreviewDatasetWidgetProps } from '../../types';
import TypeTag from './TypeTag';
import useStyle from './style';

type DatasetPreviewProps = ImplementEditorPreviewDatasetWidgetProps;

const DatasetPreview = (props: DatasetPreviewProps) => {
  const { datasetId, visible, onCancel } = props;
  const [pagination, setPagination] = useState({ current: 1, pageSize: 50 });
  const editorDataset = useEditorDataset(datasetId);
  const prefixCls = usePrefixCls('dataset-preview');
  const styles = useStyle();

  if (!editorDataset?.isLocalOrRemoteDataset) {
    return null;
  }

  const { data: tableData = [], columns: tableColumns = [] } = editorDataset;

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
                <span className={classNames(`${prefixCls}__clamp`, styles.datasetPreviewClamp)}>
                  {JSON.stringify(value)}
                </span>
              </Tooltip>
            );
          } else if (typeof value === 'string') {
            return value.length > 20 ? (
              <Tooltip title={value}>
                <span className={classNames(`${prefixCls}__clamp`, styles.datasetPreviewClamp)}>{value}</span>
              </Tooltip>
            ) : (
              <span className={classNames(`${prefixCls}__clamp`, styles.datasetPreviewClamp)}>{value}</span>
            );
          } else {
            return <span className={classNames(`${prefixCls}__clamp`, styles.datasetPreviewClamp)}>{value}</span>;
          }
        },
        title() {
          return (
            <div className={classNames(`${prefixCls}__clamp-title`, styles.datasetPreviewClampTitle)}>
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
      className={classNames(prefixCls, styles.datasetPreview)}
      title={`${editorDataset.metadata.name}`}
      open={visible}
      destroyOnClose
      width={'calc(100vw - 200px)'}
      footer={null}
      onCancel={() => onCancel()}
    >
      <Table
        className={classNames(`${prefixCls}__table`, styles.datasetPreviewTable)}
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
