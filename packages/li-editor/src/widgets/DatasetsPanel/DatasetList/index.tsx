import { Empty } from 'antd';
import classnames from 'classnames';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useEditorState } from '../../../hooks';
import DatasetItem from './DatasetItem';
import './index.less';

export type DatasetListProps = {
  className?: string;
  onPreviewDataset: (datasetId: string) => void;
};

export default function DatasetList(props: DatasetListProps) {
  const { state } = useEditorState();
  const { datasets } = state;

  if (isEmpty(datasets)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据，请先添加数据集" />;
  }

  return (
    <div className={classnames('li-dataset-list', props.className)}>
      {datasets.map((item) => {
        return <DatasetItem key={item.id} dataset={item} onPreviewDataset={props.onPreviewDataset} />;
      })}
    </div>
  );
}
