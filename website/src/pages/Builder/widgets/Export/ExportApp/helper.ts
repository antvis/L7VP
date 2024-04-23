import type { Application, AssetPackageSpec } from '@antv/li-sdk';
import { version as LISDKVersion } from '@antv/li-sdk/package.json';
import { ANTD_THEME } from '@/constants';

// TODO:处理高德情况安全密钥
// 如果使用了高德，在2021年12月02日申请以后的 key 需要配合您的安全密钥一起使用
// window._AMapSecurityConfig = { securityJsCode:'「您申请的安全密钥」' }
// 方案：降级到 SDK 层面内置 token 和密钥
export const getSDKSourceCode = (appConfig: Application, assetPackages: AssetPackageSpec[]) => {
  const importAssetsCode = assetPackages.map((item) => `import ${item.global} from '${item.package}';`).join('\n');
  const assetsCode = assetPackages.map((item) => item.global).join(', ');

  return `import React from 'react';
import { ConfigProvider, theme } from 'antd';
import { LocationInsightApp, Application } from '@antv/li-sdk';
${importAssetsCode}

const config: Application = ${JSON.stringify(appConfig)}

const assets = [${assetsCode}];
const appTheme = { algorithm: theme.darkAlgorithm, token: ${JSON.stringify(ANTD_THEME.token)}, }

export default () => {
  const { token } = theme.useToken();
  const inheritedStyle = { color: token.colorText, fontSize: token.fontSize, fontFamily: token.fontFamily, lineHeight: token.lineHeight, background: token.colorBgLayout, }

  return (
    <ConfigProvider theme={appTheme}>
      <LocationInsightApp
        config={config}
        assets={assets}
        style={{ height: "100vh", ...inheritedStyle, }}
      />
    </ConfigProvider>
  );
};
  `;
};

const getSDkSourceCodeDependencies = (assetPackages: AssetPackageSpec[]) => {
  const _dependencies: Record<PropertyKey, string> = {
    '@ant-design/icons': '^5.0.1',
    '@antv/l7': '^2.17.2',
    '@antv/larkmap': '^1.4.1',
    antd: '^5.5.0',
    '@antv/li-sdk': '^' + LISDKVersion,
    react: '^18.0.0',
    'react-dom': '^18.0.0',
  };
  const dependencies: Record<PropertyKey, string> = assetPackages.reduce((acc, assetPackage) => {
    acc[assetPackage.package] = '^' + assetPackage.version;
    return acc;
  }, _dependencies);

  return dependencies;
};

const getSDkSourceCodePackage = (assetPackages: AssetPackageSpec[]) => {
  const dependencies: Record<PropertyKey, string> = getSDkSourceCodeDependencies(assetPackages);

  return {
    title: 'L7VP App',
    main: 'index.js',
    dependencies: {
      ...dependencies,
      'react-scripts': '^5.0.0',
    },
    devDependencies: {
      typescript: '^5.0.2',
      '@types/react': '^18.0.0',
      '@types/react-dom': '^18.0.0',
    },
    scripts: {
      start: 'react-scripts start',
      build: 'react-scripts build',
      test: 'react-scripts test --env=jsdom',
      eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead'],
  };
};

export const getCodesanboxPrefillConfig = (appConfig: Application, assetPackages: AssetPackageSpec[]) => {
  const html = `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
      </head>
      <body>
        <div id="container" />
      </body>
    </html>
  `;

  const indexJsContent = `import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import 'antd/dist/reset.css';
import './index.css';

createRoot(document.getElementById('container')).render(<App />);
  `;

  const indexCssContent = ``;

  return {
    files: {
      'package.json': { content: getSDkSourceCodePackage(assetPackages) },
      'index.css': { content: indexCssContent },
      'index.tsx': { content: indexJsContent },
      'app.tsx': { content: getSDKSourceCode(appConfig, assetPackages) },
      'index.html': {
        content: html,
      },
    },
  };
};

export const getRiddlePrefillConfig = (appConfig: Application, assetPackages: AssetPackageSpec[]) => {
  const jsContent = `import { createRoot } from 'react-dom/client';
${getSDKSourceCode(appConfig, assetPackages).replace(/export default/, 'const APP =')}
createRoot(mountNode).render(<APP />);\n`;

  const cssContent = `@import '~antd/dist/reset.css';`;

  const riddlePrefillConfig = {
    title: `L7VP App`,
    js: jsContent,
    css: cssContent,
    json: JSON.stringify({ name: 'L7VP App', dependencies: getSDkSourceCodeDependencies(assetPackages) }, null, 2),
  };

  return riddlePrefillConfig;
};
