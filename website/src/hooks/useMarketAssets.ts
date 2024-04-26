import type { AssetPackage, LoadAssetPackageSpecOptions } from '@antv/li-sdk';
import { loadAssetPackages } from '@antv/li-sdk';
import { useDeepCompareEffect } from 'ahooks';
import { isObject } from 'lodash-es';
import { useState } from 'react';
import { getAssetDepExternalEnv } from '@/utils';
import { getAssetPackageList } from '@/services';

export const useMarketAssets = (assetPackageIds?: string[], options: LoadAssetPackageSpecOptions = {}) => {
  const [assets, setAssets] = useState<AssetPackage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      let assetPackages = await getAssetPackageList();
      // 过滤按需加载的资产包
      if (Array.isArray(assetPackageIds)) {
        assetPackages = assetPackages.filter((asset) => assetPackageIds.includes(asset.assetId));
      }
      // 过滤未开启加载的资产包
      assetPackages = assetPackages.map((asset) => {
        if (asset.enable === false) return { ...asset, urls: [] };
        return asset;
      });
      const sandbox = options.sandbox
        ? { ...(isObject(options.sandbox) ? options.sandbox : {}), injectEnv: getAssetDepExternalEnv() }
        : false;
      const _assets = await loadAssetPackages(assetPackages, { ...options, sandbox });
      setAssets(_assets);
    } catch (e) {
      setError(new Error(`资产请求或加载失败, ${e}`));
    } finally {
      setLoading(false);
    }
  };

  useDeepCompareEffect(() => {
    fetchAssets();
  }, [assetPackageIds]);

  return {
    assets,
    loading,
    error,
  };
};
