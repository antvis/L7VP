import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';
/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /** 控件放置位置 */
  position?: PositionName;
  /** 是否默认开启 */
  defaultOpen: boolean;
  /** 卷帘方向设置，默认 'vertical' */
  orientation?: 'vertical' | 'horizontal';
  /** 卷帘左侧的图层 ID */
  defaultLeftLayers: string[];
  /** 卷帘右侧侧的图层 ID */
  defaultRightLayers: string[];
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  const { layers } = props;

  const layerList = layers
    .filter((layer: Record<string, any>) => layer.visConfig.visible)
    .slice()
    .reverse()
    .map((item: Record<string, any>) => ({ label: item.metadata.name, value: item.id }));

  // 属性面板表单的 Schema 定义，来自表单库 formily 的 Schema
  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'bottomright',
    },
    defaultOpen: {
      title: '默认打开',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    defaultLeftLayers: {
      title: '左侧图层',
      type: 'array',
      default: [],
      enum: layerList,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择图层',
        mode: 'multiple',
        layers: layerList,
      },
      'x-reactions': [
        {
          dependencies: ['defaultRightLayers'],
          fulfill: {
            run: `$form.setFieldState('defaultLeftLayers', (state) => {
              state.dataSource = $form.getFieldState('defaultRightLayers', (rightState) => {
                  return rightState.componentProps.layers.filter((item) => rightState.value && !rightState.value.includes(item.value));
              });
          });`,
          },
        },
      ],
    },
    defaultRightLayers: {
      title: '右侧图层',
      type: 'array',
      default: [],
      enum: layerList,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择图层',
        mode: 'multiple',
        layers: layerList,
      },
      'x-reactions': [
        {
          dependencies: ['defaultLeftLayers'],
          fulfill: {
            run: `$form.setFieldState('defaultRightLayers', (state) => {
              state.dataSource = $form.getFieldState('defaultLeftLayers', (leftState) => {
                  return leftState.componentProps.layers.filter((item) => leftState.value && !leftState.value.includes(item.value));
              });
          });`,
          },
        },
      ],
    },
  };
  return { schema };
};
