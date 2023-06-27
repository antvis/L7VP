import { CustomControl } from '@antv/larkmap';
import type { WidgetRegisterForm } from '@antv/li-sdk';
import {
  getDatasetSelectFormSchema,
  getServiceSelectFormSchema,
  implementWidget,
  isLocalOrRemoteDataset,
  useDataset,
} from '@antv/li-sdk';
import { useRegistryManager } from '@antv/li-sdk/dist/esm/hooks/internal';
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useState } from 'react';

/**
 * 属性面板生产的数据类型定义
 */
export type DataseInforProperties = {
  datasetId: string;
};

export const DataseInfor = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'DataseInfor',
    displayName: '数据源信息',
    description: '数据源消费组件',
    type: 'Atom',
    category: 'DataAnalysis',
  },
  component: function DataseServiceInfor({ datasetId }: DataseInforProperties) {
    const [dataset] = useDataset(datasetId);

    return (
      <div style={{ height: '100%', overflow: 'auto' }}>
        {JSON.stringify(dataset && isLocalOrRemoteDataset(dataset) ? dataset.data : [])}
      </div>
    );
  },
  registerForm: (props): WidgetRegisterForm<DataseInforProperties> => {
    return {
      schema: {
        ...getDatasetSelectFormSchema(props, 'datasetId', '关联的数据源'),
      },
    };
  },
});

/**
 * 属性面板生产的数据类型定义
 */
export type LocationSearchControlProperties = {
  serviceName?: string;
};

export const LocationSearchControl = implementWidget({
  version: 'v0.1',
  metadata: {
    name: 'LocationSearchControl',
    displayName: '位置查询',
    description: '查询附近商圈学校公园等',
    type: 'Auto',
    category: 'MapControl',
  },
  component: function LocationSearchControl({ serviceName }: LocationSearchControlProperties) {
    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();
    const registryManager = useRegistryManager();
    const implementService = registryManager.getService(serviceName || '');

    const handleSearch = (newValue: string) => {
      if (newValue) {
        implementService.service({ keyword: newValue }).then((res) => {
          setData(res.tips.map((d: any) => ({ value: d.id, label: d.address })));
        });
      } else {
        setData([]);
      }
    };

    const handleChange = (newValue: string) => {
      setValue(newValue);
    };

    return (
      <CustomControl position="topleft">
        <Select
          placeholder="请输入关键字"
          style={{ width: 350 }}
          showSearch
          value={value}
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={handleChange}
          notFoundContent={null}
          options={data}
        />
      </CustomControl>
    );
  },
  registerForm: (props): WidgetRegisterForm<LocationSearchControlProperties> => {
    return {
      schema: {
        ...getServiceSelectFormSchema(props, 'serviceName', '关联的服务'),
      },
    };
  },
});
