export default () => {
  return {
    colorField: {
      title: '切片',
      type: 'string',
      required: true,
      'x-component-props': {
        allowClear: true,
        placeholder: '请选择字段',
      },
      'x-decorator-props': {
        tooltip: '选择字段作为饼图颜色划分字段',
      },
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      enum: [
        { type: 'number', name: 'lng' },
        { type: 'number', name: 'lat' },
      ],
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run:
              "$form.setFieldState('colorField',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns ; } ) ; state.value = undefined })",
          },
        },
      ],
    },

    angleField: {
      title: '数值',
      type: 'string',
      required: true,
      'x-component-props': {
        allowClear: true,
        placeholder: '请选择字段',
      },
      'x-decorator-props': {
        tooltip: '选择字段作为饼图面积划分字段',
      },
      'x-decorator': 'FormItem',
      'x-component': 'FieldSelect',
      'x-reactions': [
        {
          dependencies: ['datasetId'],
          fulfill: {
            run:
              "$form.setFieldState('angleField',state=>{ state.dataSource = $form.getFieldState( 'datasetId' ,state => { return state.dataSource.find( item=> item.value === $deps[0] )?.columns } )?.filter(item=>item.type==='number') ; state.value = undefined })",
          },
        },
      ],
    },
  };
};
