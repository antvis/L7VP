import { BuiltInImageList } from './constant';
import type { CustomMappingDataItem, IconScaleSelectorValue } from './type';

// 获取默认展示自定义数据
export const getDefaultValue = (defaultDomain: string[]) => {
  const _options = defaultDomain.length > 5 ? defaultDomain.slice(0, 5) : defaultDomain;
  const defaultValue = _options.map((item, index) => {
    return {
      id: BuiltInImageList[index].id,
      value: item,
      name: BuiltInImageList[index].name,
      url: BuiltInImageList[index].url,
    };
  });

  return defaultValue;
};

// 通过自定义图标映射转换为 Scale 的数据格式
export const getScaleByCustomMappingData = (scaleList: CustomMappingDataItem[] = [], unknown: string) => {
  const scaleValue: IconScaleSelectorValue = {
    domain: scaleList.map((item: CustomMappingDataItem) => item.value),
    range: scaleList.map((item: CustomMappingDataItem) => item.id),
    unknown,
  };

  return scaleValue;
};

// 通过 Scale 的数据格式转换为自定义图标映射
export const getCustomMappingData = (val: IconScaleSelectorValue) => {
  const { domain = [], range = [] } = val;

  const customMappingData: CustomMappingDataItem[] = range.map((_item: string, index: number) => {
    const _icon = BuiltInImageList.find((item) => item.id === _item) || BuiltInImageList[0];
    return {
      id: _icon.id,
      url: _icon.url,
      name: _icon.name,
      value: domain?.[index],
    };
  });

  return customMappingData;
};
