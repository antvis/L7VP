import JSZip from 'jszip';

export const unzipFile = (zipFile: File) => {
  return JSZip.loadAsync(zipFile) // read the Blob
    .then((zip) => {
      const convertAsync: Promise<File>[] = [];

      zip.forEach(function (relativePath, zipEntry) {
        if (relativePath.match(/^__MACOSX\//)) return;
        const convert = zipEntry.async('arraybuffer').then((arraybuffer) => {
          const file = new File([arraybuffer], zipEntry.name);
          return file;
        });
        convertAsync.push(convert);
      });

      return Promise.all(convertAsync).then((files) => {
        return files;
      });
    })
    .catch((error) => Promise.reject(error));
};
