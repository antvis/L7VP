import React, { memo, useMemo } from 'react';
import type { GlobalModel } from '../state/global';
import type { AssetPackage } from '../types';
import type { LIRenderProps } from './Render';
import LIRuntimeApp from './runtime';

export type LocationInsightAppProps = LIRenderProps & {
  /** 应用资产包 */
  assets: AssetPackage[];
  /** 初始化的全局状态 */
  initialGlobalState?: GlobalModel;
};

const LocationInsightApp: React.FC<LocationInsightAppProps> = (props) => {
  const { assets, initialGlobalState, ...restProps } = props;
  const runtime = useMemo(() => new LIRuntimeApp({ assets, initialGlobalState }), []);
  const { App } = runtime;

  return <App {...restProps} />;
};

export default memo(LocationInsightApp);
