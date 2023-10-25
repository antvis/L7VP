import type { Application, LIRuntimeApp } from '@antv/li-sdk';
import { useLatest, useMemoizedFn, useUpdateEffect } from 'ahooks';
import classNames from 'classnames';
import { cloneDeep, debounce } from 'lodash-es';
import type { CSSProperties } from 'react';
import React, { useState } from 'react';
import type { FallbackProps } from 'react-error-boundary';
import { ErrorBoundary } from 'react-error-boundary';
import { useEditorService, useEditorState } from '../../hooks';
import { validateRuntimeDatasets, validRuntimeLayers, validRuntimeWidgets } from '../../utils';
import { getApplicationSchemaFromEditorState, getApplicationSchemaFromRuntime } from '../../utils/application';

function FallbackRender({ error, resetErrorBoundary }: FallbackProps) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div style={{ padding: 20 }}>
      <p>渲染出错了，请检查配置资产是否有误：</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      {/* <button onClick={resetErrorBoundary}>重新渲染</button> */}
    </div>
  );
}

// 使用 Editor 传下来的 defaultApplication 可能是被 freeze 的
// 高德地图初始化的时候，会使用 center 属性，直接引用修改变量
// 为避免修改失败报错，解冻 map 属性
function cloneDefaultApplication(defaultApplication: Application): Application {
  return { ...defaultApplication, spec: { ...defaultApplication.spec, map: cloneDeep(defaultApplication.spec.map) } };
}

export type RuntimeAppProps = {
  /** 运行时应用 */
  App: LIRuntimeApp['App'];
  /** 类名 */
  className?: string;
  /** 行内样式 */
  style?: CSSProperties;
};

const RuntimeApp: React.FC<RuntimeAppProps> = (props) => {
  const { className, style, App: LIApp } = props;
  // 编辑器上下文服务
  const { editorService } = useEditorService();
  // 编辑器上下文状态
  const { state } = useEditorState();

  // LISDK 配置项
  const [sdkConfig, setSdkConfig] = useState<Application>(
    cloneDefaultApplication(getApplicationSchemaFromEditorState(state)),
  );

  const latestAppConfigRef = useLatest({
    ...sdkConfig,
    metadata: state.metadata,
  });

  const publishSdkUpdateEvent = useMemoizedFn(
    debounce(() => {
      editorService.publishEvent('change', getApplicationSchemaFromRuntime(latestAppConfigRef.current));
    }, 1000),
  );

  useUpdateEffect(() => {
    console.log('update state.map => ', state.map);
    setSdkConfig((config) => {
      return { ...config, spec: { ...config.spec, map: state.map } };
    });
    publishSdkUpdateEvent();
  }, [state.map]);

  useUpdateEffect(() => {
    console.log('update state.datasets => ', state.datasets);
    setSdkConfig((config) => {
      return { ...config, datasets: validateRuntimeDatasets(state.datasets) };
    });
    publishSdkUpdateEvent();
  }, [state.datasets]);

  useUpdateEffect(() => {
    console.log('update state.layers => ', state.layers);
    setSdkConfig((config) => {
      return { ...config, spec: { ...config.spec, layers: validRuntimeLayers(state.layers) } };
    });
    publishSdkUpdateEvent();
  }, [state.layers]);

  useUpdateEffect(() => {
    console.log('update state.widgets => ', state.widgets);
    setSdkConfig((config) => {
      return { ...config, spec: { ...config.spec, widgets: validRuntimeWidgets(state.widgets) } };
    });
    publishSdkUpdateEvent();
  }, [state.widgets]);

  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <LIApp className={classNames(className)} config={sdkConfig} style={style} />
    </ErrorBoundary>
  );
};

export default RuntimeApp;
