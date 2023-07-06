import type { ImplementEditorAddDatasetWidgetProps } from '@antv/li-editor';
import { useEditorService } from '@antv/li-editor';
import type { DatasetSchema } from '@antv/li-sdk';
import { getUniqueId } from '@antv/li-sdk';
import { Button, Checkbox, Space } from 'antd';
import { useState } from 'react';
import './CustomAddDataset.less';

type CustomAddDatasetProps = ImplementEditorAddDatasetWidgetProps;

const GEO_LIST = [
  {
    label: '中国省份',
    value: '100000',
  },
  {
    label: '浙江省城市',
    value: '330000',
  },
];

export default function CustomAddDataset(props: CustomAddDatasetProps) {
  const { appService } = useEditorService();
  const implementDatasetService =
    appService.getImplementService('GET_CHINA_GEO_LIST');
  const { onSubmit, onCancel } = props;
  const [selectAdcodes, setSelectAdcodes] = useState<string[]>([]);

  const onAddDataset = () => {
    if (!implementDatasetService) return;
    const datasets: DatasetSchema[] = selectAdcodes.map((adcode) => {
      const newDataset: DatasetSchema = {
        id: getUniqueId(),
        type: 'remote',
        serviceType: implementDatasetService.metadata.name,
        properties: { adcode },
        metadata: {
          name: GEO_LIST.find((item) => item.value === adcode)?.label || '',
        },
      };
      return newDataset;
    });

    onSubmit(datasets);
  };

  return (
    <>
      <div className="li-custom-add-dataset">
        <Checkbox.Group
          value={selectAdcodes}
          onChange={(e) => {
            setSelectAdcodes(e as string[]);
          }}
          options={GEO_LIST}
        />
      </div>

      <div className="li-custom-add-dataset__footer ant-modal-footer">
        <Space>
          <Button
            onClick={() => {
              onCancel();
            }}
          >
            返回
          </Button>
          <Button
            disabled={selectAdcodes.length ? false : true}
            type="primary"
            onClick={onAddDataset}
          >
            添加
          </Button>
        </Space>
      </div>
    </>
  );
}
