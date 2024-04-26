import Icon, { BorderInnerOutlined } from '@ant-design/icons';
import type { ImplementEditorPreviewDatasetWidgetProps } from '@antv/li-editor';
import { useEditorDataset } from '@antv/li-editor';
import type { DatasetField } from '@antv/li-sdk';
import type { ViewMeta } from '@antv/s2';
import type { ColType, Props } from '@difizen/weave';
import {
  darkTheme,
  DimTableDataCell,
  getCellCoordinates,
  registerScopedPlugin,
  RowCell,
  useSpreadSheet,
} from '@difizen/weave';
import DecorMaskPlugin, { setKey } from '@difizen/weave-decor-mask';
import SummaryRowPlugin from '@difizen/weave-summary-row';
import { message, Modal, theme, Tooltip } from 'antd';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { mapValues, merge } from 'lodash-es';
import { useEffect, useState } from 'react';
import { usePrefixCls } from '../../hooks';
import { DataExplorationSvg } from './constants';
import useStyle from './DatasetPreviewStyles';
import TypeTag from './TypeTag';

const { useToken } = theme;

const TypeDecorPlugin = () => {
  const { spreadsheet } = useSpreadSheet();

  useEffect(() => {
    setKey('fieldType', () => {
      return (
        <>
          {spreadsheet.interaction
            .getAllColHeaderCells()
            .map((node) => {
              return node.getMeta();
            })
            .map((meta, index) => {
              const { height: initHeight, x } = getCellCoordinates(meta as any, spreadsheet);

              const translateProp = `translate(${x + 5}px,1px)`; // 位移
              const type = (spreadsheet.dataCfg?.meta?.find((item) => item.field === meta.field) as {
                colType: DatasetField['type'];
              })?.colType;

              if (meta?.colIndex == 0) {
                return null;
              }

              return (
                <div
                  key={index}
                  style={{
                    position: 'absolute',
                    width: '40',
                    pointerEvents: 'none',
                    height: initHeight - 10,
                    transform: translateProp,
                  }}
                >
                  <TypeTag type={type} />
                </div>
              );
            })}
        </>
      );
    });

    return () => {};
  }, []);

  return null;
};

const Spreadsheet = registerScopedPlugin({
  childContribution: [DecorMaskPlugin.childContribution, TypeDecorPlugin],
  wrapperContribution: [SummaryRowPlugin.wrapperContribution],
});

type DatasetPreviewProps = ImplementEditorPreviewDatasetWidgetProps;

const DatasetPreview = (props: DatasetPreviewProps) => {
  const { datasetId, visible, onCancel } = props;
  const prefixCls = usePrefixCls('dataset-preview');
  const styles = useStyle();
  const editorDataset = useEditorDataset(datasetId);
  const [hoverHighlight, setHoverHighlight] = useState(true);
  const [modal, modalContextHolder] = Modal.useModal();
  const [messageApi, messageMontextHolder] = message.useMessage();
  const { token } = useToken();

  const s2Theme = merge(darkTheme, {
    colCell: {
      cell: {
        backgroundColor: token.colorBgContainer,
        padding: {
          left: 50,
        },
        interactionState: {
          hover: {
            backgroundColor: token.colorBgElevated,
          },
        },
      },
      bolderText: {
        textAlign: 'left',
      },
    },
    rowCell: {
      cell: {
        backgroundColor: token.colorBgContainer,
      },
    },
    dataCell: {
      cell: {
        backgroundColor: token.colorBgContainer,
        crossBackgroundColor: token.colorBgContainer,
        interactionState: {
          hover: {
            backgroundColor: token.colorBgElevated,
          },
        },
      },
    },
  });

  const openFieldValueModal = (fieldValue: ViewMeta['fieldValue']) => {
    modal.info({
      closable: true,
      title: '当前字段值',
      content: <>{fieldValue}</>,
      okText: '复制',
      onOk: () => {
        const _string = typeof fieldValue === 'string' ? fieldValue : JSON.stringify(fieldValue);
        copy(_string);
        messageApi.success('复制成功');
      },
    });
  };

  if (!editorDataset?.isLocalOrRemoteDataset) {
    return;
  }

  const { data: tableData = [], columns: tableColumns = [] } = editorDataset;

  const columns = tableColumns.map((item: { name: string; type: string }) => ({
    name: item.name,
    displayName: item.name,
    colType: item.type as ColType.TEXT,
  }));

  const data = tableData.map((item: Record<any, string>) => {
    return mapValues(item, (value) => {
      if (typeof value !== 'object') {
        return value;
      }
      return JSON.stringify(value);
    });
  });

  const Toolbar = (val: Props) => {
    const { summaryRowCfg, setSummaryRowCfg } = val as any;
    return (
      <div className={classNames(`${prefixCls}__model-tabel__toolbar`, styles.tabelToolbar)}>
        <div
          className={classNames(
            `${prefixCls}__model-tabel__toolbar-item`,
            styles.toolbarItem,
            hoverHighlight ? `${prefixCls}__model-tabel__toolbar-item-actived` : '',
            hoverHighlight ? styles.toolbarItemActived : '',
          )}
        >
          <Tooltip title="高亮">
            <BorderInnerOutlined
              onClick={() => {
                setHoverHighlight(!hoverHighlight);
              }}
            />
          </Tooltip>
        </div>
        <div
          className={classNames(
            `${prefixCls}__model-tabel__toolbar-item`,
            styles.toolbarItem,
            summaryRowCfg.visible ? `${prefixCls}__model-tabel__toolbar-item-actived` : '',
            summaryRowCfg.visible ? styles.toolbarItemActived : '',
          )}
        >
          <Tooltip title="数据探查">
            <Icon
              component={DataExplorationSvg}
              onClick={() => {
                setSummaryRowCfg((cfg: { visible: boolean }) => {
                  return { ...cfg, visible: !cfg.visible };
                });
              }}
            />
          </Tooltip>
        </div>
      </div>
    );
  };

  return (
    <Modal
      className={classNames(prefixCls, styles.datasetPreview)}
      title={`${editorDataset?.metadata.name}`}
      open={visible}
      bodyStyle={{ padding: 0 }}
      destroyOnClose
      width={'calc(100vw - 200px)'}
      footer={false}
      onCancel={() => onCancel()}
    >
      {modalContextHolder}
      {messageMontextHolder}
      <div className={classNames(`${prefixCls}__model-tabel`, styles.modelTabel)}>
        <Spreadsheet
          hoverable
          expandVacancy
          theme={s2Theme}
          disableCellDetail={true}
          Toolbar={Toolbar}
          s2Options={{
            frozenRowCount: 1,
            interaction: {
              hoverHighlight: hoverHighlight,
            },
            dataCell: (node) => {
              if (node.colIndex === 0) {
                return new RowCell(node, node.spreadsheet);
              }
              return new DimTableDataCell(node, node.spreadsheet);
            },
          }}
          onDataCellDoubleClick={(viewMeta) => {
            openFieldValueModal(viewMeta.fieldValue);
          }}
          data={data}
          columns={columns}
        />
      </div>
    </Modal>
  );
};

export default DatasetPreview;
