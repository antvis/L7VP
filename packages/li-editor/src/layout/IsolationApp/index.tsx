import type { Application, LIRuntimeApp } from '@antv/li-sdk';
import { useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import { forOwn, isObject } from 'lodash-es';
import type { CSSProperties } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

type SandBox = {
  /** 沙箱注入环境变量 */
  injectEnv?: Record<string, any>;
  styleFrags?: string[];
  scriptFrags?: string[];
};

type IsolationRuntimeProps = {
  /** 应用配置 */
  appConfigState: Application;
  /** 运行时应用 */
  App: LIRuntimeApp['App'];
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
  /** 沙箱 */
  sandbox: SandBox;
};

const renderPortalRuntimeApp = (
  iframe: HTMLIFrameElement,
  App: IsolationRuntimeProps['App'],
  appConfig: Application,
) => {
  const contentWindow = iframe.contentWindow!;
  const contentDocument = iframe.contentDocument!;

  const LIAppElement = () => {
    const [config, setConfig] = useState(appConfig);

    return <App config={config} style={{ position: 'relative', width: '100%', height: '100%' }} />;
  };

  const containerId = 'app';
  let container = contentDocument.getElementById(containerId);
  if (!container) {
    container = contentDocument.createElement('div');
    contentDocument.body.appendChild(container);
    container.id = containerId;
  }

  ReactDOM.render(<LIAppElement />, container);
};

const getRenderAppResource = () => {
  const content = `
      const { App: LIRuntimeApp, configState } = window.LIRuntime
      const { parseAssetPackage } = window.LISDK;
      function LIAppElement() {
        const [config, setConfig] = React.useState(configState);

        React.useEffect(() => {
          window.LIRuntime.updateConfigState = (configState) => {
            setConfig(configState)
          }
        }, []);

        return React.createElement(LIRuntimeApp, {
          config: config,
          style: { position: "relative", width: "100%", height: "100%", },
        });
      };

      const App = React.createElement(LIAppElement, null);

      ReactDOM.render(App, document.getElementById("app"));
    `;

  return content;
};

const mountResourceToFrame = (iframe: HTMLIFrameElement, sandbox: IsolationRuntimeProps['sandbox']) => {
  const { styleFrags = [], scriptFrags = [] } = sandbox;
  const contentWindow = iframe.contentWindow!;
  const contentDocument = iframe.contentDocument!;

  // inject parent Variable
  if (isObject(sandbox) && sandbox.injectEnv) {
    const { injectEnv } = sandbox;
    forOwn(injectEnv, (value, key) => {
      (contentWindow as any)[key] = value;
    });
  }

  contentDocument.open();
  contentDocument.write(`
    <!doctype html>
      <html class="li-editor-runtime">
        <head>
          <meta charset="utf-8"/>
          ${styleFrags}
        </head>
        <body>
          ${scriptFrags}
          <!-- Render App Component -->
          <script>${getRenderAppResource()}</script>
          <div id="app"></div>
        </body>
    </html>`);
  contentDocument.close();

  return new Promise<HTMLIFrameElement>((resolve, reject) => {
    const onload = () => {
      resolve(iframe);
      contentWindow.removeEventListener('load', onload);
    };
    contentWindow.addEventListener('load', onload);
    iframe.onerror = (err) => {
      reject(err);
    };
  });
};

const IsolationRuntime: React.FC<IsolationRuntimeProps> = (props) => {
  const { App, appConfigState, sandbox, className, style } = props;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeLoad = useRef(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const contentWindow = iframe.contentWindow!;

    // inject must deps env
    (contentWindow as any).React = React;
    (contentWindow as any).ReactDOM = ReactDOM;
    (contentWindow as any).LIRuntime = { App, configState: appConfigState };

    mountResourceToFrame(iframe, sandbox).then(() => {
      iframeLoad.current = true;
    });
  }, []);

  useUpdateEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframeLoad.current) return;

    const contentWindow = iframe.contentWindow!;
    (contentWindow as any).LIRuntime.updateConfigState(appConfigState);
  }, [appConfigState]);

  return (
    <iframe
      className={classNames(className)}
      style={style}
      ref={iframeRef}
      src="javascript:false"
      name="LIIsolationRuntime"
      frameBorder="0"
    />
  );
};

export default IsolationRuntime;
