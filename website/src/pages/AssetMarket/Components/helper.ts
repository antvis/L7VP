import type { AssetPackage, Metadata } from '@antv/li-sdk';

export const getLayersWidgets = (assets: AssetPackage[]) => {
  const _layers = [];
  const _widgets = [];
  for (let i = 0; i < assets.length; i++) {
    const item: AssetPackage = assets[i];
    const metadata: Metadata = item.metadata || { name: '' };

    _layers.push(
      ...item.layers.map((layer) => ({
        ...layer,
        packageName: metadata.name,
        packageVersion: metadata.version,
      })),
    );
    _widgets.push(
      ...item.widgets.map((widget) => ({
        ...widget,
        packageName: metadata.name,
        packageVersion: metadata.version,
      })),
    );
  }

  return { layers: _layers, widgets: _widgets };
};
