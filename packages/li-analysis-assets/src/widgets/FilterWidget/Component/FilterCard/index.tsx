import { DatabaseOutlined, DeleteOutlined } from '@ant-design/icons';
import { FilterList } from '@antv/li-p2';
import type { DatasetFilter } from '@antv/li-sdk';
import { getDatasetFields, isLocalOrRemoteDataset, useDataset, useDatasetFilter } from '@antv/li-sdk';
import { Button, Card, Popconfirm, Select, theme } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import { isUndefined, startsWith } from 'lodash-es';
import React, { useMemo, useState } from 'react';
import './index.less';

const { useToken } = theme;
const CLS_PREFIX = 'li-analysis-filter-widget-card';

export const UNSELECTED_DATASET_ID = 'UNSELECTED_DATASET_ID';
const isUnselectedDataset = (id: string) => startsWith(id, UNSELECTED_DATASET_ID);
const EMPTY_DATASET_FILTER: DatasetFilter = { relation: 'AND', children: [] };

type FilterCardProps = {
  id: string;
  datasetOptions: { id: string; name: string }[];
  selectedDatasets: string[];
  onDel: () => void;
};

const FilterCard = ({ id, datasetOptions, selectedDatasets, onDel }: FilterCardProps) => {
  const { token } = useToken();
  const [datasetId, setDatasetId] = useState(id);
  // TODO: 筛选条件不进行筛选自己，获取全量数据
  const [dataset] = useDataset(datasetId, { filter: EMPTY_DATASET_FILTER });
  const columns = useMemo(() => (dataset && isLocalOrRemoteDataset(dataset) ? getDatasetFields(dataset.columns) : []), [
    dataset,
  ]);
  // 考虑性能，只取前 50000 条数据
  const _data = useMemo(() => (dataset && isLocalOrRemoteDataset(dataset) ? dataset.data.slice(0, 50000) : []), [
    dataset,
  ]);
  const [filter, { addFilterNode, updateFilterNode, removeFilterNode, updateFilter, clearFilter }] = useDatasetFilter(
    datasetId,
  );
  const relation = filter?.relation ?? 'AND';
  const filterNodes = filter?.children ?? [];

  const datasetsOption: DefaultOptionType[] = datasetOptions.map((item) => ({
    label: (
      <span>
        <DatabaseOutlined style={{ marginRight: 10, color: token.colorPrimary }} />
        {item.name}
      </span>
    ),
    value: item.id,
    disabled: selectedDatasets.includes(item.id) && item.id !== datasetId,
  }));

  const onRelationChange = (val: DatasetFilter['relation']) => {
    updateFilter({ relation: val, children: filterNodes });
  };

  const onDelFilter = () => {
    if (!isUnselectedDataset(datasetId)) {
      clearFilter();
    }
    onDel();
  };

  const onDataSourceIdChange = (dataId: string) => {
    setDatasetId(dataId);
  };

  const CardTitle = (
    <Select
      className={`${CLS_PREFIX}__select`}
      size="small"
      placeholder="请选择数据集"
      disabled={!isUndefined(filter)}
      value={isUnselectedDataset(datasetId) ? undefined : datasetId}
      options={datasetsOption}
      onChange={(dataId: string) => onDataSourceIdChange(dataId)}
    />
  );

  return (
    <Card
      className={`${CLS_PREFIX}`}
      title={CardTitle}
      headStyle={{ padding: '0 16px', borderLeft: `3px solid ${token.colorPrimary}` }}
      bodyStyle={{ padding: 0 }}
      extra={
        <>
          <Select
            value={relation}
            size="small"
            disabled={isUnselectedDataset(datasetId)}
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
      {!isUnselectedDataset(datasetId) && (
        <FilterList
          filterNodes={filterNodes}
          data={_data}
          columns={columns}
          addFilterNode={addFilterNode}
          updateFilterNode={updateFilterNode}
          removeFilterNode={removeFilterNode}
        />
      )}
    </Card>
  );
};

export default FilterCard;
