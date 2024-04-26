export const getPackageVersions = (_package: string) => {
  return fetch(`https://data.jsdelivr.com/v1/packages/npm/${_package}`, { method: 'get' }).then((res) => {
    return res.json();
  });
};

export const getUrls = (_package: string, version: string) => {
  return fetch(`https://data.jsdelivr.com/v1/packages/npm/${_package}@${version}/entrypoints`, {
    method: 'get',
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let urls: string[] = [];
      if (res?.entrypoints?.css) {
        urls = [`https://fastly.jsdelivr.net/npm/${_package}@${version}${res.entrypoints.css.file}`];
      } else if (res?.entrypoints?.js) {
        urls = [`https://fastly.jsdelivr.net/npm/${_package}@${version}${res.entrypoints.js.file}`];
      }

      return urls;
    });
};

export const isCSSOrJsUrl = (url: string): boolean => {
  const isCssUrl = /\.css(\?.*)?$/.test(url);
  const isJsUrl = /\.js(\?.*)?$/.test(url);

  return isCssUrl || isJsUrl;
};

export const getFormatUMDName = (val: string) => {
  const formatVal = '-' + val.match(/([^/]+)$/)?.[0];
  const value = formatVal.replace(/\-[a-z]/g, function (x) {
    return x[1].toUpperCase();
  });

  if (value.substring(0, 2) === 'Li') {
    return value.replace('Li', 'LI');
  } else {
    return value;
  }
};
