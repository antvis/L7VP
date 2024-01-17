import { Empty } from 'antd';
import classnames from 'classnames';
import { isEmpty } from 'lodash-es';
import React from 'react';
import { useEditorState, usePrefixCls } from '../../../hooks';
import DatasetItem from './DatasetItem';
import useStyle from './style';

export type DatasetListProps = {
  className?: string;
  onReplaceDataset: (datasetId: string) => void;
  onPreviewDataset: (datasetId: string) => void;
};

export default function DatasetList(props: DatasetListProps) {
  const { state } = useEditorState();
  const { datasets } = state;
  const prefixCls = usePrefixCls('dataset-list');
  const styles = useStyle();

  if (isEmpty(datasets)) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无数据，请先添加数据集" />;
  }

  return (
    <div className={classnames(prefixCls, styles.datasetList, props.className)}>
      {datasets.map((item) => {
        return (
          <DatasetItem
            key={item.id}
            dataset={item}
            onReplaceDataset={props.onReplaceDataset}
            onPreviewDataset={props.onPreviewDataset}
          />
        );
      })}
    </div>
  );
}
