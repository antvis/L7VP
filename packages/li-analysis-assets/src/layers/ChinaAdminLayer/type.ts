export type ChinaAdminLayerSource = {
  /** 数据 */
  data: Record<string, any>[];
  countryAdConfig: {
    countryGranularity: 'province' | 'city';
    countryAdType: 'adcode' | 'adname';
    countryAdField: string;
  };
};
