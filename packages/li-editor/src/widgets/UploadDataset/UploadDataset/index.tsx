import { FileTextOutlined } from '@ant-design/icons';
import type { DatasetSchema } from '@antv/li-sdk';
import { Button, message, Space, Tooltip, Upload } from 'antd';
import { isEmpty } from 'lodash-es';
import type { UploadRequestOption } from 'rc-upload/lib/interface';
import React, { useState } from 'react';
import classNames from 'classnames';
import type { ImplementEditorAddDatasetWidgetProps } from '../../../types';
import UploadDatasetList from '../UploadDatasetList';
import UrlUpload from '../UrlUpload';
import { usePrefixCls } from '../../../hooks';
import { parserFileToSource } from './helpers/parser-file';
import useStyle from './style';

type UploadDatasetProps = ImplementEditorAddDatasetWidgetProps;

export default function UploadDataset(props: UploadDatasetProps) {
  const { onSubmit, onCancel } = props;
  const prefixCls = usePrefixCls('upload');
  const styles = useStyle();
  const [uploadData, setUploadData] = useState<DatasetSchema[]>([]);
  /* 选择的文件id */
  const [checkedDatasetIdList, setCheckedDatasetIdList] = useState<string[]>([]);
  const [messageApi, messageContextHolder] = message.useMessage();

  const customRequest = (uploadRequestOption: UploadRequestOption<any>) => {
    const { file, onSuccess } = uploadRequestOption;
    parserFileToSource(file as File)
      .then((dataSource) => {
        if (dataSource) {
          setUploadData((pre) => [...pre, dataSource]);
        }
        // @ts-ignore
        onSuccess();
      })
      .catch((errorMessage) => {
        messageApi.error(errorMessage);
      });
  };

  const UploadDraggerContent = (
    <div className={classNames(`${prefixCls}-dataset__dragger-content`, styles.draggerContent)}>
      <span className={classNames(`${prefixCls}-dataset__dragger-content_icon`, styles.draggerContentIcon)}>
        <FileTextOutlined />
      </span>
      <div className={classNames(`${prefixCls}-dataset__dragger-content_text`, styles.draggerContentText)}>
        点击或将文件拖拽到这里，也可以文件 URL 地址上传
      </div>
      <UrlUpload
        onSubmit={(fileSource: DatasetSchema) => {
          setUploadData((pre) => [...pre, fileSource]);
        }}
      />
    </div>
  );

  return (
    <>
      <div className={prefixCls}>
        <p className={classNames(`${prefixCls}__description`, styles.uploadDescription)}>
          支持的文件格式有{' '}
          <a href="https://www.yuque.com/antv/l7vp/data-format-csv" target="_blank" rel="noreferrer">
            CSV
          </a>
          、
          <a href="https://www.yuque.com/antv/l7vp/data-format-excel" target="_blank" rel="noreferrer">
            Excel
          </a>
          、
          <a href="https://www.yuque.com/antv/l7vp/data-format-json" target="_blank" rel="noreferrer">
            JSON
          </a>
          、
          <a href="https://www.yuque.com/antv/l7vp/data-format-geojson" target="_blank" rel="noreferrer">
            GeoJSON
          </a>
          、
          <Tooltip title="需压缩打包为 Zip 格式，上传的 Zip 至少包含 .shp、.dbf、.prj 文件">
            <a href="https://www.yuque.com/antv/l7vp/data-format-shapefile" target="_blank" rel="noreferrer">
              Shapefile
            </a>
          </Tooltip>
          ，了解使用方式详见{' '}
          <a href="https://www.yuque.com/antv/l7vp/data-formats" target="_blank" rel="noreferrer">
            使用文档
          </a>
          。
        </p>
        <div className={classNames(`${prefixCls}__content`, styles.uploadContent)}>
          <div className={classNames(`${prefixCls}-dataset`, styles.uploadDataset)}>
            {messageContextHolder}
            <Upload.Dragger
              name="data"
              accept=".csv,.json,.xls,.xlsx,.geojson,.zip"
              customRequest={customRequest}
              showUploadList={false}
            >
              {UploadDraggerContent}
            </Upload.Dragger>
          </div>

          {!isEmpty(uploadData) && (
            <div className={classNames(`${prefixCls}-list`, styles.uploadList)}>
              <p className={classNames(`${prefixCls}-list__title`, styles.uploadListTitle)}>已上传文件</p>
              <UploadDatasetList
                dataset={uploadData}
                onChange={(e) => {
                  setCheckedDatasetIdList(e);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="li-upload__footer ant-modal-footer">
        <Space>
          <Button onClick={onCancel}>返回</Button>
          <Button
            disabled={isEmpty(checkedDatasetIdList) ? true : false}
            type="primary"
            onClick={() => {
              onSubmit(uploadData.filter((item) => checkedDatasetIdList.includes(item.id)));
            }}
          >
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}
