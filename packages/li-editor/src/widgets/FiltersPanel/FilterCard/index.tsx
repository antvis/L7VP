import { DatabaseOutlined, DeleteOutlined } from '@ant-design/icons';
import { FilterList } from '@antv/li-p2';
import type { DatasetFilter, FilterNode, LocalDatasetSchema, RemoteDatasetSchema } from '@antv/li-sdk';
import { getDatasetFields } from '@antv/li-sdk';
import { Button, Card, Popconfirm, Select, theme } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useEditorDataset, useEditorState, usePrefixCls } from '../../../hooks';
import useStyle from './style';

type FilterCardProps = {
  id: string;
  datasetOptions: { value: string; label: string }[];
  selectedDatasets: string[];
  onDatasetIdChange: (id: string) => void;
  onDel: () => void;
};

const { useToken } = theme;

const FilterCard = ({ id: datasetId, datasetOptions, selectedDatasets, onDatasetIdChange, onDel }: FilterCardProps) => {
  const prefixCls = usePrefixCls('filter-widget-card');
  const styles = useStyle();
  const { token } = useToken();
  const editorDataset = useEditorDataset(datasetId);
  const filter = editorDataset?.filter;
  const columns = useMemo(() => (editorDataset ? getDatasetFields(editorDataset.columns) : []), [editorDataset]);
  // 考虑性能，只取前 50000 条数据
  const _data = useMemo(() => (editorDataset ? editorDataset.data.slice(0, 50000) : []), [editorDataset]);

  const { updateState } = useEditorState();

  const addFilterNode = (filterNode: FilterNode, filterLogicalOperator?: DatasetFilter['relation']) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) {
        const _dataset = draft.datasets[index] as LocalDatasetSchema | RemoteDatasetSchema;
        if (_dataset.filter) {
          _dataset.filter.children.push(filterNode);
        } else {
          _dataset.filter = { relation: filterLogicalOperator || 'AND', children: [filterNode] };
        }
      }
    });
  };

  const updateFilterNode = (filterId: string, filterNode: Partial<Omit<FilterNode, 'id'>>) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) {
        const _dataset = draft.datasets[index] as LocalDatasetSchema | RemoteDatasetSchema;
        if (_dataset.filter) {
          const _index = _dataset.filter.children.findIndex((item) => item.id === filterId);
          if (_index !== -1)
            _dataset.filter.children[_index] = { ..._dataset.filter.children[_index], ...filterNode } as FilterNode;
        }
      }
    });
  };

  const removeFilterNode = (filterId: string) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) {
        const _dataset = draft.datasets[index] as LocalDatasetSchema | RemoteDatasetSchema;
        if (_dataset.filter) {
          const _index = _dataset.filter.children.findIndex((item) => item.id === filterId);
          if (_index !== -1) _dataset.filter.children.splice(_index, 1);
        }
      }
    });
  };

  const relation = filter?.relation ?? 'AND';
  const filterNodes = filter?.children ?? [];

  const datasetsOption: DefaultOptionType[] = datasetOptions.map((item) => ({
    label: (
      <span>
        <DatabaseOutlined style={{ marginRight: 5, color: token.colorPrimary }} />
        {item.label}
      </span>
    ),
    title: item.label,
    value: item.value,
    disabled: selectedDatasets.includes(item.value) && item.value !== datasetId,
  }));

  const onRelationChange = (val: DatasetFilter['relation']) => {
    updateState((draft) => {
      const index = draft.datasets.findIndex((item) => item.id === datasetId);
      if (index !== -1) (draft.datasets[index] as LocalDatasetSchema | RemoteDatasetSchema).filter!.relation = val;
    });
  };

  const onDelFilter = () => {
    onDel();
  };

  const CardTitle = (
    <Select
      showSearch
      className={classNames(`${prefixCls}__select`, styles.filterCardSelect)}
      size="small"
      placeholder="请选择数据集"
      value={datasetId}
      options={datasetsOption}
      filterOption={(input, option) => (option?.title ?? '').includes(input)}
      onChange={(dataId: string) => onDatasetIdChange(dataId)}
    />
  );

  return (
    <Card
      className={classNames(prefixCls, styles.filterCard)}
      title={CardTitle}
      headStyle={{ padding: '0 16px', borderLeft: `3px solid ${token.colorPrimary}` }}
      bodyStyle={{ padding: 0 }}
      extra={
        <>
          <Select
            value={relation}
            size="small"
            style={{ width: 65, marginLeft: 10 }}
            options={[
              { label: '并且', value: 'AND' },
              { label: '或者', value: 'OR' },
            ]}
            onChange={(val: DatasetFilter['relation']) => onRelationChange(val)}
          />
          <Popconfirm title="确定要删除此筛选器？" onConfirm={onDelFilter} okText="确定" cancelText="取消">
            <Button type="link" icon={<DeleteOutlined style={{ color: '#c0c0c0', opacity: 0.6 }} />} />
          </Popconfirm>
        </>
      }
    >
      <FilterList
        filterNodes={filterNodes}
        data={_data}
        columns={columns}
        // @ts-ignore
        addFilterNode={addFilterNode}
        updateFilterNode={updateFilterNode}
        removeFilterNode={removeFilterNode}
      />
    </Card>
  );
};

export default FilterCard;
