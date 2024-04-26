import { useEditorService } from '@antv/li-editor';
import type { RadioChangeEvent } from 'antd';
import { Button, Input, Modal, Radio } from 'antd';
import classNames from 'classnames';
import { downloadText } from 'download.js';
import React, { useEffect, useState } from 'react';
import { usePrefixCls } from '../../../hooks';
import CodePreview from './CodePreview';
import { getCodesanboxPrefillConfig, getRiddlePrefillConfig, getSDKSourceCode } from './helper';
import useStyle from './style';
import { getEmbeddedApp, logYuyanMonitor } from '@/utils';
import { getAssetPackageList } from '@/services';
import type { AssetPackage } from '@/services';

const FileExtensionMap: Record<'HTML' | 'JSON' | 'SDK', string> = {
  HTML: 'html',
  JSON: 'json',
  SDK: 'tsx',
};

type ExportAppProps = {
  visible: boolean;
  onVisbleChange: (value: boolean) => void;
};

const ExportApp: React.FC<ExportAppProps> = (props) => {
  const { visible, onVisbleChange } = props;
  const prefixCls = usePrefixCls('export-app');
  const styles = useStyle();
  const [exportType, setExportType] = useState<'HTML' | 'JSON' | 'SDK'>('HTML');
  const [token, setToken] = useState<string>();
  const { editorService } = useEditorService();
  const appConfig = editorService.getApplicationConfig();
  const [assetPackages, setAssetPackages] = useState<AssetPackage[]>([]);
  const [aMapSecurityJsCode, setAMapSecurityJsCode] = useState<string>();

  const isMapbox = appConfig.spec.map.basemap && appConfig.spec.map.basemap === 'Mapbox';
  const isAMap = appConfig.spec.map.basemap && ['Gaode', 'GaodeV1', 'GaodeV2'].includes(appConfig.spec.map.basemap);

  useEffect(() => {
    const assetPackageIds = appConfig.metadata?.assetPackageIds;
    getAssetPackageList().then((assetPackageList) => {
      const _assetPackages = Array.isArray(assetPackageIds)
        ? assetPackageList.filter((asset) => assetPackageIds.includes(asset.assetId))
        : assetPackageList;
      setAssetPackages(_assetPackages);
    });
  }, []);

  const handleOk = () => {
    const fileName = `${appConfig.metadata.name}.${FileExtensionMap[exportType]}`;
    if (exportType === 'JSON') {
      downloadText(fileName, JSON.stringify(appConfig));
    } else if (exportType === 'SDK') {
      downloadText(fileName, getSDKSourceCode(appConfig, assetPackages));
    } else {
      const htmlContent = getEmbeddedApp(appConfig, assetPackages, { token, aMapSecurityJsCode });
      downloadText(fileName, htmlContent);
    }

    logYuyanMonitor(12);
    onVisbleChange(false);
  };

  const handleCancel = () => {
    onVisbleChange(false);
  };

  const onChange = (e: RadioChangeEvent) => {
    setExportType(e.target.value);
  };

  const renderJson = () => {
    return (
      <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
        <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
          <div>应用配置</div>
          <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>
            应用的配置文件，导出后可以通过项目方式再次导入
          </div>
        </div>
        <CodePreview
          className={classNames(`${prefixCls}__code-preview`, styles.codePreview)}
          language="json"
          value={JSON.stringify(appConfig, null, '  ')}
        />
      </div>
    );
  };

  const renderHtml = () => {
    const amapContent = (
      <>
        <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
          <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
            <div>Key 配置</div>
            <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>
              应用需要高德底图服务的{' '}
              <a href="https://lbs.amap.com/api/javascript-api-v2/prerequisites" target="_blank" rel="noreferrer">
                Key
              </a>
            </div>
          </div>
          <Input
            placeholder="请填写高德开放平台申请的 key"
            style={{ width: 400 }}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </div>
        <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
          <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
            <div>安全密钥配置</div>
            <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>
              应用需要高德底图服务的{' '}
              <a href="https://lbs.amap.com/api/javascript-api-v2/prerequisites" target="_blank" rel="noreferrer">
                安全密钥
              </a>
            </div>
          </div>
          <Input
            placeholder="请填写高德开放平台申请的安全密钥"
            style={{ width: 400 }}
            onChange={(e) => {
              setAMapSecurityJsCode(e.target.value);
            }}
          />
        </div>
      </>
    );

    const mapboxContent = (
      <>
        <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
          <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
            <div>Token 配置</div>
            <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>
              应用需要 Mapbox 底图服务的{' '}
              <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noreferrer">
                Token
              </a>
            </div>
          </div>
          <Input
            placeholder="请填写 Mapbox 平台申请的 token"
            style={{ width: 400 }}
            onChange={(e) => {
              setToken(e.target.value);
            }}
          />
        </div>
      </>
    );

    return isMapbox ? mapboxContent : isAMap ? amapContent : null;
  };

  const renderSDK = () => {
    return (
      <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
        <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
          <div>SDK 渲染</div>
          <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>
            导出源代码，SDK 方式接入到业务系统中
          </div>
        </div>
        <CodePreview
          className={classNames(`${prefixCls}__code-preview`, styles.codePreview)}
          language="typescript"
          codesanbox={getCodesanboxPrefillConfig(appConfig, assetPackages)}
          riddle={getRiddlePrefillConfig(appConfig, assetPackages)}
          value={getSDKSourceCode(appConfig, assetPackages)}
        />
      </div>
    );
  };

  const renderContent = () => {
    if (assetPackages.length === 0) return null;
    if (exportType === 'HTML') {
      return renderHtml();
    } else if (exportType === 'JSON') {
      return renderJson();
    } else {
      return renderSDK();
    }
  };

  return (
    <Modal
      className={prefixCls}
      width={960}
      title="导出应用"
      open={visible}
      onCancel={handleCancel}
      destroyOnClose
      footer={
        <>
          <Button onClick={handleCancel}>返回</Button>
          <Button disabled={assetPackages.length === 0} type="primary" onClick={handleOk}>
            导出
          </Button>
        </>
      }
    >
      <div className={classNames(`${prefixCls}__type`, styles.appType)}>
        <div className={classNames(`${prefixCls}__content`, styles.appContent)}>
          <div className={classNames(`${prefixCls}__title`, styles.appTitle)}>
            <div>导出的格式</div>
            <div className={classNames(`${prefixCls}__subtitle`, styles.appSubtitle)}>选择导出的格式</div>
          </div>
          <Radio.Group onChange={onChange} value={exportType}>
            <Radio value="HTML">HTML</Radio>
            <Radio value="SDK">SDK</Radio>
            <Radio value="JSON">JSON</Radio>
          </Radio.Group>
        </div>
      </div>
      {renderContent()}
    </Modal>
  );
};

export default ExportApp;
