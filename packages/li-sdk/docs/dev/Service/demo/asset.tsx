import type { AssetPackage, RemoteDataset } from '@antv/li-sdk';
import { implementWidget, useDataset, useDatasetFilter } from '@antv/li-sdk';
import React from 'react';
import MyLayout from './MyLayout';
import { services } from './services';

const DisplayWidget = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'DisplayWidget',
    displayName: '自定义组件',
    description: '',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component: function CustomWidget({ datasetId }: { datasetId: string }) {
    const [dataset] = useDataset(datasetId);
    const [filter, { addFilterNode, updateFilter }] = useDatasetFilter(datasetId);
    console.log('filter: ', filter);

    // useEffect(() => {
    //   setInterval(() => {
    //     updateFilter({
    //       relation: 'AND',
    //       children: [{ id: 'dd', type: 'string', field: 'name', operator: 'LIKE', value: 'aa' }],
    //     });
    //     // addFilterNode({ id: 'cc', type: 'string', field: 'name', operator: 'LIKE', value: 'a' });
    //   }, 1000 * 5);
    // }, []);

    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        {JSON.stringify((dataset as RemoteDataset)?.data, null, 2)}
      </div>
    );
  },
});

const widgets = [MyLayout, DisplayWidget];

const asset: AssetPackage = {
  version: 'v0.1',
  layers: [],
  widgets,
  services,
};

export default asset;
