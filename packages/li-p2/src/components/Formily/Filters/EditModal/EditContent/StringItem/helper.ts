export const getOptions = (domain: string[], disabled: boolean) => {
  const _options = domain.map((item) => ({ label: item, value: item, disabled }));

  return [{ label: '全部', value: 'all' }, ..._options];
};
