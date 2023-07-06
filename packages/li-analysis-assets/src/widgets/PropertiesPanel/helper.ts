export const isImageUrl = (val: string) => {
  const regx = /^(https|http).*(jpeg|jpg|gif|png)/;
  return regx.test(val);
};
