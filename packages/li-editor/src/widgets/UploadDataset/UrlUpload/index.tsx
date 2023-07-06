import type { DatasetSchema } from '@antv/li-sdk';
import { isValidUrl } from '@antv/li-sdk';
import { Button, Input, message, Space } from 'antd';
import React, { useState } from 'react';
import { parserFileToSource } from '../UploadDataset/helpers/parser-file';

type UrlUploadProps = {
  className?: string;
  onSubmit: (value: DatasetSchema) => void;
};

const UrlUpload: React.FC<UrlUploadProps> = (props) => {
  const { onSubmit } = props;
  // 当前输入的 url
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [messageApi, messageContextHolder] = message.useMessage();

  const urlRequest = async () => {
    if (!isValidUrl(url)) {
      messageApi.error('请检查 URL 是否正确！');
      return;
    }

    const reg = /\.(?:json|csv|xlsx|xls|geojson|zip)$/;
    if (!reg.test(url)) {
      messageApi.error('请检查是否为 json、csv、xls、xlsx、geojson、zip 文件后缀！');
      return;
    }

    const fileFullName = url.substring(url.lastIndexOf('/') + 1);

    setLoading(true);
    let arrayBuffer: ArrayBuffer;

    try {
      arrayBuffer = await fetch(url).then((res) => {
        if (res.ok) {
          return res.arrayBuffer();
        } else {
          throw Error(`Request rejected with status ${res.status}`);
        }
      });
    } catch (error) {
      messageApi.error('文件下载失败，请检查 URL 地址是否有效。');
      setLoading(false);
      return;
    }

    const file = new File([arrayBuffer], fileFullName);
    let dataSource: DatasetSchema | undefined;

    try {
      dataSource = await parserFileToSource(file);
    } catch (errorMessage: any) {
      messageApi.error(errorMessage);
    }

    if (dataSource) {
      onSubmit(dataSource);
      setUrl('');
    }

    setLoading(false);
  };

  return (
    <Space onClick={(e) => e.stopPropagation()}>
      <Input
        allowClear
        style={{ width: 400 }}
        placeholder="请输入文件 URL 地址"
        value={url}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      />
      {messageContextHolder}
      <Button
        type="link"
        onClick={() => {
          urlRequest();
        }}
        disabled={!url.length ? true : false}
        loading={loading}
      >
        提交
      </Button>
    </Space>
  );
};

export default UrlUpload;
