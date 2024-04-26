import type { AssetPackageSpec } from '@antv/li-sdk';
import dayjs from 'dayjs';
import localforage from 'localforage';
import { getUid } from '@/utils';
import { BUILTIN_ASSET_PACKAGES } from '@/constants';

export type AssetPackage = AssetPackageSpec & {
  assetId: string;
  creatTime: string;
  npmMirror?: string;
  enable?: boolean;
};

export type AssetPackageParams = Omit<AssetPackage, 'assetId' | 'creatTime'>;

const ASSET_PACKAGES_KEY = 'ASSETS';

/**
 * 更新列表
 */
const updateAssetPackageList = (assets: AssetPackage[]) => {
  return localforage.setItem(ASSET_PACKAGES_KEY, assets);
};

/**
 * 获取资产包列表
 */
export const getAssetPackageList = async (builtin_asset_pakages = true) => {
  const assets = await localforage.getItem<AssetPackage[]>(ASSET_PACKAGES_KEY);

  const _assets = builtin_asset_pakages ? BUILTIN_ASSET_PACKAGES.concat(assets || []) : assets || [];

  return _assets;
};

/**
 * 创建资产包列表
 */
export const createAssetPackage = async (params: AssetPackageParams) => {
  const assetId = getUid();
  const creatTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  const asset: AssetPackage = {
    ...params,
    assetId,
    creatTime,
  };

  const assets = await getAssetPackageList(false);

  const newAssets = assets.concat(asset);

  await updateAssetPackageList(newAssets);

  return asset;
};

/**
 * 通过 ID 获取资产包
 */
export const getAssetPackage = async (id: string) => {
  const assets = await getAssetPackageList();
  const asset = assets.find((item) => item.assetId === id);

  if (asset === undefined) {
    return Promise.reject('资产包 ID 不存在');
  }

  return asset;
};

/**
 * 通过 ID 更新资产包
 */
export const updateAssetPackage = async (id: string, params: AssetPackageParams) => {
  const assets = await getAssetPackageList(false);
  const index = assets.findIndex((asset) => asset.assetId === id);

  if (index === -1) {
    return Promise.reject('资产包 ID 不存在');
  }

  const asset = assets[index];

  const newAsset: AssetPackage = { ...asset, ...params };
  assets[index] = newAsset;

  await updateAssetPackageList(assets);

  return newAsset;
};

/**
 * 通过 ID 删除资产包
 */
export const deleteAssetPackage = async (id: string) => {
  const assets = await getAssetPackageList(false);
  const index = assets.findIndex((asset) => asset.assetId === id);

  if (index === -1) {
    return Promise.reject('资产包 ID 不存在');
  }

  const asset = assets.splice(index, 1);

  await updateAssetPackageList(assets);

  return asset;
};
