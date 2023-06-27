export const isValidTileUrl = (urlString: string) => {
  const urlPattern = new RegExp(
    '^(https?:\\/\\/)?' + // validate protocol
      '((([a-z\\d]([a-z\\d-{}]*[a-z\\d{}])*)\\.)+[a-z]{2,}|' + // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))|' + // validate OR ip (v4) address
      'localhost' + // OR localhost
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+{}]*)*' + // validate port and path
      '(\\?[;&a-z\\d%_.~+=-{}]*)?' + // validate query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  );
  const tileRegx = /(\{[xX]\}){1}/;
  const tileRegy = /(\{[yY]\}){1}/;
  const tileRegz = /(\{[zZ]\}){1}/;

  return (
    !!urlPattern.test(urlString) &&
    !!tileRegx.test(urlString) &&
    !!tileRegy.test(urlString) &&
    !!tileRegz.test(urlString)
  );
};
