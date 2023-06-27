import { forOwn, isObject } from 'lodash-es';
import type { AssetPackage, AssetPackageSpec, LoadAssetPackageSpecOptions } from '../types';

const isCSSUrl = (url: string): boolean => {
  return /\.css(\?.*)?$/.test(url);
};

const loadStyle = (url: string, id?: string): Promise<void> => {
  if (id && document.head.querySelector(`link[data-id="${id}"]`)) {
    return Promise.resolve();
  }

  const element = document.createElement('link');

  return new Promise((resolve, reject) => {
    const onload = (type: string) => {
      element.onload = null;
      element.onerror = null;
      if (type === 'load') {
        resolve();
      } else {
        reject();
      }
    };

    element.onload = () => onload('load');
    element.onerror = () => onload('error');

    element.href = url;
    element.rel = 'stylesheet';

    if (id) {
      element.setAttribute('data-id', id);
    }

    document.head.appendChild(element);
  });
};

const loadScript = (url: string, id?: string, document = window.document): Promise<void> => {
  if (id && document.head.querySelector(`script[data-id="${id}"]`)) {
    return Promise.resolve();
  }

  const node = document.createElement('script');

  return new Promise((resolve, reject) => {
    const onload = (type: string) => {
      node.onload = null;
      node.onerror = null;
      if (type === 'load') {
        resolve();
      } else {
        reject();
      }
      // document.head.removeChild(node);
      // node = null;
    };

    node.onload = () => onload('load');
    node.onerror = () => onload('error');

    node.src = url;

    // 确保顺序执行
    // `async=false` is required to make sure all js resources execute sequentially.
    node.async = false;

    if (id) {
      node.setAttribute('data-id', id);
    }

    document.head.appendChild(node);
  });
};

const createIframe = (iframeSrc: string, name: string) => {
  let iframe: HTMLIFrameElement | null = document.querySelector(`iframe[name="${name}"]`);
  if (iframe) {
    iframe.remove();
  }

  iframe = document.createElement('iframe');
  iframe.src = iframeSrc;
  iframe.name = name;
  iframe.style.cssText = 'border:none;width:100%;height:100%;';

  return iframe;
};

const getSandBoxIframe = (url: string, name: string) => {
  let iframe: HTMLIFrameElement | null = document.querySelector(`iframe[name="${name}"]`);
  if (iframe) return Promise.resolve(iframe);

  return new Promise<HTMLIFrameElement>((resolve, reject) => {
    iframe = createIframe(url, name);
    iframe.style.cssText = 'border:none;width:100%;height:100%;display:none;';

    iframe.onload = () => {
      resolve(iframe!);
    };
    iframe.onerror = (err) => {
      reject(err);
    };

    window.document.head.appendChild(iframe);
  });
};

const loadJsResourceWithSandBox = async (urls: string[], parentVariable: Record<string, any> = {}) => {
  const iframe = await getSandBoxIframe('javascript:false', 'loadJsResourceWithSanbox');
  const contentWindow = iframe.contentWindow!;
  const contentDocument = iframe.contentDocument!;

  // inject parentVariable
  forOwn(parentVariable, (value, key) => {
    (contentWindow as any)[key] = value;
  });

  await Promise.all(urls.map((url) => loadScript(url, url, contentDocument)));

  return contentWindow;
};

const accessAssetPackage = (global: string, env: Record<string, any>): AssetPackage | undefined => {
  const asset = env[global]?.default;
  return asset;
};

/**
 * 解析 window 上挂载资产
 */
export const parseAssetPackage = (globalName: string): AssetPackage | undefined => {
  const asset = accessAssetPackage(globalName, window);
  return asset;
};

/**
 * 解析资产 CDN 包
 */
export const loadAssetPackages = async (
  assetPackagesSpec: AssetPackageSpec[],
  options: LoadAssetPackageSpecOptions = {},
): Promise<AssetPackage[]> => {
  const { isLoadStyle = true, sandbox = false } = options;
  const styleUrls: string[] = [];
  const scriptUrls: string[] = [];

  for (let index = 0; index < assetPackagesSpec.length; index++) {
    const assetPackage = assetPackagesSpec[index];
    const { urls } = assetPackage;

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      if (isCSSUrl(url)) {
        styleUrls.push(url);
      } else {
        scriptUrls.push(url);
      }
    }
  }

  if (isLoadStyle) await Promise.all(styleUrls.map((url) => loadStyle(url, url)));

  let iframeContentWindow: Window | null;

  if (sandbox) {
    const injectSandBoxEnv = isObject(sandbox) ? sandbox.injectEnv : {};
    try {
      iframeContentWindow = await loadJsResourceWithSandBox(scriptUrls, injectSandBoxEnv);
    } catch (error) {
      await Promise.all(scriptUrls.map((url) => loadScript(url, url)));
    }
  } else {
    await Promise.all(scriptUrls.map((url) => loadScript(url, url)));
  }

  const assets = assetPackagesSpec
    .map((assetPackage) => {
      const { global } = assetPackage;
      // 启用沙箱情况，从沙箱中获取，如果沙箱中没有，尝试从 window 中获取
      const _assets =
        (iframeContentWindow && accessAssetPackage(global, iframeContentWindow)) || parseAssetPackage(global);
      if (_assets) {
        _assets.version = `v${assetPackage.version}`;
        _assets.metadata = assetPackage;
        return _assets;
      }
    })
    .filter<AssetPackage>((asset): asset is AssetPackage => asset !== undefined);

  return assets;
};
