import type { Application, AssetPackageSpec } from '@antv/li-sdk';
import { AMapSecurityJsCode, ANTD_THEME, BUILTIN_ASSET_PACKAGES, EXTERNAL_RESOURCES } from '@/constants';

const isCSSUrl = (url: string): boolean => {
  return /\.css(\?.*)?$/.test(url);
};

const generateExternalCSSs = (urls: string[]) =>
  urls.map((url) => `<link href="${url}" rel="stylesheet"></link>`).join('\n\r    ');

const generateExternalScripts = (urls: string[]) =>
  urls.map((url) => `<script src="${url}" crossorigin></script>`).join('\n\r    ');

/**
 * 获取应用的 HTML 文件，
 */
export const getEmbeddedApp = (
  applicationConfig: Application,
  assetPackages: AssetPackageSpec[] = BUILTIN_ASSET_PACKAGES,
  {
    token,
    aMapSecurityJsCode,
  }: {
    token?: string;
    aMapSecurityJsCode?: string;
  } = {},
) => {
  // 移除内置的 Mapbxo token，内置的 Mapbxo token 设置了域名白名单
  // const appConfig = produce(applicationConfig, (draft) => {
  //   delete draft.spec.map.config.token;
  // });
  const appConfig = applicationConfig;

  const AnalyticsScripts = `
    <!-- Google Analytics，用于调研分析 L7VP 使用情况，可以删掉 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-N97Y9S4GLG" crossorigin></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-N97Y9S4GLG', { app_type: 'l7vp-export-app' });
    </script>
    <!-- Baidu tongji，用于调研分析 L7VP 使用情况，可以删掉 -->
    <script>
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?c2b82edd7b45aa4aa6f9f31c1155db0f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })()
    </script>
    `;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <link rel="shortcut icon" href="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*WCVLT5Dp5oYAAAAAAAAAAAAADmJ7AQ/original">
        <title>${appConfig.metadata.name} - L7VP Embedded App</title>
        <!-- Map Token: 底图服务 token 设置 -->
        <script>
          // 高德或 Mapbox 的 token，默认使用内置的 token，生产环境务必自行注册 Token 确保服务稳定!
          const MAP_TOKEN = ${token ? `'${token}'` : undefined};
          // 如果是高德，在2021年12月02日申请以后的 key 需要配合您的安全密钥一起使用
          window._AMapSecurityConfig = { securityJsCode: ${
            aMapSecurityJsCode ? `'${aMapSecurityJsCode}'` : `'${AMapSecurityJsCode}'`
          }} // 替换为您申请的安全密钥！
        </script>

        <!-- antd css -->
        ${generateExternalCSSs(EXTERNAL_RESOURCES.get('antd')!.css!)}

        <!-- LarkMap css -->
        ${generateExternalCSSs(EXTERNAL_RESOURCES.get('LarkMap')!.css!)}

        <!-- Load lodash -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('lodash')!.js)}

        <!-- Load React -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('react')!.js)}

        <!-- Load antd/icons -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('antd')!.js)}

        <!-- Load turf/mapbox/L7/L7Draw/LarkMap -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('turf')!.js)}
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('L7')!.js)}
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('LarkMap')!.js)}

        <!-- Load LI SDK -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('LISDK')!.js)}

        <!-- Load formily: for dependencies some LI asset attribute -->
        ${generateExternalScripts(EXTERNAL_RESOURCES.get('formily')!.js)}

        <!-- Load LI Assets CSS -->
        ${generateExternalCSSs(assetPackages.map((asset) => asset.urls.filter((url) => isCSSUrl(url))).flat())}
      </head>
      <body>
        <!-- app style -->
        <style type="text/css">
          #app {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          /* 地图版权遮挡控件问题 */
          .amap-copyright {
            left: 100px;
          }
        </style>
        <div id="app"></div>

        <!-- Load LI Assets -->
        ${generateExternalScripts(assetPackages.map((asset) => asset.urls.filter((url) => !isCSSUrl(url))).flat())}

        <!-- LI Datasets -->
        <script>
          const LI_Datasets = ${JSON.stringify(appConfig.datasets)}
        </script>
        <!-- LI ApplicationConfig -->
        <script>
        const LI_Config = ${JSON.stringify({ ...appConfig, datasets: [] })}
        LI_Config.datasets = LI_Datasets
        if (MAP_TOKEN) LI_Config.spec.map.config.token = MAP_TOKEN
        </script>
        <!-- Render App Component -->
        <script>
          const { ConfigProvider, theme } = window.antd;
          const { LocationInsightApp, parseAssetPackage } = window.LISDK;
          function LIAppElement() {
            const { token } = theme.useToken();
            const inheritedStyle = { color: token.colorText, fontSize: token.fontSize, fontFamily: token.fontFamily, lineHeight: token.lineHeight, background: token.colorBgLayout, }
            const assets = ${JSON.stringify(assetPackages.map((asset) => asset.global))}
              .map((global) => parseAssetPackage(global))
              .filter((asset) => asset !== undefined);

            return React.createElement(LocationInsightApp, {
              assets,
              config: LI_Config,
              style: { position: "relative", width: "100%", height: "100%", ...inheritedStyle, },
            });
          };

          const appTheme = {
            algorithm: theme.darkAlgorithm,
            token: ${JSON.stringify(ANTD_THEME.token)},
          }
          const App = React.createElement(ConfigProvider, { theme: appTheme }, React.createElement(LIAppElement, null));

          ReactDOM.render(App, document.getElementById("app"));
        </script>

        ${AnalyticsScripts}
      </body>
    </html>
  `;
};
