export default () => {
  return {
    xField: {
      title: 'X 轴',
      type: 'string',
      required: true,
      'x-component-props': {
        allowClear: false,
        placeholder: '请选择字段',
      },
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run:
              "$form.setFieldState('xField',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns } ) ; state.value = undefined;  })",
          },
        },
      ],
    },

    yField: {
      title: 'Y 轴',
      type: 'string',
      required: true,
      'x-component-props': {
        allowClear: false,
        placeholder: '请选择字段',
      },
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run:
              "$form.setFieldState('yField',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns ; } )?.filter(item=>item.type==='number') ; state.value = undefined })",
          },
        },
      ],
    },

    sortBy: {
      title: '排序依据',
      type: 'string',
      default: 'default',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {},
      enum: [
        {
          label: '原值序',
          value: 'default',
        },
        {
          label: 'Y 轴值',
          value: 'y',
        },
        {
          label: 'X 轴值',
          value: 'x',
        },
      ],
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run: "$form.setFieldState('sortBy',state=>{  state.value = 'default' })",
          },
        },
        {
          dependencies: ['datasetId'],
          fulfill: {
            run: "$form.setFieldState('sortBy',state=>{  state.value = 'default' })",
          },
        },
      ],
    },

    orderBy: {
      title: '排序规则',
      type: 'string',
      default: 'ASC',
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {},
      enum: [
        {
          label: '升序',
          value: 'ASC',
        },
        {
          label: '降序',
          value: 'DESC',
        },
      ],
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run: "$form.setFieldState('orderBy',state=>{  state.value = 'ASC' })",
          },
        },
      ],
    },
  };
};
