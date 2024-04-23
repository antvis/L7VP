import { isProduction } from './env';

export const AnalyticsScripts = isProduction
  ? [
      // Baidu tongji
      `var _hmt = _hmt || [];
        (function() {
          var hm = document.createElement("script");
          hm.src = "https://hm.baidu.com/hm.js?c2b82edd7b45aa4aa6f9f31c1155db0f";
          var s = document.getElementsByTagName("script")[0];
          s.parentNode.insertBefore(hm, s);
        })();
  `,
      // Google tag (gtag.js)
      { src: 'https://www.googletagmanager.com/gtag/js?id=G-N97Y9S4GLG', async: true },
      `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-N97Y9S4GLG', { app_type: 'l7vp-site' });
        `,
    ]
  : [];
