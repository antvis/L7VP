import { CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import { CustomControl, LineLayer } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { useScene } from '@antv/li-sdk';
import { Button, message, Popover, Select, Spin, Tabs } from 'antd';
import cls from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { BoundsUrl, CityUrl, CLS_PREFIX, POPOVER_PLACEMENT_LEGEND } from '../constant';
import { parserCityData, treeToArr } from '../helper';
import type { Properties } from '../registerForm';
import type { ICity, IData } from '../types';
import { CityContent } from './CityView';
import { ProvinceContent } from './ProvinceView';
import useStyle from './style';

export interface AreaWidgetProps extends ImplementWidgetProps, Properties {}

export default (props: AreaWidgetProps) => {
  const [scene] = useScene();
  const { position, showBounds } = props;
  const style = useStyle();
  const [regionName, setRegionName] = useState('全国');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [cityData, setCityData] = useState<IData>();
  const [boundBorder, setBoundBorder] = useState();

  useEffect(() => {
    fetch(CityUrl)
      .then((res) => res.json())
      .then((res) => {
        setCityData(parserCityData(res) as IData);
      });
  }, []);

  const selectOptions = () => {
    if (!cityData) return [];
    return treeToArr([cityData.cities]).map((item) => {
      return {
        value: JSON.stringify(item),
        label: `${item.name}(${item.spell})`,
      };
    });
  };

  const getBoundsData = (value: ICity) => {
    if (value.level === 'country') return;
    setLoading(true);
    const code = value.adcode;
    const level = value.level;
    fetch(`${BoundsUrl}${level}/${code}_${level}_${level}.json`)
      .then((item) => item.json())
      .then((res) => {
        setLoading(false);
        if (showBounds) {
          setBoundBorder(res);
          return;
        }

        if (scene && cityData) {
          const data = treeToArr([cityData.cities]).find((item: ICity) => item.name === value.name);
          if (data) {
            scene.setZoomAndCenter(11, [data.lng, data.lat]);
          }
        }
      })
      .catch(() => {
        setLoading(false);
        message.error('围栏数据请求失败');
      });
  };

  const onSelectChange = (value: string) => {
    const newValue = JSON.parse(value || '');
    setOpen(false);
    setRegionName(newValue.name);
    if (newValue) getBoundsData(newValue);
  };

  const onClickItem = (v: ICity) => {
    setOpen(false);
    setRegionName(v.shortName || v.name);
    if (v) getBoundsData(v);
  };

  const items = [
    {
      label: '按省份',
      key: 'province',
      children: <ProvinceContent onClickItem={onClickItem} cityData={cityData as IData} />,
    },
    {
      label: '按城市',
      key: 'city',
      children: <CityContent onClickItem={onClickItem} cityData={cityData as IData} />,
    },
  ];

  const extraContent = (
    <Select
      popupClassName={style.selectOption}
      size="small"
      showSearch
      placeholder="请输入城市"
      optionFilterProp="children"
      onChange={onSelectChange}
      style={{ width: 150 }}
      filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
      options={selectOptions()}
    />
  );

  const content = (
    <div className={cls(`${CLS_PREFIX}__content`)}>
      <div className={cls(`${CLS_PREFIX}__content-header`, style.tabContentTitle)}>
        {cityData &&
          cityData.hotCities.map((hot) => {
            return (
              <div
                key={hot.name}
                onClick={() => onClickItem(hot as ICity)}
                className={cls(`${CLS_PREFIX}__content-header-item`, style.tabContentItem)}
              >
                {hot.shortName}
              </div>
            );
          })}
      </div>
      <Tabs
        size="small"
        defaultActiveKey="province"
        tabBarExtraContent={extraContent}
        items={items}
        destroyInactiveTabPane
      />
    </div>
  );

  const onPlacement = useMemo(() => {
    return POPOVER_PLACEMENT_LEGEND.get(position);
  }, [position]);

  const onRest = () => {
    setRegionName('全国');
    setBoundBorder(undefined);
  };

  const getTitle = () => {
    return (
      <div className={style.popoverName}>
        <div>所在区域:{regionName.replace('市', '').replace('省', '')}</div>
        <Button type="text" size="small" icon={<CloseOutlined />} onClick={() => onRest()} style={{ marginLeft: 8 }} />
      </div>
    );
  };

  return (
    <CustomControl position={position} className={CLS_PREFIX}>
      <Popover
        overlayClassName={cls(`${CLS_PREFIX}__popover`, style.popover)}
        placement={onPlacement}
        title={getTitle()}
        content={content}
        open={open}
        onOpenChange={setOpen}
        trigger="click"
        destroyTooltipOnHide
      >
        <Spin spinning={loading}>
          <div className={cls(`${CLS_PREFIX}`, style.popoverContent)}>
            <div className={cls(`${CLS_PREFIX}__title`, style.popoverTitle)}>
              <div className={cls(`${CLS_PREFIX}__title-name`, style.popoverTitleName)}>
                {regionName.replace('市', '').replace('省', '')}
              </div>
              <CaretDownOutlined rotate={open ? 180 : 0} />
            </div>
          </div>
        </Spin>
      </Popover>
      {showBounds && boundBorder ? (
        <LineLayer autoFit source={{ data: boundBorder }} shape="line" size={1} color="rgb(213,48,55)" />
      ) : null}
    </CustomControl>
  );
};
