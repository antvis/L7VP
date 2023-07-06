import { ExportImageControl as ExportImage } from '@antv/larkmap';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { Button, Image, Modal } from 'antd';
import classNames from 'classnames';
import React, { useState } from 'react';
import useStyle from './ComponenStyle';
import type { Properties } from './registerForm';

const CLS_PREFIX = 'li-export-image-control';

export interface ExportImageControlProps extends Properties, ImplementWidgetProps {}

const ExportImageControl: React.FC<ExportImageControlProps> = (props) => {
  const { position } = props;
  const [imageData, setInmageData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const styles = useStyle();

  const onExport = (value: string) => {
    setIsModalOpen(true);
    setInmageData(value);
  };

  return (
    <>
      <ExportImage
        onExport={onExport}
        className={classNames(`${CLS_PREFIX}__icon`, styles.exportImageIcon)}
        position={position}
      />
      <Modal
        title="导出图片"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        className="li-export-image-control__model"
        footer={
          <>
            <Button onClick={() => setIsModalOpen(false)}>返回</Button>
            <Button type="primary" onClick={() => setIsModalOpen(false)}>
              <a download="screenshot.png" href={imageData} target="_blank" rel="noreferrer">
                下载图片
              </a>
            </Button>
          </>
        }
      >
        <Image src={imageData} />
      </Modal>
    </>
  );
};

export default ExportImageControl;
