import otherAttributesCollapse from '@antv/li-p2/dist/esm/LayerAttribute/common-schema/other-attributes-collapse';
import domainCollapse from './domain-collapse';

export default () => {
  return {
    collapseItem_domain: domainCollapse(),
    collapseItem_style: {
      type: 'void',
      'x-component': 'FormCollapse',
      'x-component-props': {
        ghost: true,
        destroyInactivePanel: true,
        defaultActiveKey: [],
      },
      properties: {
        style: {
          type: 'void',
          'x-component': 'FormCollapse.CollapsePanel',
          'x-component-props': {
            header: '样式',
          },
          properties: {
            fillColorScale: {
              type: 'string',
              title: '颜色划分',
              'x-decorator': 'FormItem',
              'x-component': 'ResterScaleSelector',
              'x-component-props': {
                placeholder: '请选择',
                domain: '{{ $form.getFieldState("domain",state=> { return state.value })}}',
                defaultColors: '{{ $form.getFieldState("fillColorRange",state=> { return state?.value?.colors })}}',
              },
            },

            fillColorRange: {
              type: 'object',
              title: '颜色',
              default: {
                colors: ['#ffffcc', '#d9f0a3', '#addd8e', '#78c679', '#31a354', '#006837'],
                isReversed: false,
              },
              'x-decorator': 'FormItem',
              'x-component': 'ColorRangeSelector',
              'x-component-props': {
                options: [],
              },
              'x-decorator-props': {},
              'x-reactions': [
                {
                  dependencies: ['fillColorScale'],
                  fulfill: {
                    state: {
                      visible: '{{ $deps[0] && $deps[0].type === "quantize" }}',
                    },
                  },
                },
              ],
            },

            opacity: {
              type: 'number',
              title: '透明度',
              default: 1,
              'x-decorator-props': {},
              'x-decorator': 'FormItem',
              'x-component': 'Slider',
              'x-component-props': {
                min: 0,
                max: 1,
                step: 0.1,
              },
            },
          },
        },
      },
    },
    collapseItem_other: otherAttributesCollapse(),
  };
};
