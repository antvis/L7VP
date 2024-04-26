import { FilterOutlined } from '@ant-design/icons';
import { getMarketWidgetCategory } from '@antv/li-editor';
import type { ImplementLayer, ImplementWidget } from '@antv/li-sdk';
import { Button, Checkbox, Empty, Popover, Spin } from 'antd';
import type { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useEffect, useMemo, useState } from 'react';
import { ComponentIcon, LayerIcon } from './constant';
import Content from './Content';
import { getLayersWidgets } from './helper';
import useStyle from './style';
import { useMarketAssets } from '@/hooks';

export type WidgetItem = ImplementWidget & { packageName: string; packageVersion: string };
export type LayerItem = ImplementLayer & { packageName: string; packageVersion: string };

const Components = (props: { className?: string }) => {
  const { assets, loading } = useMarketAssets(undefined, { isLoadStyle: false, sandbox: true });
  const styles = useStyle();
  const assetList = useMemo(() => {
    return assets.map((item) => item.metadata?.name ?? '');
  }, [assets]);
  const [filterAsses, setFilterAsses] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    setFilterAsses(assetList);
  }, [assetList]);

  const { layers, widgets } = useMemo(() => {
    const { layers, widgets } = getLayersWidgets(assets);

    const _layers = layers.filter((item) => filterAsses.includes(item.packageName));
    const _widgets = widgets.filter((item) => filterAsses.includes(item.packageName));

    return { layers: _layers, widgets: _widgets };
  }, [assets, filterAsses]);

  const widgetCategoryList = useMemo(() => {
    if (!widgets) return [];
    const categoryList = getMarketWidgetCategory(widgets);

    return categoryList;
  }, [widgets]);

  const onCheckedMyWidgets = (value: CheckboxValueType[]) => {
    setFilterAsses(value);
  };

  const FilterPopoverContent = (
    <div className={styles.filterAssetPopover}>
      <p className={styles.filterAssetPopoverTitle}>资产包</p>

      <Checkbox.Group value={filterAsses} onChange={onCheckedMyWidgets} className={styles.filterAssetPopoverCheckbox}>
        {assetList.map((item, index) => (
          <Checkbox key={index} value={item} className={styles.filterAssetPopoverCheckboxItem}>
            {item}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <div className={styles.filterAssetPopoverBtn}>
        <Button
          size="small"
          type="primary"
          onClick={() => {
            if (assets.length === filterAsses.length) {
              return setFilterAsses([]);
            }
            setFilterAsses(assetList);
          }}
        >
          {assets.length === filterAsses.length ? '重置' : '全选'}
        </Button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 50px' }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={props.className}>
      <Popover arrow={false} content={FilterPopoverContent} trigger="hover" placement="leftTop">
        <Button type="primary" ghost className={styles.assetsFilterBtn} icon={<FilterOutlined />}>
          筛选
        </Button>
      </Popover>

      {layers.length ? (
        <div className={styles.assetMarketModule}>
          <p className={styles.assetMarketModuleTitle}>可视化图层组件</p>
          <Content key="layers" list={layers} icon={LayerIcon} />
        </div>
      ) : null}

      {widgetCategoryList?.map((item) => {
        if (item.widgets.length) {
          return (
            <div key={item.category} className={styles.assetMarketModule}>
              <p className={styles.assetMarketModuleTitle}>{item.categoryName}</p>
              <Content key="widgets" list={item.widgets as WidgetItem[]} icon={ComponentIcon} />
            </div>
          );
        }
      })}

      {!layers.length && !widgets.length && (
        <div className={styles.assetMarkeEmpty}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无组件" />
        </div>
      )}
    </div>
  );
};

export default Components;
