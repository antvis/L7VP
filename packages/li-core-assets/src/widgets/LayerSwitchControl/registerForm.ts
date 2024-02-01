import type { PositionName } from '@antv/l7';
import type { WidgetRegisterForm, WidgetRegisterFormProps } from '@antv/li-sdk';

/**
 * 属性面板生产的数据类型定义
 */
export type Properties = {
  /**
   * @default topright
   */
  position: PositionName;
  /**
   * 是否展示图片
   * @default false
   */
  isTextMode: boolean;
  /**
   * 是否多选模式
   * @default true
   */
  isMultiple: boolean;
  /**
   * 筛选图层配置
   */
  layerFilter: {
    /**图层id */
    id: string;
    /**图层名称 */
    name?: string;
    /**展示图片url */
    img?: string;
    /**是否展示 */
    visible: boolean;
  }[];
};

export const setReactions = (when: string) => {
  return {
    dependencies: ['isTextMode'],
    when,
    fulfill: {
      schema: {
        'x-visible': false,
      },
    },
    otherwise: {
      schema: {
        'x-visible': true,
      },
    },
  };
};

export default (props: WidgetRegisterFormProps): WidgetRegisterForm<Properties> => {
  const layers = (props.layers || []).map((item) => {
    return {
      id: item?.id,
      layerName: '',
      name: item.metadata.name,
      img: '',
      visible: true,
    };
  });

  const schema = {
    position: {
      title: '放置方位',
      type: 'string',
      'x-decorator': 'FormItem',
      'x-component': 'ControlPositionSelect',
      default: 'bottomright',
    },
    isTextMode: {
      title: '是否展示图片',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: false,
    },
    isMultiple: {
      title: '是否多选模式',
      type: 'boolean',
      'x-decorator': 'FormItem',
      'x-component': 'Switch',
      default: true,
    },
    layerFilter: {
      type: 'array',
      title: '筛选图层配置',
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        labelWidth: '100%',
        wrapperWidth: '100%',
        layout: 'vertical',
      },
      'x-component': 'ArrayTable',
      'x-component-props': {
        pagination: { pageSize: 10 },
        scroll: { x: '100%' },
      },
      default: layers,
      items: {
        type: 'object',
        properties: {
          column1: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 150, title: '图层名称' },
            properties: {
              name: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          column2: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { width: 115, title: '展示图片url' },
            'x-reactions': setReactions('{{!$deps[0]}}'),
            properties: {
              img: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-reactions': setReactions('{{!$deps[0]}}'),
              },
            },
          },
          column3: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '是否展示', with: 60 },
            properties: {
              visible: {
                type: 'boolean',
                'x-decorator': 'FormItem',
                'x-component': 'Checkbox',
                default: true,
              },
            },
          },
          column4: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '图层id', with: 60 },
            properties: {
              id: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
        },
      },
    },
  };
  return { schema };
};
