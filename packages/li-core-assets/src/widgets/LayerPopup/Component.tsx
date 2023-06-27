import { LayerPopup } from '@antv/larkmap';
import type { ILayerField, ILayerPopupConfigItem } from '@antv/larkmap/es/components/LayerPopup/types';
import type { ImplementWidgetProps } from '@antv/li-sdk';
import { Image } from 'antd';
import cls from 'classnames';
import React, { useMemo } from 'react';
import useStyle from './ComponenStyle';
import { isImageUrl } from './helper';
import type { Properties } from './registerForm';

const CLS_PREFIX = 'li-layer-popup';
export interface LILayerPopupProps extends Properties, ImplementWidgetProps {}

const LILayerPopup: React.FC<LILayerPopupProps> = (props) => {
  const { isOpen = true, trigger, items = [] } = props;
  const styles = useStyle();

  const popupItems: ILayerPopupConfigItem[] = useMemo(() => {
    const list = items
      .map((item) => {
        const fieldsMap = new Map<string, ILayerField>();
        const { layerId, fields } = item;
        fields.forEach((fieldItem) => {
          if (!fieldsMap.has(fieldItem.field)) {
            fieldsMap.set(fieldItem.field, fieldItem);
          }
        });
        const newFields = Array.from(fieldsMap.values());
        return {
          layer: layerId,
          fields: newFields,
          customContent: (feature: any) => {
            return (
              <>
                {newFields.map((_item: ILayerField, index) => {
                  const field = _item.formatField ? `${_item.formatField}:` : `${_item.field}:`;
                  const value =
                    typeof feature[_item.field] === 'object'
                      ? JSON.stringify(feature[_item.field])
                      : feature[_item.field];

                  if (isImageUrl(value)) {
                    return (
                      <div className={cls(`${CLS_PREFIX}__row_image`, styles.popupRowImage)} key={index}>
                        <div className={cls(`${CLS_PREFIX}__row_key`, styles.rowItem, styles.rowKey)}>{field}</div>
                        <div className={cls(`${CLS_PREFIX}__row_value`, styles.rowItem, styles.rowValue)}>
                          <Image referrerPolicy="no-referrer" height={40} src={value} />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className={cls(`${CLS_PREFIX}__row_item`, styles.popupRow)} key={index}>
                      <div className={cls(`${CLS_PREFIX}__row_key`, styles.rowItem, styles.rowKey)}>{field}</div>
                      <div className={cls(`${CLS_PREFIX}__row_value`, styles.rowItem, styles.rowValue)}>{value}</div>
                    </div>
                  );
                })}
              </>
            );
          },
        };
      })
      .filter((item) => item && item.fields.length);
    return list;
  }, [items]);

  return (
    <>
      {isOpen && (
        <LayerPopup
          className={cls(CLS_PREFIX, styles.layerPopup)}
          anchor="top-left"
          offsets={[10, -10]}
          items={popupItems}
          trigger={trigger}
        />
      )}
    </>
  );
};

export default LILayerPopup;
